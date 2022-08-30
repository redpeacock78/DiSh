/* eslint-disable @typescript-eslint/no-explicit-any */
import Keyv from 'keyv';

export type updateData = {
  guildId: string;
  prefix: string;
};

/**
 *
 * @param {Keyv<any, Record<string, unknown>>} keyv - Keyvインスタンス
 * @returns {(data: updateData)Promise<updateData>}
 */
const updateValue =
  (keyv: Keyv): ((data: updateData) => Promise<updateData>) =>
  async (data: updateData): Promise<updateData> => {
    try {
      if (await keyv.get(data.guildId)) {
        await keyv.set(data.guildId, data.prefix);
        return data;
      } else {
        throw new Error();
      }
    } catch (e: unknown) {
      throw new Error();
    }
  };

export default updateValue;
