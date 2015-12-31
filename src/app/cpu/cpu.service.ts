/// <reference path="../zabbixIf/zabbixIfContributor.service.ts" />

module spa5 {
  'use strict';
  
  class Series {
    public name: any;
    public data: Array<number>;
    constructor(_name: any, _data: Array<number>) {
      this.name = _name;
      this.data = _data;
    }
    /*set data(newData: Array<number>) {
      this.data = newData;
    }*/
  }
  
  export class CpuService {
    public authId: any;
    public hostids: Array<any>;
    public hostnames: Array<any>;
    private graphs: Object;
    public categories: Array<number>;
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
      
      // zabbix user login    
      this.zabbixIfContributor.login()
      .then(r => {
        this.authId = r;
        
        // get hosts info
        this.zabbixIfContributor.getHost(this.authId.result)
        .then(res => {
          var hostInfo: any = res;
          this.hostids = new Array(hostInfo.result.length);
          this.hostnames = new Array(hostInfo.result.length);
          this.seriesArray = new Array(hostInfo.result.length);
          for (var i=0;i<hostInfo.result.length;i++) {
            this.hostids[i] = hostInfo.result[i].hostid;
            this.hostnames[i] = hostInfo.result[i].host;
          }
          // console.log('hostnames', this.hostnames);
          // loop host
          for(var i=0;i<this.hostids.length;i++) {
            var hostid: any = this.hostids[i];
            // this.seriesArray[i] = new Series(hostInfo.result[i].host);
            // this.seriesArray[i].name = hostInfo.result[i].host;
            for(var key in this.graphs) {
              console.log('hostnames1', this.hostnames[i]);
              // get item(cpu)
              this.zabbixIfContributor.getItem(this.authId.result,hostid, this.graphs[key].filter)
              .then(r => {
                var item: any = r;
                // Objectが存在しないresponse.data.resultが帰ってくる。。なぞ
                console.log('hostnames2', this.hostnames[i]);
                if (item.result[0].itemid !== undefined) {
                  var itemid = item.result[0].itemid;
                  console.log('hostnames3', this.hostnames[i]);
                      
                  // get history
                  console.log('history.get start..');
                  this.zabbixIfContributor.getHistory(this.authId.result, this.graphs[key].type, itemid)
                  .then(r => {
                    var historyData: any = r;
                    // console.log('history.get ', historyData);
                    this.categories = new Array(historyData.result.length);
                    this.data1 = new Array(historyData.result.length);
                    // this.data2 = new Array(historyData.result.length);
                    for(var k=0;k<historyData.result.length;k++) {
                    //for(var k=0;k<20;k++) {
                      this.categories[k] = historyData.result[k].clock;
                      this.data1[k] = historyData.result[k].value;
                      // this.data2[k] = historyData.result[k].value;
                      // this.seriesArray[i].data[k] = historyData.result[k].value;
                    }
                    
                    //this.seriesArray[i] = new Series(this.hostnames[i], this.data1);
                    this.seriesArray[i] = new Series("test", this.data1);
                    console.log('seriesArray', this.seriesArray);
                    var optionParams: Object = this.setOptionParams();
                    console.log('optionParams', optionParams);
                    return optionParams;
                    /*var chartOption: Object = {
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
                    return chartOption;*/
                  });
                }
              });
              /*.catch((error: any): any => {
                console.log('item.get failed');
              });*/
            }
            // return this.setOptionParams();
          }
        });
        /*.catch((error: any): any => {
            console.log('host.get failed');
        });*/
      });
      /*.catch((error: any): any => {
          console.log('user.login failed');
      });*/
      var nullObj: Object;
      return nullObj;
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
      //console.log('option', chartOption);
      return chartOption;
    }
    
    public getSeries(): Object {
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
    }
    
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