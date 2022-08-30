/* eslint-disable @typescript-eslint/no-explicit-any */
import Keyv from 'keyv';

export type createData = {
  guildId: string;
  prefix: string;
};

/**
 *
 * @param {Keyv<any, Record<string, unknown>>} keyv - Keyvインスタンス
 * @returns {(data: createData)Promise<createData>}
 */
const createValue =
  (keyv: Keyv): ((data: createData) => Promise<createData>) =>
  async (data: createData): Promise<createData> =>
    await keyv
      .set(data.guildId, data.prefix)
      .then((): createData => data)
      .catch((): never => {
        throw new Error();
      });

export default createValue;
