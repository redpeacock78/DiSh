import Keyv from 'keyv';

/**
 *
 * @param {Keyv<any, Record<string, unknown>>} keyv - Keyvインスタンス
 * @returns {(key: string)Promise<true}
 */
const deleteValue =
  (keyv: Keyv): ((key: string) => Promise<true>) =>
  async (key: string): Promise<true> =>
    await keyv
      .delete(key)
      .then((i: boolean): true => {
        if (i === true) {
          return i;
        } else {
          throw new Error();
        }
      })
      .catch((): never => {
        throw new Error();
      });

export default deleteValue;
