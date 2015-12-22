/// <reference path="../auth/authContributor.service.ts" />
/// <reference path="../host/host.service.ts" />

module spa5 {
    'use strict';
    
    export class CpuService {
        public apiHost: string = 'http://ryok-centos.cloudapp.net/zabbix/api_jsonrpc.php';
        public authId: any;
        public hostids: Array<any>;
        public hostnames: Array<any>;
        private graphs: Object;
        
        /* @ngInject */
        constructor(private $log: angular.ILogService, private $http: angular.IHttpService, private authContributor: AuthContributor, private hostService: HostService) {
            
            console.log('cpu service start...');
            
            this.graphs = [
                {
                    label:'LA5',
                    filter:{
                        key_:'system.cpu.load[,avg5]'
                    },
                    type:0},
                {
                    label:'Mem Avail',
                    filter:{
                        key_:'vm.memory.size[available]'
                    },
                    type:3
                }
            ];
            
            this.authContributor.login()
            .then(r => {
              this.authId = r;
              
              // get hosts info
              this.hostService.getHost(this.authId.result)
                .then(res => {
                  var hostInfo: any = res;
                  console.log('hostInfo',hostInfo.result);
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
                          console.log('graphs', this.graphs[key]);
                          var data = {
                              jsonrpc: '2.0',
                              id:      1,
                              auth:    this.authId.result,
                              method:  'item.get',
                              params:  {
                                  "hostids":hostid,
                                  "filter":this.graphs[key].filter
                                  }
                          }
                          this.$http.post(this.apiHost, data)
                          .then((response: any): any => {
                              console.log('item.get', response.data);
                              
                              // Objectが存在しないresponse.data.resultが帰ってくる。。なぞ
                              if (response.data.result[0].itemid !== undefined) {
                              
                                var itemid = response.data.result[0].itemid;
                                console.log('itemid', itemid);
                                
                                //history get
                                console.log('history.get start..');
                                //    console.log(parseInt(new Date().toDateString));
                                //var now = parseInt(new Date()/1000);
                                var now = parseInt(new Date().toDateString());
                                var timeTill = now;
                                var timeFrom = now - 86400;
                                console.log('timeTill', timeTill);
                                console.log('timeFrom', timeFrom);
                                var data = {
                                    jsonrpc: '2.0',
                                    id:      1,
                                    auth:    this.authId.result,
                                    method:  'history.get',
                                    params:  {
                                        "history":this.graphs[key].type,
                                        "itemids":itemid,
                                        "output":"extend",
                                        "time_from": timeFrom,
                                        "time_till": timeTill,
                                        "limit":     288
                                            }
                                }
                                console.dir(data);
                                console.log(JSON.stringify(data));
                                
                                this.$http.post(this.apiHost, data)
                                    .then((response: any): any => {
                                    console.log('history.get',response.data);
                                    console.log('history.get array',response.data.result);
                                    })
                                    .catch((error: any): any => {
                                    console.log('history.get failed');
                                    });
                              }
                          })
                          .catch((error: any): any => {
                              console.log('item.get failed');
                          });
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