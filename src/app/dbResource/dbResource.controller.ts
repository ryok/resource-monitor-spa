module spa5 {
  'use strict';

  export class DbResourceController {
    dbInstance: any;
    modalInstance: any;
    multiStockGridOptions: Object;
    dealFNMOptions: Object;

    /* @ngInject */
    constructor($stateParams, $modalInstance, SweetAlert) {

      // 売買種類
      this.dealFNMOptions = {
        dataTextField: 'dealFNM',
        dataValueField: 'dealFCD',
        dataSource: {
          transport: {
            read: {
              url: 'api/DEAL_F_T.json',
              dataType: 'json'
            }
          }
        }
      };
    }
  }
}
