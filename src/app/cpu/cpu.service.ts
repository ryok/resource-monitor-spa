/// <reference path="../zabbixIf/zabbixIfContributor.service.ts" />

module spa5 {
    'use strict';
    
    export class CpuService {
        public apiHost: string = 'http://ryok-centos.cloudapp.net/zabbix/api_jsonrpc.php';
        public authId: any;
        public hostids: Array<any>;
        public hostnames: Array<any>;
        private graphs: Object;
        
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
                  // console.log('hostInfo',hostInfo.result);
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
                          this.zabbixIfContributor.getItem(this.authId.result,hostid, this.graph[key].filter)
                          .then(r => {
                              var item: any = r;
                              // Objectが存在しないresponse.data.resultが帰ってくる。。なぞ
                              if (item.result[0].itemid !== undefined) {
                              
                                var itemid = item.result[0].itemid;
                                console.log('itemid', itemid);
                                
                                // get history
                                console.log('history.get start..');
                                var unixtime: number = new Date().getTime() / 1000;
                                var now = parseInt( unixtime.toString() );
                                var timeTill = now;
                                var timeFrom = now - 86400;
                                
                                this.zabbixIfContributor.getHistory(this.authId.result, this.graphs[key].type, itemid, timeFrom, timeTill)
                                .then(r => {
                                    var historyData = r;
                                    console.log('history.get ', historyData);
                                })
                              }
                          })
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
    }
}