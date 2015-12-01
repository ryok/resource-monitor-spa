module spa1 {
  'use strict';

  /** @ngInject */
  export function titleClock(): ng.IDirective {

    return {
      restrict: 'A',
      scope: {},
      bindToController: {},
      template: '<h3 class="tr-titleclock">{{ titleClock.clock | date:"yyyy / MM / dd (EEE) HH : mm : ss"}}</h3>',
      controller: 'TitleClockController',
      controllerAs: 'titleClock'
    };
  }
}
