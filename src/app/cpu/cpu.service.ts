/// <reference path="../auth/authContributor.service.ts" />

module spa5 {
    'use strict';
    
    export class CpuService {
        public apiHost: string = 'http://ryok-centos.cloudapp.net/zabbix/api_jsonrpc.php';
        public authId: any;
        public hosts: any;
        private graphs: Object;
        
        /* @ngInject */
        constructor(private $log: angular.ILogService, private $http: angular.IHttpService, private authContributor: AuthContributor) {
            
            console.log('cpu service start...');
            
            this.authContributor.login()
            .then(r => {
              this.authId = r; 
              console.log('cpuService ' + this.authId.result);
              
              // update hosts
              var data = {
                  jsonrpc: '2.0',
                  id:      1,
                  auth:    this.authId.result,
                  method:  'host.get',
                  params:  {"output":"extend","sortfield":"host"}
              }
              this.$http.post(this.apiHost,data)
              .then((response: any): any => {
                  this.hosts = response.data.result;
                  // this.hosts = response.data;
                  console.log('host.get ', this.hosts);
                  for (var host in this.hosts) {
                      console.log(host);
                  }
              })
              .catch((error: any): any => {
                  console.log('host.get failed');
              });
            });
            
        }
        
        public getCpu() {
          console.log('getCpu start...');
          
          this.graphs = [
            {label:'LA5',
            filter:{key_:'system.cpu.load[,avg5]'},    
            type:0},
            {label:'Mem Avail',
            filter:{key_:'vm.memory.size[available]'},
            type:3}
          ];
          
          // zabbix login
          /*this.authContributor.login()
            .then(r => {
              this.authId = r; 
              console.log(this.authId.result);
              
              // 
            });
            
            var data = {
                jsonrpc: '2.0',
                id:      1,
                auth:    null,
                method:  'user.login',
                params:  {"user":user,"password":password}
            }
            return this.$http.post(this.apiHost,data)
            .then((response: any): any => {
                return response.data;
            })
            .catch((error: any): any => {
                this.$log.error('Failed for init.¥n', error.data);
            });*/
        }
    }
}