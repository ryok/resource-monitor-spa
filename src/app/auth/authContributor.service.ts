module spa5 {
  'use strict';

  export class AuthContributor {
    public apiHost: string = 'http://ryok-centos.cloudapp.net/zabbix/api_jsonrpc.php';

    /* @ngInject */
    constructor(private $log: angular.ILogService, private $http: angular.IHttpService) {
    }
    
    public login(): angular.IPromise<any[]> {
      console.log('user.login start..');
      
      // zabbix user/password
      var user = 'Admin';
      var password = 'zabbix';
      
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
      });
    }
  }
}
