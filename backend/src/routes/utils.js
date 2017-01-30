var Utils = {
  objectFindByKey: function(array, key, value) {
    var i;
    i = 0;
    while (i < array.length) {
      if (array[i][key] === value) {
        return [array[i], i];
      }
      i++;
    }
    return null;
  },
  objectFindByKeyAlt: function(array, key, value) {
    var i;
    i = 0;
    while (i < array.length) {
      if (array[i][key] === value) {
        return {
          idx: i,
          obj: array[i]
        };
      }
      i++;
    }
    return null;
  }
}

module.exports = Utils;
