
function formatToSnakeCase(sentence: string | undefined): string {
  if (!sentence) return "";

  // @ts-ignore
  return sentence
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map(x => x.toLowerCase())
    .join("_");
}

function convertToSentenceCase(sentence: string) {
  if (!sentence) {
    return "";
  }

  const tokens = sentence.split(". ");
  let convertedSentence = "";

  for (let i = 0; i < tokens.length; i++) {
    tokens[i] = tokens[i].charAt(0).toUpperCase() + tokens[i].slice(1);
    convertedSentence += tokens[i].trimEnd() + ". ";
  }

  return convertedSentence;
}

export {formatToSnakeCase, convertToSentenceCase}