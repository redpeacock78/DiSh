/* eslint-disable @typescript-eslint/no-namespace */
import * as postWebsh from '@api/websh/postWebshApi';
import * as getWebsh from '@api/websh/getWebshApi';
import img2Base64 from '@api/discord/img2Base64';
import { redis } from '@api/db';

/**
 * webshに関するAPIを操作
 */
export namespace websh {
  export const get: () => Promise<getWebsh.getResultObject> = getWebsh.default;
  export const post: (
    postData: postWebsh.postDataObject
  ) => Promise<postWebsh.postResultObject> = postWebsh.default;
  export type getResultObject = getWebsh.getResultObject;
  export type postDataObject = postWebsh.postDataObject;
  export type postResultObject = postWebsh.postResultObject;
  export type postResultImageObject = postWebsh.postResultImageObject;
}

/**
 * Discord Media(image)に関するAPIを操作
 */
export namespace discordMedia {
  export const imageToBase64 = img2Base64;
}

/**
 * DBに関するAPIを操作
 */
export namespace db {
  export type createDataObject = redis.createDataObject;
  export type updateDataObject = redis.updateDataObject;
  /**
   * 渡されたKeyに紐づくValueを返却
   * @param {string} key 読み出すデータのkey
   * @returns {Promise<string>} 読み出したValue
   */
  export const get: (key: string) => Promise<string> = async (
    key: string
  ): Promise<string> => await redis.dbRead(key);
  /**
   * 渡されたデータを登録
   * @param {redis.createDataObject} data - 登録するデータ
   * @returns {Promise<redis.createDataObject>} 登録したデータ
   */
  export const post: (
    data: redis.createDataObject
  ) => Promise<redis.createDataObject> = async (
    data: redis.createDataObject
  ): Promise<redis.createDataObject> => await redis.dbCreate(data);
  /**
   * 渡されたデータを更新
   * @param {redis.updateDataObject} data - 更新するデータ
   * @returns {Promise<redis.updateDataObject>} 更新したデータ
   */
  export const put: (
    data: redis.updateDataObject
  ) => Promise<redis.updateDataObject> = async (
    data: redis.updateDataObject
  ): Promise<redis.updateDataObject> => await redis.dbUpdate(data);
  /**
   * 渡されたKeyに紐づくValueを削除
   * @param {string} key - 削除するデータのkey
   * @returns {Promise<boolean>}
   */
  export const remove: (key: string) => Promise<true> = async (
    key: string
  ): Promise<true> => await redis.dbDelete(key);
}
