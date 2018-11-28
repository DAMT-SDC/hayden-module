const splitStringIntoPartsMatchingSubString = (string, subString) => {
  const matchingBeginningIndex = string.name.toLowerCase().match(subString.toLowerCase()).index;
  const matchingEndingIndex = matchingBeginningIndex + subString.length;
  const beginning = string.name.slice(0, matchingBeginningIndex);
  const matched = string.name.slice(matchingBeginningIndex, matchingEndingIndex);
  const end = string.name.slice(matchingEndingIndex, string.name.length);

  return {
    beginning,
    matched,
    end,
    count: string.count
  }
}

const boldSearchStringInSuggestions = (suggestions, search) => suggestions.map((suggestion) => {
  if (suggestion.name.toLowerCase().match(search.toLowerCase())) {
    return splitStringIntoPartsMatchingSubString(suggestion, search);
  }
  return null;
})

module.exports = {
  splitStringIntoPartsMatchingSubString,
  boldSearchStringInSuggestions
}