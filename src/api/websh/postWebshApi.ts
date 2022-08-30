import 'dotenv/config';
import Axios, { AxiosResponse, AxiosError } from '@utils/axios';

export type postDataObject = {
  code: string;
  images?: string[];
};

export type postResultImageObject = {
  image?: string;
  filesize?: number;
  format?: string;
};

export type postResultObject = {
  status: number;
  system_message: string;
  stdout: string;
  stderr: string;
  images: postResultImageObject[];
  elapsed_time: string;
};

/**
 * webshにコマンドや画像データ(base64)をPOSTする
 * @param {postDataObject} postData - webshにPOSTするデータ
 * @return {Promise<postResultObject>} webshから返却されたデータ
 */
const postWebsh = async (postData: postDataObject): Promise<postResultObject> =>
  await Axios.post(`${process.env.API_URL}/api/shellgei`, postData)
    .then((i: AxiosResponse<postResultObject>): postResultObject => i.data)
    .catch((e: AxiosError): never => {
      throw new Error(e.message);
    });

export default postWebsh;
