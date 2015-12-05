module spa5 {
  'use strict';

  export class CpuController {
    private state: any;
    onSeriesHover: Object;
    electricity: Object;

    /* @ngInject */
    constructor($state) {
      this.state = $state;

      // on

      this.electricity = new kendo.data.DataSource({
        transport: {
          read: {
            url: '../content/dataviz/js/spain-electricity.json',
            dataType: 'json'
          }
        },
        sort: {
          field: 'year',
          dir: 'asc'
        }
      });
    }
  }
}
