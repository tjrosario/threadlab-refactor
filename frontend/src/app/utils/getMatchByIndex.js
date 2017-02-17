const getMatchByIndex = (idx, arr) => {
  if (arr[idx]) {
    return arr[idx];
  }
  
  return getMatchByIndex(idx - 1, arr);
};

export default getMatchByIndex;