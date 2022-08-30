import 'dotenv/config';
import Discord from 'discord.js';
import { websh } from '@api';
import editFieldsValue from '@utils/editFieldsValue';

type fieldObject = {
  name: string;
  value: string;
};

type embedsObject = {
  url: string;
  fields?: fieldObject[];
  image?: {
    url: string;
  };
};

type addImageObject = {
  url: string;
  image: {
    url: string;
  };
};

/**
 * 引数として受け取ったWebshの結果のObjectからDiscordのEmbedsObjectを作成する
 * @param {postWebshResultObject} valueObject - Webshの結果のObject
 * @return {ReplyMessageOptions} DiscordのEmbedsObject
 */
const createMessageObject = (
  valueObject: websh.postResultObject
): Discord.ReplyMessageOptions => {
  const url = process.env.API_URL;
  const fields: fieldObject[] = [];
  const embeds: embedsObject = {
    url: url,
    fields: fields,
  };
  const embedsArray: [embedsObject, addImageObject?] = [embeds];
  const files: Discord.AttachmentBuilder[] = [];

  fields.push({
    name: 'Status:',
    value:
      valueObject.status === 0
        ? '✅ Success!'
        : valueObject.status === 1
        ? '🕑 TimeOut!'
        : '❌ Failed!',
  });

  if (valueObject.stdout && valueObject.stdout != '\n')
    fields.push({
      name: 'Stdout:',
      value: editFieldsValue(valueObject.stdout),
    });
  if (valueObject.stderr && valueObject.stderr != '\n')
    fields.push({
      name: 'Stderr:',
      value: editFieldsValue(valueObject.stderr),
    });
  if (valueObject.system_message && valueObject.system_message != '\n')
    fields.push({
      name: 'System Message:',
      value: editFieldsValue(valueObject.system_message),
    });
  if (valueObject.images)
    valueObject.images.map(
      (imageData: websh.postResultImageObject, n: number): void => {
        const imageName = `${imageData.image.substring(0, 10)}${
          imageData.filesize
        }.${imageData.format}`;
        files.push(
          new Discord.AttachmentBuilder(
            Buffer.from(imageData.image, 'base64'),
            {
              name: imageName,
            }
          )
        );
        n === 0
          ? (embeds.image = {
              url: `attachment://${imageName}`,
            })
          : embedsArray.push({
              url: url,
              image: {
                url: `attachment://${imageName}`,
              },
            });
      }
    );
  return valueObject.images.length
    ? {
        embeds: embedsArray,
        files: files,
      }
    : {
        embeds: embedsArray,
      };
};

export default createMessageObject;
