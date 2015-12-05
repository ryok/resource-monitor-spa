var spa5;
(function (spa5) {
    'use strict';
    var DbResourceController = (function () {
        function DbResourceController($stateParams, $modalInstance, SweetAlert) {
            this.dealFNMOptions = {
                dataTextField: 'dealFNM',
                dataValueField: 'dealFCD',
                dataSource: {
                    transport: {
                        read: {
                            url: 'api/DEAL_F_T.json',
                            dataType: 'json'
                        }
                    }
                }
            };
        }
        return DbResourceController;
    })();
    spa5.DbResourceController = DbResourceController;
})(spa5 || (spa5 = {}));
