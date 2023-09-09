import { InfiniteData } from 'react-query';
import { DbReminder } from '../ReminderWrapper.types';

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

export const flat = (data: InfiniteData<DbReminder[]> | undefined) => {
  if (data?.pages?.flat().length && data?.pages?.flat().length > 0) {
    return data.pages.flat();
  }
  return [];
};

export const filterData = (flatData: DbReminder[], filtersArr: string[]): DbReminder[] | undefined => {
  return filtersArr.length === 0
    ? flatData
    : flatData.filter((reminder) => JSON.parse(reminder.tags).some((tag: string) => filtersArr.includes(tag)));
};

export const filteredAndSearchedData = (
  data: InfiniteData<DbReminder[]> | undefined,
  filtersArr: string[],
  searchQuery: string
) => {
  return filterData(flat(data), filtersArr)?.filter((reminder) => reminder.title.includes(searchQuery));
};
