module spa1 {
  'use strict';

  export class BoardController {
    private state: any;
    boardGridOptions: Object;

    /* @ngInject */
    constructor($state) {
      this.state = $state;

      //板画面のオプション
      this.boardGridOptions = {
        change: () => {
          console.log("Selected regNo: " + $(".k-state-selected").children(":first").children().text());
        },
        selectable: "multiple",
        allowCopy: true,
        dataSource: {
          type: 'json',
          pageSize: 20,
          transport: {
            read: 'api/board_records.json'
          },
          schema: {
            model: {
              fields: {
                regNo: { type: 'string' },
                manStat: { type: 'string' },
                detailStat: { type: 'string' },
                memo: { type: 'string' },
                faxSendStat: { type: 'string' },
                stockSNM: { type: 'string' },
                startDate: { type: 'date' },
                endDate: { type: 'date' },
                agreeRateOffer: { type: 'number' },
                faceValAmt: { type: 'number' },
                agreeRateBid: { type: 'number' },
                custRNM: { type: 'string' },
                dealFNM: { type: 'string' },
                userNM: { type: 'string' },
                fixDateTime: { type: 'string' }
              }
            }
          }
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
            field: 'regNo',
            title: 'REG#',
            // headerAttributes: {
            //     'class': 'table-header-cell',
            //     style: 'text-align: center; font-size: 10px'
            // },
            attributes: {
              'class': 'table-cell',
              style: 'text-align: right;'
            },
            width: 92,
            filterable: {
              cell: {
                //inputWidth: 64,
                delay: 0,
                showOperators: false
              }
            }
          },
          {
            field: 'manStat',
            title: '管',
            // headerAttributes: {
            //     'class': 'table-header-cell',
            //     style: 'text-align: center; font-size: 10px'
            // },
            attributes: {
              'class': 'table-cell',
              style: 'text-align: center;'
            },
            width: 69,
            filterable: {
              cell: {
                //inputWidth: 50,
                delay: 0,
                showOperators: false
              }
            }
          },
          {
            field: 'detailStat',
            title: '状態',
            // headerAttributes: {
            //     'class': 'table-header-cell',
            //     style: 'text-align: center; font-size: 10px'
            // },
            width: 112,
            filterable: {
              cell: {
                //inputWidth: 75,
                delay: 0,
                showOperators: false
              }
            }
          },
          {
            field: 'memo',
            title: 'M',
            // headerAttributes: {
            //     'class': 'table-header-cell',
            //     style: 'text-align: center; font-size: 10px'
            // },
            width: 69,
            attributes: {
              'class': 'table-cell',
              style: 'text-align: center;'
            },
            filterable: {
              cell: {
                //inputWidth: 50,
                delay: 0,
                showOperators: false
              }
            }
          },
          {
            field: 'faxSendStat',
            title: 'FAX',
            // headerAttributes: {
            //     'class': 'table-header-cell',
            //     style: 'text-align: center; font-size: 10px'
            // },
            width: 69,
            attributes: {
              'class': 'table-cell',
              style: 'text-align: center;'
            },
            filterable: {
              cell: {
                //inputWidth: 50,
                delay: 0,
                showOperators: false
              }
            }
          },
          {
            field: 'stockSNM',
            title: '銘柄回号',
            // headerAttributes: {
            //     'class': 'table-header-cell',
            //     style: 'text-align: center; font-size: 10px'
            // },
            // attributes: {
            //     'class': 'table-cell',
            //     style: 'text-align: right; font-size: 10px'
            // },
            width:　103,
            filterable: {
              cell: {
                //inputWidth: 50,
                delay: 0,
                showOperators: false
              }
            }
          },
          {
            field: 'startDate',
            title: 'ｽﾀｰﾄ',
            // headerAttributes: {
            //     'class': 'table-header-cell',
            //     style: 'text-align: center; font-size: 10px'
            // },
            attributes: {
              'class': 'table-cell',
              style: 'text-align: center;'
            },
            width: 118,
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
            // headerAttributes: {
            //     'class': 'table-header-cell',
            //     style: 'text-align: center; font-size: 10px'
            // },
            attributes: {
              'class': 'table-cell',
              style: 'text-align: center;'
            },
            width: 118,
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
            field: 'agreeRateOffer',
            title: 'ｵﾌｧｰ',
            // headerAttributes: {
            //     'class': 'table-header-cell',
            //     style: 'text-align: center; font-size: 10px'
            // },
            attributes: {
              'class': 'table-cell',
              style: 'text-align: right;'
            },
            width: 115,
            filterable: {
              cell: {
                //inputWidth: 60,
                delay: 0,
                showOperators: false
              }
            },
            format: '{0:n2}'
          },
          {
            field: 'faceValAmt',
            title: '額面(億円)',
            // headerAttributes: {
            //     'class': 'table-header-cell',
            //     style: 'text-align: center; font-size: 10px'
            // },
            attributes: {
              'class': 'table-cell',
              style: 'text-align: right;'
            },
            width: 100,
            filterable: {
              cell: {
                //inputWidth: 180,
                delay: 0,
                showOperators: false
              }
            }
          },
          {
            field: 'agreeRateBid',
            title: 'ﾋﾞｯﾄﾞ',
            // headerAttributes: {
            //     'class': 'table-header-cell',
            //     style: 'text-align: center; font-size: 10px'
            // },
            attributes: {
              'class': 'table-cell',
              style: 'text-align: right;'
            },
            width: 115,
            filterable: {
              cell: {
                //inputWidth: 60,
                delay: 0,
                showOperators: false
              }
            },
            format: '{0:n2}'
          },
          {
            field: 'custRNM',
            title: '顧客名',
            // headerAttributes: {
            //     'class': 'table-header-cell',
            //     style: 'text-align: center; font-size: 10px'
            // },,
            width: 150,
            filterable: {
              cell: {
                //inputWidth: 240,
                delay: 0,
                showOperators: false
              }
            }
          },
          {
            field: 'dealFNM',
            title: '取引種別',
            // headerAttributes: {
            //     'class': 'table-header-cell',
            //     style: 'text-align: center; font-size: 10px'
            // },
            width: 99,
            filterable: {
              cell: {
                //inputWidth: 50,
                delay: 0,
                showOperators: false
              }
            }
          },
          {
            field: 'userNM',
            title: '受注者',
            // headerAttributes: {
            //     'class': 'table-header-cell',
            //     style: 'text-align: center; font-size: 10px'
            // },
            width: 119,
            filterable: {
              cell: {
                //inputWidth: 90,
                delay: 0,
                showOperators: false
              }
            }
          },
          {
            field: 'fixDateTime',
            title: '約定時間',
            // headerAttributes: {
            //     'class': 'table-header-cell',
            //     style: 'text-align: center; font-size: 10px'
            // },
            attributes: {
              'class': 'table-cell',
              style: 'text-align: center;'
            },
            width: 89,
            filterable: {
              cell: {
                //inputWidth: 40,
                delay: 0,
                showOperators: false
              }
            },
            format: '{0:HH:mm}'
          }
        ]
      };
    }

    openAgree() {
      //約定画面を開く
      this.state.go('.agreements', {
        //約定画面に渡すregNoパラメータ
        regNo: $(".k-state-selected").children(":first").children().text()
      });
    }
  }
}
