import Keyv from 'keyv';

/**
 *
 * @param {Keyv<any, Record<string, unknown>>} keyv - Keyvインスタンス
 * @returns {(key: string)Promise<string>}
 */
const readValue =
  (keyv: Keyv): ((key: string) => Promise<string>) =>
  async (key: string): Promise<string> => {
    const result = (await keyv.get(key)) as string;
    return result !== undefined ? result : '';
  };

export default readValue;
