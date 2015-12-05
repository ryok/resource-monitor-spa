module spa5 {
  'use strict';

  export class RouterConfig {
    /** @ngInject */
    constructor($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
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
  }
}
