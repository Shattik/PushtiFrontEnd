import { localStorageStore } from '@skeletonlabs/skeleton';

export const avatar = localStorageStore('avatar', "");
export const name = localStorageStore('name', "");
export const phone = localStorageStore('phone', "");