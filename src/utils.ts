export const JSONTryParse = (jsonString: string) => {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.log(error);

    return undefined;
  }
};
