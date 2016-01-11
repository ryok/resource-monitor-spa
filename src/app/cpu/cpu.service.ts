/// <reference path="../zabbixIf/zabbixIfContributor.service.ts" />

module spa5 {
  'use strict';
  
  class Series {
    public name: any;
    public data: number[];
  }
  
  class CpuHistoryData {
    name: any;
    data: number[];
    categories : number[];
  }
  
  export class CpuService {
    public authId: any;
    private graphs: Object;
    public categories: number[] = [];
    public seriesData: number[];
    public seriesArray: Series[] = [];
    //public cpuInfos: Object;
    public cpuHistoryDatas: CpuHistoryData[] = [];
    
    private apiHost: string = 'http://ryok-centos.cloudapp.net/zabbix/api_jsonrpc.php';
    private user = 'Admin';
    private password = 'zabbix';
      
    /* @ngInject */
    constructor(private $log: angular.ILogService, 
          private $http: angular.IHttpService, 
          private zabbixIfContributor: ZabbixIfContributor) {
    }
    
    // get cpu data
    public getCpuData() {
      console.log('getCpuData start...');
      this.graphs = [
        {
          label:'LA5',
          filter:{
            key_:'system.cpu.load[percpu,avg5]'
          },
          type:0
        }
      ];

      // zabbix user login
      return this.zabbixIfContributor.login()
      .then((res: any) => {
        this.authId = res;
        
        // get hosts info
        return this.zabbixIfContributor.getHost(this.authId.result)
        .then((res: any) => {
          var hostInfo: any = res;
          for(var i=0;i<hostInfo.result.length;i++) {
            var hostid: any = hostInfo.result[i].hostid;
            var hostname: any = hostInfo.result[i].host;
            for(var key in this.graphs) {
              return this.zabbixIfContributor.getItem(this.authId.result,hostid, this.graphs[key].filter)
              .then((res: any) => {
                var item: any = res;
                var itemid = item.result[0].itemid;
                
                // get history
                return this.zabbixIfContributor.getHistory(this.authId.result, this.graphs[key].type, itemid)
                .then((res: any) => {
                  var historyData: any = res;
                  // console.log('histryData', historyData);
                  this.seriesData = [];
                  for(var k=0;k<historyData.result.length;k++) {
                    this.categories.push(historyData.result[k].clock);
                    this.seriesData.push(historyData.result[k].value);
                  }
                  /*this.cpuHistoryDatas.push({
                    name: hostname,
                    data: [89,54,34],
                    categories :[2000,2001,2002]
                  });*/
                  this.cpuHistoryDatas.push({
                    name: hostname,
                    data: this.seriesData,
                    categories: this.categories
                  });
                  return this.cpuHistoryDatas;
                });
              });
            }
          }
          // return cpuInfos;
        });
      });
    }
    
