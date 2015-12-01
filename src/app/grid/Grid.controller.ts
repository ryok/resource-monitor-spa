module spa1 {
  'use strict';

  export class GridController {
    gridGridOptions: Object;
    private refDatesStr: Array<string>;
    private monthStr: string;
    gridGraphOptions: Object;

    /* @ngInject */
    constructor() {
      //基準日文字列の設定
      this.refDatesStr = new Array<string>();
      this.monthStr = "10"
      for(let i = 0; i < 12; i++) {
        if(i < 9) {
          //日が1桁なら0で埋めて、2桁表示にして代入する
          this.refDatesStr[i] = this.monthStr + "/" + "0" + (i + 1);
        } else {
          //日が2桁なら、そのまま代入する
          this.refDatesStr[i] = this.monthStr + "/" + (i + 1);
        }
      }

      this.gridGridOptions = {
        selectable: "multiple",
        dataSource: {
          transport: {
            read: {
              url: 'api/position_grid.json',
              dataType: 'json'
            }
          },
          schema: {
            model: {
              fields: {
                stockSNM: { type: 'string' },
                refDate0: { type: 'number' },
                refDate1: { type: 'number' },
                refDate2: { type: 'number' },
                refDate3: { type: 'number' },
                refDate4: { type: 'number' },
                refDate5: { type: 'number' },
                refDate6: { type: 'number' },
                refDate7: { type: 'number' },
                refDate8: { type: 'number' },
                refDate9: { type: 'number' },
                refDate10: { type: 'number' },
                refDate11: { type: 'number' }
              }
            },
          },
          aggregate: [
            { field: "refDate0", aggregate: "sum" },
            { field: "refDate1", aggregate: "sum" },
            { field: "refDate2", aggregate: "sum" },
            { field: "refDate3", aggregate: "sum" },
            { field: "refDate4", aggregate: "sum" },
            { field: "refDate5", aggregate: "sum" },
            { field: "refDate6", aggregate: "sum" },
            { field: "refDate7", aggregate: "sum" },
            { field: "refDate8", aggregate: "sum" },
            { field: "refDate9", aggregate: "sum" },
            { field: "refDate10", aggregate: "sum" },
            { field: "refDate11", aggregate: "sum" },
            { field: "refDate12", aggregate: "sum" }
          ],
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
            footerTemplate: "合計",
            width: 55,
            filterable: {
              cell: {
                inputWidth: 45,
                delay: 0,
                showOperators: false
              }
            }
          },
          {
            field: 'refDate0',
            title: this.refDatesStr[0],
            footerTemplate: "#: data.refDate0 ? data.refDate0.sum : 0 #",
            attributes: {
              'class': 'table-cell',
              style: 'text-align: right;'
            },
            width: 50,
            filterable: {
              cell: {
                inputWidth: 40,
                delay: 0,
                showOperators: false
              }
            }
          },
          {
            field: 'refDate1',
            title: this.refDatesStr[1],
            footerTemplate: "#: data.refDate1 ? data.refDate1.sum : 0 #",
            attributes: {
              'class': 'table-cell',
              style: 'text-align: right;'
            },
            width: 50,
            filterable: {
              cell: {
                inputWidth: 40,
                delay: 0,
                showOperators: false
              }
            }
          },
          {
            field: 'refDate2',
            title: this.refDatesStr[2],
            footerTemplate: "#: data.refDate2 ? data.refDate2.sum : 0 #",
            attributes: {
              'class': 'table-cell',
              style: 'text-align: right;'
            },
            width: 50,
            filterable: {
              cell: {
                inputWidth: 40,
                delay: 0,
                showOperators: false
              }
            }
          },
          {
            field: 'refDate3',
            title: this.refDatesStr[3],
            footerTemplate: "#: data.refDate3 ? data.refDate3.sum : 0 #",
            attributes: {
              'class': 'table-cell',
              style: 'text-align: right;'
            },
            width: 50,
            filterable: {
              cell: {
                inputWidth: 40,
                delay: 0,
                showOperators: false
              }
            }
          },
          {
            field: 'refDate4',
            title: this.refDatesStr[4],
            footerTemplate: "#: data.refDate4 ? data.refDate4.sum : 0 #",
            attributes: {
              'class': 'table-cell',
              style: 'text-align: right;'
            },
            width: 50,
            filterable: {
              cell: {
                inputWidth: 40,
                delay: 0,
                showOperators: false
              }
            }
          },
          {
            field: 'refDate5',
            title: this.refDatesStr[5],
            footerTemplate: "#: data.refDate5 ? data.refDate5.sum : 0 #",
            attributes: {
              'class': 'table-cell',
              style: 'text-align: right;'
            },
            width: 50,
            filterable: {
              cell: {
                inputWidth: 40,
                delay: 0,
                showOperators: false
              }
            }
          },
          {
            field: 'refDate6',
            title: this.refDatesStr[6],
            footerTemplate: "#: data.refDate6 ? data.refDate6.sum : 0 #",
            attributes: {
              'class': 'table-cell',
              style: 'text-align: right;'
            },
            width: 50,
            filterable: {
              cell: {
                inputWidth: 40,
                delay: 0,
                showOperators: false
              }
            }
          },
          {
            field: 'refDate7',
            title: this.refDatesStr[7],
            footerTemplate: "#: data.refDate7 ? data.refDate7.sum : 0 #",
            attributes: {
              'class': 'table-cell',
              style: 'text-align: right;'
            },
            width: 50,
            filterable: {
              cell: {
                inputWidth: 40,
                delay: 0,
                showOperators: false
              }
            }
          },
          {
            field: 'refDate8',
            title: this.refDatesStr[8],
            footerTemplate: "#: data.refDate8 ? data.refDate8.sum : 0 #",
            attributes: {
              'class': 'table-cell',
              style: 'text-align: right;'
            },
            width: 50,
            filterable: {
              cell: {
                inputWidth: 40,
                delay: 0,
                showOperators: false
              }
            }
          },
          {
            field: 'refDate9',
            title: this.refDatesStr[9],
            footerTemplate: "#: data.refDate9 ? data.refDate9.sum : 0 #",
            attributes: {
                'class': 'table-cell',
                style: 'text-align: right;'
            },
            width: 50,
            filterable: {
              cell: {
                inputWidth: 40,
                delay: 0,
                showOperators: false
              }
            }
          },
          {
            field: 'refDate10',
            title: this.refDatesStr[10],
            footerTemplate: "#: data.refDate10 ? data.refDate10.sum : 0 #",
            attributes: {
              'class': 'table-cell',
              style: 'text-align: right;'
            },
            width: 50,
            filterable: {
              cell: {
                inputWidth: 40,
                delay: 0,
                showOperators: false
              }
            }
          },
          {
            field: 'refDate11',
            title: this.refDatesStr[11],
            footerTemplate: "#: data.refDate11 ? data.refDate11.sum : 0 #",
            attributes: {
              'class': 'table-cell',
              style: 'text-align: right;'
            },
            width: 50,
            filterable: {
              cell: {
                inputWidth: 40,
                delay: 0,
                showOperators: false
              }
            }
          }
        ]
      };

      this.gridGraphOptions = {
        theme: "metroblack",
        tooltip: {
          visible: true,
          background: "black",
          color: "white",
          template: "#= series.name #: #= value #"
        },
        legend: {
          position: "top"
        },
        seriesDefaults: {
          type: "column"
        },
        series: [
          {field: "stock0", name: "5Y-111"},
          {field: "stock1", name: "5Y-112"},
          {field: "stock2", name: "5Y-113"},
          {field: "stock3", name: "5Y-114"},
          {field: "stock4", name: "5Y-115"},
          {field: "stock5", name: "5Y-116"},
          {field: "stock6", name: "5Y-117"},
          {field: "stock7", name: "5Y-118"},
          {field: "stock8", name: "5Y-119"},
          {field: "stock9", name: "5Y-120"},
          {field: "stock10", name: "5Y-121"},
          {field: "stock11", name: "5Y-122"}
        ],
        dataSource: {
          transport: {
            read: {
              url: "api/graph_data.json",
              dataType: "json"
            }
          }
        },
        valueAxis: {
          line: {
            visible: false
          }
        },
        categoryAxis: {
          categories: ["10/01", "10/02", "10/03", "10/04", "10/05", "10/06", "10/07", "10/08", "10/09", "10/10", "10/11", "10/12"],
          line: {
            visible: false
          },
          labels: {
            padding: {top: 155}
          }
        }
      }
    }
  }
}
