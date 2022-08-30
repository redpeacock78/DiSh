import { db } from '@api';

const getPrefix = async (guildId: string): Promise<string> =>
  await db
    .get(guildId)
    .then((prefix: string) => prefix)
    .catch((): never => {
      throw new Error();
    });

const setPrefix = async (data: db.updateDataObject): Promise<void> => {
  try {
    const currentPrefix: string = await db.get(data.guildId);
    if (currentPrefix !== data.prefix) {
      if (currentPrefix.length === 0) {
        await db.post(data as db.createDataObject);
      } else {
        await db.put(data);
      }
    }
  } catch (e: unknown) {
    throw new Error();
  }
};

export { getPrefix, setPrefix };
