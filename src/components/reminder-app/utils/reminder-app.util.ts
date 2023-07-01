const getCookieValue = (cookieName: string): string | null => {
  // filters cookies
  const cookie = document.cookie
    .split(';')
    .filter((cookie) => cookie.trim().startsWith(`${cookieName}=`))[0];
  // returns value of cookie if exists
  return cookie
    ? decodeURIComponent(cookie.substring(cookieName.length + 2))
    : null;
};

const setCookie = (cookieName: string, cookieValue: string) => {
  // set cookie only if it doesn't exist already
  getCookieValue(cookieName) ||
    (document.cookie = `${cookieName}=${cookieValue}`);
};

export { getCookieValue, setCookie };