    public getCpuData2() {      
      console.log('CpuService start...');
      this.graphs = [
        {
          label:'LA5',
          filter:{
            key_:'system.cpu.load[percpu,avg5]'
          },
          type:0
        }
      ];

      // zabbix user login
      this.zabbixIfContributor.login()
      .then(r => {
        this.authId = r;

        // get hosts info
        this.zabbixIfContributor.getHost(this.authId.result)
        .then(res => {
          var hostInfo: any = res;

          // get item(cpu)
          for(var i=0;i<hostInfo.result.length;i++) {
            var hostid: any = hostInfo.result[i].hostid;
            var hostname: any = hostInfo.result[i].host;
            for(var key in this.graphs) {
              this.zabbixIfContributor.getItem(this.authId.result,hostid, this.graphs[key].filter)
              .then(r => {
                var item: any = r;
                var itemid = item.result[0].itemid;

                // get history
                console.log('history.get start..');
                return this.zabbixIfContributor.getHistory(this.authId.result, this.graphs[key].type, itemid)
                .then(r => {
                  var historyData: any = r;
                  console.log('histryData', historyData);
                  this.seriesData = [];
                  /*for(var k=0;k<historyData.result.length;k++) {
                    this.categories.push(historyData.result[k].clock);
                    this.seriesData.push(historyData.result[k].value);
                  }
                  this.seriesArray.push({
                    name: hostname,
                    data: this.seriesData
                  });*/
                  this.categories = [2000,2001,2002];
                  //this.cpuController.categories = [2000,2001,2002];
                  this.seriesArray.push({
                    name: hostname,
                    data: [89,54,34]
                  });
                  /*this.cpuController.seriesArray.push({
                    name: hostname,
                    data: [89,54,34]
                  });*/
                  console.log('seriesArray', this.seriesArray);
                  console.log('categories', this.categories);
                  
                });
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
    
    // get cpu info
    public getCpuInfo(): angular.IPromise<any[]> {
      console.log('getCpuInfo start...');
      this.graphs = [
        {
          label: 'LA5',
          filter: {
            key_: 'system.cpu.load[percpu,avg5]'
          },
          type:0
        }
      ];
      
      // user login
      console.log('user login...');
      var data = {
        jsonrpc: '2.0',
        id:      1,
        auth:    null,
        method:  'user.login',
        params:  {
          'user'     : this.user,
          'password' : this.password
        }
      };
      return this.$http.post(this.apiHost, data)
      .then((response: any): any => {
        var authId = response.data.result;
        
        //get host info
        console.log('get host info...', authId);
        var data = {
          jsonrpc: '2.0',
          id:      1,
          auth:    authId,
          method:  'host.get',
          params:  {
            'output'    : 'extend',
            'sortfield' : 'host'
          }
        };
        return this.$http.post(this.apiHost, data)
        .then((response: any): any => {
          var hostInfo = response.data;
          
          // get item(cpu)
          console.log('get item...', hostInfo);
          for(var i=0;i<hostInfo.result.length;i++) {
            var hostid: any = hostInfo.result[i].hostid;
            var hostname: any = hostInfo.result[i].host;
            for(var key in this.graphs) {
              var data = {
                jsonrpc: '2.0',
                id:      1,
                auth:    authId,
                method:  'item.get',
                params:  {
                  'hostids' : hostid,
                  'filter'  : this.graphs[key].filter
                }
              };
              return this.$http.post(this.apiHost, data)
              .then((response: any): any => {
                var itemId = response.data.result[0].itemid;
                
                // get history data
                console.log('get history data...', itemId);
                var unixtime: number = new Date().getTime() / 1000;
                var now = parseInt( unixtime.toString() );
                var timeTill = now;
                var timeFrom = now - 86400;
                var data = {
                  jsonrpc: '2.0',
                  id:      1,
                  auth:    authId,
                  method:  'history.get',
                  params:  {
                    'history'  : this.graphs[key].type,
                    'itemids'  : itemId,
                    'output'   : 'extend',
                    'time_from': timeFrom,
                    'time_till': timeTill,
                    'limit'    : 288
                  }
                };
                return this.$http.post(this.apiHost, data)
                .then((response: any): any => {
                  var historyData: any = response.data;
                  for(var k=0;k<historyData.result.length;k++) {
                    this.categories.push(historyData.result[k].clock);
                    this.seriesData.push(historyData.result[k].value);
                  }
                  this.cpuHistoryDatas.push({
                    name: hostname,
                    data: this.seriesData,
                    categories: this.categories
                  });
                  console.log('cpuHistoryDatas push');
                  return this.cpuHistoryDatas;
                })
                .catch((error: any): any => {
                  this.$log.error('Failed for init.¥n', error.data);
                });
              })
              .catch((error: any): any => {
                  this.$log.error('Failed for init.¥n', error.data);
              });
            }
          }
          return this.cpuHistoryDatas;
        })
        .catch((error: any): any => {
          this.$log.error('Failed for init.¥n', error.data);
        });
      })
      .catch((error: any): any => {
        this.$log.error('Failed for init.¥n', error.data);
      });
    }
    
    /*public getSeries(): Object {
      console.log('getSeries start...');
      var seriesArray2: Array<Series> = new Array(4);
      seriesArray2[0] = new Series('India', [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]);
      seriesArray2[1] = new Series('World', [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727]);
      seriesArray2[2] = new Series('Russian Federation', [4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3]);
      seriesArray2[3] = new Series('Haiti', [-0.253, 0.362, -3.519, 1.799, 2.252, 3.343, 0.843, 2.877, -5.416, 5.590]);
      var categoriesValue: Array<number> = [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011];
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
        series: seriesArray2,
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
          categories: categoriesValue,
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
      console.log('chartOption',chartOption);
      return chartOption;
    }*/
    
    /*public getCategories(): Object {
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
    }*/
  }
}