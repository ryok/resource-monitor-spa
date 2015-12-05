var spa5;
(function (spa5) {
    'use strict';
    function minimalizaSidebar() {
        return {
            restrict: 'E',
            scope: {},
            bindToController: {},
            template: '<a class="navbar-minimalize minimalize-styl-2 btn btn-bg-color" ng-click="minimalizaSidebar.minimalize()"><i class="glyphicon glyphicon-menu-hamburger tr-icon-color"></i></a>',
            controller: 'MinimalizaSidebarController',
            controllerAs: 'minimalizaSidebar'
        };
    }
    spa5.minimalizaSidebar = minimalizaSidebar;
})(spa5 || (spa5 = {}));
