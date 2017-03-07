describe('directives: relationsSearchBar', () => {
  let scope;
  let searchBar;

  beforeEach(() => {
    ngMock.module('apps/settings');
    ngMock.inject(($rootScope, $compile) => {
      scope = $rootScope.$new();
      searchBar = $compile('<input type="text" class="form-control kibi-search-bar" ' +
        'kibi-relations-search-bar ng-model="relationsIndicesSearchString" ' +
        'ng-model-options="{ debounce: 350 }" ng-change="searchRelations(\'relationsIndices\')">')(scope);
      scope.$digest();
    });
  });

  it('should search and filter the relations in settings', () => {
    searchBar.scope().relationsIndicesSearchString = 'art';
    searchBar.scope().relationsDashboardsSearchString = 'art';
    searchBar.scope().relations = {
      relationsIndices: [
        {
          'indices': [
            {'indexPatternType': '','indexPatternId': 'investor'}
          ]
        },
        {
          'indices': [
            {'indexPatternType': '','indexPatternId': 'company'},
            {'indexPatternType': '','indexPatternId': 'article'}
          ]
        }
      ],
      relationsDashboards: [
        {
          'indices': [
            {'indexPatternType': '','indexPatternId': 'investor'}
          ]
        },
        {
          'indices': [
            {'indexPatternType': '','indexPatternId': 'article'},
            {'indexPatternType': '','indexPatternId': 'company'}
          ]
        },
        {
          'indices': [
            {
              'rocket': [
                {
                  'engine': '',
                  'computer': [
                    {'cpu': '', 'software': 'artificial intelligence'}
                  ]
                }
              ]
            }
          ]
        }
      ]
    };

    const modes = ['relationsIndices', 'relationsDashboards'];
    modes.forEach((mode) => {
      searchBar.scope().searchRelations(mode);

      let relCounter = 0;
      searchBar.scope().relations[mode].forEach((relation) => {
        if (!relation.hidden) relCounter++;
      });

      if (mode === 'relationsIndices') {
        expect(relCounter).to.eql(1);
      } else {
        expect(relCounter).to.eql(2);
      }
    });
  });
});
