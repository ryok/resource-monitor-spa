/// <reference path="./cpu.service.ts" />

module spa5 {
  'use strict';

  export class CpuController {
    private state: any;
    public cpuChartOptions: Object;
    private cpuSeries: Object;
    private cpuDataSource: Object;

    /* @ngInject */
    constructor($state, private $log: angular.ILogService, private cpuService: CpuService) {
      
      this.state = $state;
      
      // get cpu
      // this.cpuService.getCpu();
      
      this.cpuSeries = this.cpuService.getSeries();
      this.cpuDataSource = this.cpuService.getDataSource();

      this.cpuChartOptions = {
        title: {
              text: 'CPU Usage (%)'
        },
        legend: {
            position: 'bottom'
        },
        chartArea: {
            background: ''
        },
        seriesDefaults: {
            type: 'line',
            style: 'smooth'
        },
        valueAxis: {
            labels: {
                format: '{0}%'
            },
            line: {
                visible: false
            },
            axisCrossingValue: -10
        },
        categoryAxis: {
            field: "time",
            majorGridLines: {
                visible: false
            },
            labels: {
                rotation: 'auto'
            }
        },
        tooltip: {
            visible: true,
            format: '{0}%',
            template: '#= series.name #: #= value #'
        }
      };

      // data source
      /*this.cpuDataSource = new kendo.data.DataSource({
        transport: {
          read: {
            url: 'api/server_cpu.json',
            dataType: 'json'
          }
        },
        sort: {
          field: 'year',
          dir: 'asc'
        }
      });*/
    }
  }
}
