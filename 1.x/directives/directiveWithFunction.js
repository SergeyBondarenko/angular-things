define(function (require) {

  app.directive('relationsSearchBar', () => {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        scope.searchRelations = function (mode) {
          const searchString = scope[`${mode}SearchString`];

          if (!searchString || searchString.length < 2) {
            for (const relation in scope.relations[mode]) {
              if (scope.relations[mode].hasOwnProperty(relation)) {
                scope.relations[mode][relation].hidden = false;
              }
            }
            return;
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

          for (const relation in scope.relations[mode]) {
            if (!scope.relations[mode].hasOwnProperty(relation)) {
              continue;
            }
            if (search(scope.relations[mode][relation], searchString)) {
              scope.relations[mode][relation].hidden = false;
            } else {
              scope.relations[mode][relation].hidden = true;
            }
          }
        };
      }
    };
  });

});
