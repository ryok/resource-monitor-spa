module spa5 {
  'use strict';

  export class CpuController {
    private state: any;
    cpuChartOptions: Object;

    /* @ngInject */
    constructor($state) {
      this.state = $state;

      this.cpuChartOptions = {
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
        series: [{
            name: 'India',
            data: [3.907, 7.943, 7.848, 9.284, 9.263, 9.801, 3.890, 8.238, 9.552, 6.855]
        },{
            name: 'World',
            data: [1.988, 2.733, 3.994, 3.464, 4.001, 3.939, 1.333, -2.245, 4.339, 2.727]
        },{
            name: 'Russian Federation',
            data: [4.743, 7.295, 7.175, 6.376, 8.153, 8.535, 5.247, -7.832, 4.3, 4.3]
        },{
            name: 'Haiti',
            data: [-0.253, 0.362, -3.519, 1.799, 2.252, 3.343, 0.843, 2.877, -5.416, 5.590]
        }],
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
            categories: [2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011],
            majorGridLines: {
                visible: false
            },
            labels: {
                rotation: 'auto'
            }
        },
        tooltip: {
            visible: true,
            format: '{0}%',
            template: '#= series.name #: #= value #'
        }
      };

      // data source
      /*this.cpuDataSource = new kendo.data.DataSource({
        transport: {
          read: {
            url: 'api/server_cpu.json',
            dataType: 'json'
          }
        },
        sort: {
          field: 'year',
          dir: 'asc'
        }
      });*/
    }

    callApi(method: string, params: string,
      async: string, success: string, error: string) {
        var url  = 'http://ryok-centos.cloudapp.net/zabbix/api_jsonrpc.php'; //環境に合わせる
        var sendData = {
          jsonrpc: '2.0',
          id:      1,
          auth:    authid,
          method:  method,
          params:  params,
        }

        $.ajax({
          url:          url,
          contentType: 'application/json-rpc',
          dataType:    'json',
          type:        'POST',
          processData: false,
          data:        JSON.stringify(sendData),
          async:       async,
          success:     success,
          error:       error,
        });
    }
    getAPIResponse(method: string, params: string, async: string, callback: string){
      callAPI(method, params, async,
        function(response){
          if(response['error']){
            alert("API Error:" + JSON.stringify(response));
          }else{
            callback(response['result']);
          }
        },
        function(response){
          alert("Connect Error:" + JSON.stringify(response));
        }
      );
    }
  }
}
