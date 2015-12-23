module spa5 {
  'use strict';

  export class HostService {
    public apiHost: string = 'http://ryok-centos.cloudapp.net/zabbix/api_jsonrpc.php';
    
    /* @ngInject */
    constructor(private $log: angular.ILogService, private $http: angular.IHttpService) {
    }
    
    public getHost(authId: any): angular.IPromise<any[]> {
      console.log('host.get start..');
      // console.log('authId',authId);
      
      // get hosts info
      var data = {
          jsonrpc: '2.0',
          id:      1,
          auth:    authId,
          method:  'host.get',
          params:  {
              "output":"extend",
              "sortfield":"host"
            }
      }
      return this.$http.post(this.apiHost, data)
      .then((response: any): any => {
        // console.log('host res');
        return response.data;
      })
      .catch((error: any): any => {
        this.$log.error('Failed for init.¥n', error.data);
      });
    }
  }
}
