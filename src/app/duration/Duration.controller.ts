module spa5 {
  'use strict';

  export class DurationController {
    durationGridBuyOptions: Object;
    durationGridSellOptions: Object;
    state: any;

    /* @ngInject */
    constructor($state) {
      this.state = $state;

      this.durationGridBuyOptions = {
        selectable: 'multiple',
        dataSource: {
          transport: {
            read: {
              url: 'api/position_buy.json',
              dataType: 'json'
            }
          },
          schema: {
            model: {
              fields: {
                stockSNM: { type: 'string' },
                faceValAmt: { type: 'number' },
                startDate: { type: 'date' },
                endDate: { type: 'date' }
              }
            }
          },
          pageSize: 10
        },
        filterable: {
          mode: 'row'
        },
        sortable: {
          mode: 'multiple',
          allowUnsort: true
        },
        scrollable: {
          virtual: true
        },
        // pageable: {
        //   buttonCount: 5,
        //   pageSizes: true,
        //   refresh: true,
        //   messages: {
        //     refresh: '表を更新する'
        //   }
        // },
        columns: [
          {
            field: 'stockSNM',
            title: '回号',
            width: 27,
            filterable: {
              cell: {
                //inputWidth: 45,
                delay: 0,
                showOperators: false
              }
            }
          },
          {
            field: 'faceValAmt',
            title: '額面(億円)',
            attributes: {
              'class': 'table-cell',
              style: 'text-align: right;'
            },
            width: 37,
            filterable: {
              cell: {
                //inputWidth: 40,
                delay: 0,
                showOperators: false
              }
            }
          },
          {
            field: 'startDate',
            title: 'ｽﾀｰﾄ',
            attributes: {
              'class': 'table-cell',
              style: 'text-align: center;'
            },
            width: 44,
            filterable: {
              cell: {
                //inputWidth: 40,
                delay: 0,
                showOperators: false
              }
            },
            format: '{0:MM/dd}'
          },
          {
            field: 'endDate',
            title: 'ｴﾝﾄﾞ',
            attributes: {
              'class': 'table-cell',
              style: 'text-align: center;'
            },
            width: 44,
            filterable: {
              cell: {
                //inputWidth: 40,
                delay: 0,
                showOperators: false
              }
            },
            format: '{0:MM/dd}'
          }
        ]
      };
      this.durationGridSellOptions = {
        selectable: 'multiple',
        dataSource: {
          transport: {
            read: {
              url: 'api/position_sell.json',
              dataType: 'json'
            }
          },
          schema: {
            model: {
              fields: {
                stockSNM: { type: 'string' },
                faceValAmt: { type: 'number' },
                startDate: { type: 'date' },
                endDate: { type: 'date' }
              }
            }
          },
          pageSize: 10
        },
        filterable: {
          mode: 'row'
        },
        sortable: {
          mode: 'multiple',
          allowUnsort: true
        },
        scrollable: {
          virtual: true
        },
        // pageable: {
        //   buttonCount: 5,
        //   pageSizes: true,
        //   refresh: true,
        //   messages: {
        //     refresh: '表を更新する'
        //   }
        // },
        columns: [
          {
            field: 'stockSNM',
            title: '回号',
            attributes: {
              'class': 'table-cell',
              style: 'text-align: center;'
            },
            width: 55,
            filterable: {
              cell: {
                //inputWidth: 45,
                delay: 0,
                showOperators: false
              }
            }
          },
          {
            field: 'faceValAmt',
            title: '額面(億円)',
            attributes: {
              'class': 'table-cell',
              style: 'text-align: right;'
            },
            width: 50,
            filterable: {
              cell: {
                //inputWidth: 40,
                delay: 0,
                showOperators: false
              }
            }
          },
          {
            field: 'startDate',
            title: 'ｽﾀｰﾄ',
            width: 50,
            filterable: {
              cell: {
                //inputWidth: 40,
                delay: 0,
                showOperators: false
              }
            },
            format: '{0:MM/dd}'
          },
          {
            field: 'endDate',
            title: 'ｴﾝﾄﾞ',
            width: 50,
            filterable: {
              cell: {
                //inputWidth: 40,
                delay: 0,
                showOperators: false
              }
            },
            format: '{0:MM/dd}'
          }
        ]
      };
    }

    onSelect(kendDateoEvent) {
      if ($(kendDateoEvent.item).children('.k-link').text() == '約定登録') {
        this.state.go('.agreements', {
          regNo: $('.k-state-selected').children(':first').children().text()
        });
      }
    }
  }
}
