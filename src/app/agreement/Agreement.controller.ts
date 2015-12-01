module spa1 {
  'use strict';

  export class AgreementController {
    stateParams: any;
    modalInstance: any;
    SweetAlert: any;
    title: string;
    multiStockGridOptions: Object;
    dealFNMOptions: Object;
    userNMOptions: Object;
    custRNMOptions: Object;
    agreeDateOptions: Object;
    deliveryDateOptions: Object;
    JGBCCFOptions: Object;

    /* @ngInject */
    constructor($stateParams, $modalInstance, SweetAlert) {
      this.stateParams = $stateParams;
      this.modalInstance = $modalInstance;
      this.SweetAlert = SweetAlert;
      this.title = '約定入力';

      // 複数銘柄の表
      this.multiStockGridOptions = {
        dataSource: {
          transport: {
            read: {
              url: "api/multi_stock.json",
              dataType: "json"
            }
          },
          // schema: {
          //   model: {
          //     fields: {
          //       stockCD: { type: 'string' },
          //       stockRNM: { type: 'string' },
          //       faceValAmt: { type: 'number' },
          //       agreeRate: { type: 'number' },
          //       deliveryPrice: { type: 'number' }
          //     }
          //   }
          // },
          pageSize: 15
        },
        sortable: true,
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
            field: "stockCD",
            title: "銘柄コード"
          },
          {
            field: "stockRNM",
            title: "銘柄名称"
          },
          {
            field: "faceValAmt",
            title: "額面金額"
          },
          {
            field: "agreeRate",
            title: "約定レート"
          },
          {
            field: "deliveryPrice",
            title: "受渡単価"
          }
        ]
      };

      // 売買種類
      this.dealFNMOptions = {
        dataTextField: "dealFNM",
        dataValueField: "dealFCD",
        dataSource: {
          transport: {
            read: {
              url: "api/DEAL_F_T.json",
              dataType: "json"
            }
          }
        }
      };

      // 約定者
      this.userNMOptions = {
        dataTextField: "userNM",
        dataValueField: "userCD",
        dataSource: {
          transport: {
            read: {
              url: "api/USER_M.json",
              dataType: "json"
            }
          }
        }
      };

      // 取引先名
      this.custRNMOptions = {
        dataTextField: "custRNM",
        dataValueField: "custCD",
        dataSource: {
          transport: {
            read: {
              url: "api/CUST_COM_M.json",
              dataType: "json"
            }
          }
        }
      };

      // 約定日
      this.agreeDateOptions = {
        dataTextField: "agreeDate",
        dataValueField: "regNo",
        dataSource: {
          transport: {
            read: {
              url: "api/AGREE_DESC_T.json",
              dataType: "json"
            }
          }
        },
        format: '{0:MM/dd}'
      };

      // 受渡日
      this.deliveryDateOptions = {
        // dataTextField: "text",
        // dataValueField: "value",
        // dataSource: {
        //   transport: {
        //     read: {
        //       url: "api/CUST_COM_M.json",
        //       dataType: "json"
        //     }
        //   }
        // }
      };

      // JGBCC区分
      this.JGBCCFOptions = {
        dataTextField: "JGBCCFText",
        dataValueField: "JGBCCFValue",
        dataSource: {
          transport: {
            read: {
              url: "api/JGBCC_F.json",
              dataType: "json"
            }
          }
        }
      }
    }

    close(): void {
      this.modalInstance.close();
    }

    agree(): void {
      this.SweetAlert.swal({
        title: '約定登録しますか？',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ffa500',
        confirmButtonText: 'はい、します',
        cancelButtonText: 'いいえ、しません',
        closeOnConfirm: false,
        closeOnCancel: true
      }, (isConfirm) => {
        if (isConfirm) {
          this.modalInstance.close();
          this.SweetAlert.swal({
            confirmButtonColor: '#ffa500',
            title: '約定登録',
            text: '正常に完了しました'
          });
        }
      });
    }
  }
}
