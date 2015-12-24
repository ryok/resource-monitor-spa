module spa5 {
  'use strict';

  export class ZabbixIfContributor {
    private apiHost: string = 'http://ryok-centos.cloudapp.net/zabbix/api_jsonrpc.php';
    private user = 'Admin';
    private password = 'zabbix';
    
    /* @ngInject */
    constructor(private $log: angular.ILogService, private $http: angular.IHttpService) {
    }
    
    // user login
    public login(): angular.IPromise<any[]> {
      console.log('user.login start..');
      
      var data = {
        jsonrpc: '2.0',
        id:      1,
        auth:    null,
        method:  'user.login',
        params:  {
            'user' : this.user,
            'password' : this.password
        }
      };
      return this.$http.post(this.apiHost, data)
      .then((response: any): any => {
        return response.data;
      })
      .catch((error: any): any => {
        this.$log.error('Failed for init.¥n', error.data);
      });
    }
          
    // get hosts info
    public getHost(authId: any): angular.IPromise<any[]> {
      console.log('host.get start..');

      var data = {
          jsonrpc: '2.0',
          id:      1,
          auth:    authId,
          method:  'host.get',
          params:  {
              'output' : 'extend',
              'sortfield' : 'host'
            }
      };
      return this.$http.post(this.apiHost, data)
      .then((response: any): any => {
        return response.data;
      })
      .catch((error: any): any => {
        this.$log.error('Failed for init.¥n', error.data);
      });
    }
    
    // item.get
    public getItem(authId: any, hostid: any, filter: any): angular.IPromise<any[]>  {
        console.log('item.get start...');
        
        var data = {
            jsonrpc: '2.0',
            id:      1,
            auth:    authId,
            method:  'item.get',
            params:  {
                'hostids' : hostid,
                'filter' : filter
                }
        };
        return this.$http.post(this.apiHost, data)
        .then((response: any): any => {
            return response.data;
        })
        .catch((error: any): any => {
            this.$log.error('Failed for init.¥n', error.data);
        });
    }
    
    // history get
    public getHistory(authId: any, type: any, itemId: any): angular.IPromise<any[]>  {
        console.log('history.get start..');
        
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
                'history' : type,
                'itemids' : itemId,
                'output' : 'extend',
                'time_from' : timeFrom,
                'time_till' : timeTill,
                'limit' :     288
                    }
        };
        return this.$http.post(this.apiHost, data)
        .then((response: any): any => {
           return response.data;
        })
        .catch((error: any): any => {
           this.$log.error('Failed for init.¥n', error.data);
        });
    }
  }
}
