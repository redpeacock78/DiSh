import Axios, { AxiosResponse } from '@utils/axios';

/**
 * メッセージに添付された画像のURLから画像データをbase64化したものを生成
 * @param {Array<string>} imgUrlArray - 画像URLの配列
 * @return {Promise<Array<string>>} 画像データのbase64の配列
 */
const img2Base64 = async (imgUrlArray: string[]): Promise<string[]> => {
  if (imgUrlArray.length === 0) return [];
  const responseArray: AxiosResponse<BinaryType>[] = [];
  return await Promise.all(
    imgUrlArray.map(async (i: string): Promise<void> => {
      const resp: AxiosResponse<BinaryType> = await Axios.get(i, {
        responseType: 'arraybuffer',
      });
      responseArray.push(resp);
    })
  )
    .then((): string[] =>
      responseArray.map((resp: AxiosResponse<BinaryType>): string =>
        Buffer.from(resp.data, 'binary').toString('base64')
      )
    )
    .catch((): never => {
      throw new Error('Failed to retrieve attached image.');
    });
};

export default img2Base64;
