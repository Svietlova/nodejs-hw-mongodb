const parseBoolean = (value) => {
  const isString = typeof value === 'string';
  if (!isString) return;

  const isFavourite = (value) =>
    value.toLowerCase() === 'true' ? true : false;

  if (isFavourite(value)) return value;
};

const parseType = (value) => {
  const isString = typeof value === 'string';
  if (!isString) return;
  const type = (contactType) =>
    ['work', 'home', 'personal'].includes(contactType);

  if (type(value)) return value;
};

export const parseFilterParams = (query) => {
  const { isFavourite, contactType } = query;

  const parsedFavourite = parseBoolean(isFavourite);
  const parsedType = parseType(contactType);

  return {
    isFavourite: parsedFavourite,
    contactType: parsedType,
  };
};
