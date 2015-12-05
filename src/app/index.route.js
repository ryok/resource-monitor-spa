var spa5;
(function (spa5) {
    'use strict';
    var RouterConfig = (function () {
        function RouterConfig($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('home', {
                url: '/spa5',
                views: {
                    'leftSidebar': {
                        templateUrl: 'app/leftSidebar/left_sidebar.html'
                    },
                    'topNavbar': {
                        templateUrl: 'app/topNavbar/top_navbar.html',
                        controller: 'TopNavbarController',
                        controllerAs: 'topNavbar'
                    },
                    'main': {
                        templateUrl: 'app/main/main.html',
                        controller: 'MainController',
                        controllerAs: 'main'
                    },
                    'bottomBar': {
                        templateUrl: 'app/bottomBar/bottom_bar.html'
                    },
                    'rightSidebar': {
                        templateUrl: 'app/rightSidebar/right_sidebar.html',
                        controller: 'RightSidebarController',
                        controllerAs: 'rightSidebar'
                    }
                }
            });
            $urlRouterProvider.otherwise('/spa5');
        }
        return RouterConfig;
    })();
    spa5.RouterConfig = RouterConfig;
})(spa5 || (spa5 = {}));
