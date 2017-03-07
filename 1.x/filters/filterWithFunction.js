app.filter('searchFor', () => {
  return function (relations, searchString) {

    if (!searchString || searchString.length < 3) {
      return relations;
    }

    const search = function (obj, searchString) {
      let result;
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          if (typeof obj[key] === 'object' && obj[key] !== null || _.isArray(obj[key]) && obj[key].length) {
            result = search(obj[key], searchString);
            if (result) {
              return result;
            }
          }
          if (typeof obj[key] === 'string') {
            const found = obj[key].match(new RegExp(searchString, 'gi'));
            if (found && found.length) {
              return true;
            }
          }
        }
      }
      return result;
    };

    const result = [];

    for (const relation in relations) {
      if (!relations.hasOwnProperty(relation)) {
        continue;
      }
      if (search(relations[relation], searchString)) {
        result.push(relations[relation]);
      }
    }

    return result;
  };
});
