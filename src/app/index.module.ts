/// <reference path="../../.tmp/typings/tsd.d.ts" />

/// <reference path="index.route.ts" />
/// <reference path="index.config.ts" />
/// <reference path="index.run.ts" />

/// <reference path="agreement/Agreement.controller.ts" />
/// <reference path="balance/Balance.controller.ts" />
/// <reference path="board/Board.controller.ts" />
/// <reference path="grid/Grid.controller.ts" />
/// <reference path="duration/Duration.controller.ts" />
/// <reference path="iCheck/ICheck.controller.ts" />
/// <reference path="main/Main.controller.ts" />
/// <reference path="minimalizaSidebar/MinimalizaSidebar.controller.ts" />
/// <reference path="rightSidebar/RightSidebar.controller.ts" />
/// <reference path="titleClock/TitleClock.controller.ts" />
/// <reference path="topNavbar/TopNavbar.controller.ts" />

/// <reference path="iCheck/iCheck.directive.ts" />
/// <reference path="minimalizaSidebar/minimalizaSidebar.directive.ts" />
/// <reference path="titleClock/titleClock.directive.ts" />


// declare var malarkey: any;
// declare var toastr: Toastr;
// declare var moment: moment.MomentStatic;

module spa1 {
  'use strict';

  angular.module('spa1', ['ngResource', 'ui.router', 'ui.bootstrap', 'oitozero.ngSweetAlert', 'cfp.hotkeys', 'kendo.directives'])
    // .constant('malarkey', malarkey)
    // .constant('toastr', toastr)
    // .constant('moment', moment)
    .config(Config)

    .config(RouterConfig)

    .run(RunBlock)
    // .service('githubContributor', GithubContributor)
    // .service('webDevTec', WebDevTecService)
    .controller('AgreementController', AgreementController)
    .controller('BalanceController', BalanceController)
    .controller('BoardController', BoardController)
    .controller('DurationController', DurationController)
    .controller('GridController', GridController)
    .controller('ICheckController', ICheckController)
    .controller('MainController', MainController)
    .controller('MinimalizaSidebarController', MinimalizaSidebarController)
    .controller('RightSidebarController', RightSidebarController)
    .controller('TitleClockController', TitleClockController)
    .controller('TopNavbarController', TopNavbarController)
    .directive('iCheck', iCheck)
    .directive('minimalizaSidebar', minimalizaSidebar)
    .directive('titleClock', titleClock);
}
