
function formatToSnakeCase(sentence: string | undefined): string {
  if (!sentence) return "";

  // @ts-ignore
  return sentence
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join("_");
}

export {formatToSnakeCase}