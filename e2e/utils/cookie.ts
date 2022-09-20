type Options = { domain?: string; path?: string };

export const getTestCookie = (
  name: string,
  value: string,
  { domain = 'localhost', path = '/' }: Options = {},
) => ({
  name,
  value,
  path,
  domain,
});
