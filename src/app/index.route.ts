module spa1 {
  'use strict';

  export class RouterConfig {
    /** @ngInject */
    constructor($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
      $stateProvider
        .state('home', {
          url: '/spa1',
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
        })
        .state('home.agreements', {
          url: '/agreements',
          // regNoにはnullを入れておかないと、以下の$stateParamsで受け取れないためnullを入れておく
          params: { 'regNo': null },
          resolve: {
            // multiStock: () => {
            //   return {
            //     multiStock: ($http) => {
            //       return $http({ method: 'GET', url: 'api/multi_stock.json' });
            //     }
            //   }
            // }
          },
          onEnter: ['$stateParams', '$state', '$modal', ($stateParams, $state, $modal) => {
            $modal.open({
              animation: true,
              size: 'lg',
              controller: 'AgreementController',
              controllerAs: 'modal',
              templateUrl: 'app/modal/modal_template.html'
            }).result.finally(() => {
              $state.go('^');
            });
          }],
          views: {
            'modal-body@': {
              templateUrl: 'app/agreement/agreement.html'
            }
          }
        });

      $urlRouterProvider.otherwise('/spa1');
    }
  }
}
