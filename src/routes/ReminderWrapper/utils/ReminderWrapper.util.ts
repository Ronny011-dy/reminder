import { InfiniteData } from 'react-query';
import { DBReminder } from '../ReminderWrapper.types';

export const getCookieValue = (cookieName: string): string | null => {
  // filters cookies
  const cookie = document.cookie.split(';').filter((cookie) => cookie.trim().startsWith(`${cookieName}=`))[0];
  // returns value of cookie if exists
  return cookie ? decodeURIComponent(cookie.substring(cookieName.length + 2)) : null;
};

export const setCookie = (cookieName: string, cookieValue: string) => {
  // set cookie only if it doesn't exist already
  getCookieValue(cookieName) || (document.cookie = `${cookieName}=${cookieValue}`);
};

export const filterNonUnique = (arr: string[]) => {
  return arr.filter((value, index, self) => self.indexOf(value) === index);
};

export const flat = (data: InfiniteData<DBReminder[]> | undefined) => {
  if (data?.pages?.flat().length && data?.pages?.flat().length > 0) {
    return data.pages.flat();
  }
  return [];
};
