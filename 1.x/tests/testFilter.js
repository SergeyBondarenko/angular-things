describe('filters: searchFor', () => {
  let $filter;

  beforeEach(() => {
    ngMock.module('apps/settings');
    ngMock.inject((_$filter_) => {
      $filter = _$filter_;
    });
  });

  it('should search and filter the relations', () => {
    const searchString = 'art';
    const relationsA = [
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
    ];
    const relationsB = [
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
          {'rocket': [
            {'engine': '', 'computer': [{'cpu': '', 'software': 'artificial intelligence'}]}
          ]}
        ]
      }
    ];

    const resultsA = $filter('searchFor')(relationsA, searchString);
    const resultsB = $filter('searchFor')(relationsB, searchString);
    expect(resultsA).to.have.length(1);
    expect(resultsB).to.have.length(2);
  });
});
