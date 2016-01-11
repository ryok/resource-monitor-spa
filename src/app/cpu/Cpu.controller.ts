/// <reference path="./cpu.service.ts" />

module spa5 {
  'use strict';

  class Series {
    public name: any;
    public data: number[];
  }

  export class CpuController {
    private state: any;
    public cpuChartOptions: Object;
    private cpuSeries: Series[] = [];
    public cpuCategoryAxis: Object;
    public seriesArray: Series[] = [];
    public categories: number[] = [];
    public cpuDataSource: any;

    /* @ngInject */
    constructor($state, private $log: angular.ILogService, private cpuService: CpuService) {
      
      this.state = $state;
      
      /*this.cpuChartOptions = {
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
        tooltip: {
          visible: true,
          format: '{0}%',
          template: '#= series.name #: #= value #'
        }
      };*/
      
      cpuService.getCpuData()
      .then((res: any) => {
        var cpuHistoryDatas = res;
        console.log('cpuHistoryDatas', cpuHistoryDatas);
        for (var key in cpuHistoryDatas) {
          this.seriesArray.push({
            name: cpuHistoryDatas[key].name,
            data: cpuHistoryDatas[key].data
          });
          /*this.cpuSeries.push({
            name: cpuHistoryDatas[key].name,
            data: cpuHistoryDatas[key].data
          });*/
          this.categories = cpuHistoryDatas[key].categories;
        }
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
          series: this.seriesArray,
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
            categories: this.categories,
            majorGridLines: {
              visible: false
            },
            labels: {
              rotation: "auto"
            }
          },
          tooltip: {
            visible: true,
            format: '{0}%',
            template: '#= series.name #: #= value #'
          }
        };
      });
      
      // this.cpuSeries = cpuService.seriesArray;
      /*this.cpuSeries = this.seriesArray;*/
      /*this.cpuCategoryAxis = {
        categories: this.categories,
        majorGridLines: {
          visible: false
        },
        labels: {
          rotation: 'auto'
        }
      };*/
      
      /*this.cpuSeries = [
        {
          name: 'Zabbix Server1',
          data: [99, 89, 12]
        },
        {
          name: 'Demo Server',
          data: [34,45,11]
        }
      ];
      this.cpuSeries.push({
        name: 'A Server',
        data: [78,3,239]
      });*/
      /*this.cpuCategoryAxis = {
        categories: [2000, 2001, 2002],
        majorGridLines: {
          visible: false
        },
        labels: {
          rotation: 'auto'
        }
      };
      this.cpuDataSource = new kendo.data.DataSource({
        data: [78,3,239]
      });*/
    }
  }
}
