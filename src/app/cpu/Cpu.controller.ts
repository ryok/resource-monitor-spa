/// <reference path="../auth/authContributor.service.ts" />
/// <reference path="./cpu.service.ts" />

module spa5 {
  'use strict';

  export class CpuController {
    private state: any;
    public cpuChartOptions: Object;
    public authId: any;

    /* @ngInject */
    constructor($state, private $log: angular.ILogService, private cpuService: CpuService) {
      
      this.state = $state;
      
      // get cpu
      // this.cpuService.getCpu();

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
        series: [{
            name: 'India',
            data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]
        },{
            name: 'World',
            data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727]
        },{
            name: 'Russian Federation',
            data: [4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3]
        },{
            name: 'Haiti',
            data: [-0.253, 0.362, -3.519, 1.799, 2.252, 3.343, 0.843, 2.877, -5.416, 5.590]
        }],
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
            categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
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
    
    // private init(): angular.IPromise<any[]> {
    //   console.log("init start..");
    //   var user = 'Admin';
    //   var password = 'zabbix';
    //   var data = {
    //     jsonrpc: '2.0',
    //     id:      1,
    //     auth:    null,
    //     method:  'user.login',
    //     params:  {"user":user,"password":password}
    //   }
    //   return this.$http.post(this.apiHost,data)
    //   .then((response: any): any => {
    //     return response.data;
    //   })
    //   .catch((error: any): any => {
    //     this.$log.error('Failed for init.¥n', error.data);
    //   });
    // }
  }
}
