/// <reference path="../auth/authContributor.service.ts" />

module spa5 {
    'use strict';
    
    export class CpuService {
        public apiHost: string = 'http://ryok-centos.cloudapp.net/zabbix/api_jsonrpc.php';
        public authId: any;
        public hostids: Array<any>;
        public hostnames: Array<any>;
        private graphs: Object;
        
        /* @ngInject */
        constructor(private $log: angular.ILogService, private $http: angular.IHttpService, private authContributor: AuthContributor) {
            
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
                    type:3}
            ];
            
            this.authContributor.login()
            .then(r => {
              this.authId = r; 

              // get hosts info
              var data = {
                  jsonrpc: '2.0',
                  id:      1,
                  auth:    this.authId.result,
                  method:  'host.get',
                  params:  {"output":"extend","sortfield":"host"}
              }
              console.log('host.get start...');
              this.$http.post(this.apiHost,data)
              .then((response: any): any => {
                  // this.hosts = response.data.result;
                  // this.hosts = response.data;
                  // console.log('host.get ', response.data.result);
                  this.hostids = new Array(response.data.result.length);
                  this.hostnames = new Array(response.data.result.length);
                  for (var i=0;i<response.data.result.length;i++) {
                      // console.log(response.data.result[i].hostid);
                      // console.log(response.data.result[i].host);
                      // this.hostids.push(response.data.result[i].hostid);
                      // this.hostnames.push(response.data.result[i].host);
                      this.hostids[i] = response.data.result[i].hostid;
                      this.hostnames[i] = response.data.result[i].host;
                  }
                  console.log(this.hostids);
                  console.log(this.hostnames);
                  
                  console.log('getCpu start...');
                  console.log('hostids', this.hostids);
                  console.log('hostnames', this.hostnames);
                
                  for(var i=0;i<this.hostids.length;i++) {
                      var hostid = this.hostids[i];
                      console.log('hostid', hostid);
                      console.dir(this.graphs);
                      for(var key in this.graphs) {
                          var graph = key;
                          console.log('graph',graph);
                        
                          var data = {
                              jsonrpc: '2.0',
                              id:      1,
                              auth:    this.authId.result,
                              method:  'item.get',
                              params:  {
                                  "hostids":hostid,
                                  "filter":graph.filter
                                  }
                          }
                          this.$http.post(this.apiHost, data)
                          .then((response: any): any => {
                              var itemid = response.data.result[0].itemid;
                              console.log('item.get', itemid);
                              
                              //history get
                              console.log(parseInt(new Date().toDateString));
                              //var now = parseInt(new Date()/1000);
                              var data = {
                                jsonrpc: '2.0',
                                id:      1,
                                auth:    this.authId.result,
                                method:  'history.get',
                                params:  {
                                    "history":graph.type,
                                    "itemids":itemid,
                                    "output":"extend",
                                    "time_from": 86400,
                                    "time_till": 0,
                                    "limit":     288
                                        }
                              }
                              this.$http.post(this.apiHost, data)
                              .then((response: any): any => {
                                console.log('history.get',response.data);
                              })
                              .catch((error: any): any => {
                                console.log('history.get failed');
                              });  
                              
                          })
                          .catch((error: any): any => {
                              console.log('item.get failed');
                          });
                      }
                  }
                })
                .catch((error: any): any => {
                    console.log('host.get failed');
                });
              });
        }
    }
}