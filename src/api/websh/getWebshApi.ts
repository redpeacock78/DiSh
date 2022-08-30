import 'dotenv/config';
import Axios, { AxiosResponse, AxiosError } from '@utils/axios';

export type getResultObject = {
  status: string;
  responseTime: number;
};

type AxiosResponseData = {
  status: string;
};

/**
 * webshのステータスを確認する
 * @return {Promise<getResultObject>} webshから返却されたデータ
 */
const getWebsh = async (): Promise<getResultObject> =>
  await Axios.get(`${process.env.API_URL}/api/ping`)
    .then((i: AxiosResponse<AxiosResponseData>): getResultObject => {
      const result: getResultObject = {
        status: '',
        responseTime: 0,
      };
      result.status = i.data.status;
      result.responseTime = i.responseTime;
      return result;
    })
    .catch((e: AxiosError): never => {
      throw new Error(e.message);
    });

export default getWebsh;
