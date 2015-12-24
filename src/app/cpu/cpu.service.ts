/// <reference path="../zabbixIf/zabbixIfContributor.service.ts" />

module spa5 {
    'use strict';
    
    export class CpuService {
        public apiHost: string = 'http://ryok-centos.cloudapp.net/zabbix/api_jsonrpc.php';
        public authId: any;
        public hostids: Array<any>;
        public hostnames: Array<any>;
        private graphs: Object;
        private categories: Array<any>;
        
        /* @ngInject */
        constructor(private $log: angular.ILogService, private $http: angular.IHttpService, private zabbixIfContributor: ZabbixIfContributor) {
            console.log('cpu service start...');
            
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
                  this.hostnames = new Array(hostInfo.result.length);
                  for (var i=0;i<hostInfo.result.length;i++) {
                      this.hostids[i] = hostInfo.result[i].hostid;
                      this.hostnames[i] = hostInfo.result[i].host;
                  }
                  console.log('item.get start...');
                
                  for(var i=0;i<this.hostids.length;i++) {
                      var hostid: any = this.hostids[i];
                      console.log('hostid', hostid);
                      for(var key in this.graphs) {
                          console.log('graphs', this.graphs[key].filter);
                          
                          // get item
                          this.zabbixIfContributor.getItem(this.authId.result,hostid, this.graphs[key].filter)
                          .then(r => {
                              var item: any = r;
                              // Objectが存在しないresponse.data.resultが帰ってくる。。なぞ
                              if (item.result[0].itemid !== undefined) {
                              
                                var itemid = item.result[0].itemid;
                                console.log('itemid', itemid);
                                
                                // get history
                                console.log('history.get start..');
                                this.zabbixIfContributor.getHistory(this.authId.result, this.graphs[key].type, itemid)
                                .then(r => {
                                    var historyData: any = r;
                                    console.log('history.get ', historyData);
                                    for(var k=0;k<historyData.result.length;k++) {
                                    //for(var key in historyData.result) {
                                        this.categories[key] = historyData.result[key].clock;
                                        console.log('cate',this.categories[key]);
                                    }
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
        
        public getSeries(): Object {
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
            ];*/
            var series: Object = 
            [
                {
                    name: 'Zabbix Server',
                    data: [1, 3, 5, 5, 8, 2]
                },
                {
                    name: 'Demo Server',
                    data: [6, 3, 2, 2, 3, 9]
                }
            ]
            return series;
        }
        
        /*public getCategories(): Array<any> {
            
        }*/
        
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
        }
    }
}