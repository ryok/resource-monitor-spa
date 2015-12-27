/// <reference path="../zabbixIf/zabbixIfContributor.service.ts" />

module spa5 {
  'use strict';
  
  class Series {
    name: any;
    data: Array<number>;
  }
  
  export class CpuService {
    public authId: any;
    public hostids: Array<any>;
    // public hostnames: Array<any>;
    private graphs: Object;
    public categories: Array<any>;
    public data1: Array<number>;
    public data2: Array<number>;
    private seriesArray: Array<Series>;
      
    /* @ngInject */
    constructor(private $log: angular.ILogService, private $http: angular.IHttpService, private zabbixIfContributor: ZabbixIfContributor) {  
    }
      
    public getChartOptions(): Object {
      console.log('getChartOptions start...');
      this.graphs = [
        {
          label:'LA5',
          filter:{
            key_:'system.cpu.load[percpu,avg5]'
          },
          type:0
        }
        ];
          
      this.zabbixIfContributor.login()
      .then(r => {
        this.authId = r;
        
        // get hosts info
        this.zabbixIfContributor.getHost(this.authId.result)
        .then(res => {
          var hostInfo: any = res;
          this.hostids = new Array(hostInfo.result.length);
          // this.hostnames = new Array(hostInfo.result.length);
          this.seriesArray = new Array(hostInfo.result.length);
          for (var i=0;i<hostInfo.result.length;i++) {
            this.hostids[i] = hostInfo.result[i].hostid;
            // this.hostnames[i] = hostInfo.result[i].host;
          }
          console.log('item.get start...');
        
          for(var i=0;i<this.hostids.length;i++) {
            var hostid: any = this.hostids[i];
            this.seriesArray[i].name = hostInfo.result[i].host;
            // console.log('hostid', hostid);
            for(var key in this.graphs) {                  
              // get item
              this.zabbixIfContributor.getItem(this.authId.result,hostid, this.graphs[key].filter)
              .then(r => {
                var item: any = r;
                // Objectが存在しないresponse.data.resultが帰ってくる。。なぞ
                if (item.result[0].itemid !== undefined) {
                    
                  var itemid = item.result[0].itemid;
                  // console.log('itemid', itemid);
                      
                  // get history
                  console.log('history.get start..');
                  this.zabbixIfContributor.getHistory(this.authId.result, this.graphs[key].type, itemid)
                  .then(r => {
                    var historyData: any = r;
                    console.log('history.get ', historyData);
                    this.categories = new Array(historyData.result.length);
                    this.data1 = new Array(historyData.result.length);
                    // this.data2 = new Array(historyData.result.length);
                    for(var k=0;k<historyData.result.length;k++) {
                      this.categories[k] = historyData.result[k].clock;
                      this.data1[k] = historyData.result[k].value;
                      // this.data2[k] = historyData.result[k].value;
                      this.seriesArray[i].data[k] = historyData.result[k].value;
                    }
                    // console.log('data1', this.data1);
                    return this.setOptionParams();
                  });
                }
              });
              /*.catch((error: any): any => {
                console.log('item.get failed');
              });*/
            }
          }
        });
        /*.catch((error: any): any => {
            console.log('host.get failed');
        });*/
      });
      /*.catch((error: any): any => {
          console.log('user.login failed');
      });*/
    }
    
    private setOptionParams(): Object {
      var chartOption: Object = {
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
      console.log('option', chartOption);
      return chartOption;
    }
    
    /*public getSeries(): Object {
        console.log('getSeries start...');
        /*var series: Object = 
        [
            {
                field: 'value',
                name: 'Zabbix Server'
            },
            {
                field: 'value',
                name: 'Dummy Host'
            }
        ];
        var series: Object = 
        [
            {
                name: 'Zabbix Server',
                data: this.data1
            },
            {
                name: 'Demo Server',
                data: this.data2
            }
        ]
        return series;
    }
    
    public getCategories(): Object {
        var cpuCategoryAxis: Object = {
            categories: this.categories,
            majorGridLines: {
                visible: false
            },
            labels: {
                rotation: 'auto'
            }
        }
        console.log('cpuCategoryAxis', cpuCategoryAxis);
        return cpuCategoryAxis;
    }
    
    public getDataSource(): Object {
        console.log('getDataSource start...');
        var data: Object = 
        [
            {
                "host": "Zabbix Server",
                "time": "1994",
                "value": 4.9
            },
            {
                "host": "Zabbix Server",
                "time": "1995",
                "value": 4.9
            },
            {
                "host": "Zabbix Server",
                "time": "1996",
                "value": 1.9
            },
            {
                "host": "Zabbix Server",
                "time": "1997",
                "value": 2.9
            },
            {
                "host": "Zabbix Server",
                "time": "1998",
                "value": 4
            },
            {
                "host": "Zabbix Server",
                "time": "1999",
                "value": 3
            },
            {
                "host": "Dummy Host",
                "time": "2000",
                "value": 6.9
            },
            {
                "host": "Dummy Host",
                "time": "1998",
                "value": 6.9
            },
            {
                "host": "Dummy Host",
                "time": "1999",
                "value": 8
            },
            {
                "host": "Zabbix Server",
                "time": "2000",
                "value": 1.9
            }
        ];
        return data;
    }*/
  }
}