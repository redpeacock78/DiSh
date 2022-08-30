/* eslint-disable @typescript-eslint/no-namespace */
import 'dotenv/config';
import Keyv from 'keyv';
import readValue from '@api/db/readValue';
import createValue, { createData } from '@api/db/createValue';
import updateValue, { updateData } from '@api/db/updateValue';
import deleteValue from '@api/db/deleteValue';

const redisUrl = process.env.REDIS_URL;
const keyv: Keyv = new Keyv(redisUrl, { namespace: 'dish' });
keyv.on('error', (err: string): void => console.error(err));

export namespace redis {
  export type createDataObject = createData;
  export type updateDataObject = updateData;
  export const dbCreate: (data: createData) => Promise<createData> =
    createValue(keyv);
  export const dbRead: (key: string) => Promise<string> = readValue(keyv);
  export const dbUpdate: (data: updateData) => Promise<updateData> =
    updateValue(keyv);
  export const dbDelete: (key: string) => Promise<true> = deleteValue(keyv);
}
