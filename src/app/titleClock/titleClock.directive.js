var spa5;
(function (spa5) {
    'use strict';
    function titleClock() {
        return {
            restrict: 'A',
            scope: {},
            bindToController: {},
            template: '<h3 class="tr-titleclock">{{ titleClock.clock | date:"yyyy / MM / dd (EEE) HH : mm : ss"}}</h3>',
            controller: 'TitleClockController',
            controllerAs: 'titleClock'
        };
    }
    spa5.titleClock = titleClock;
})(spa5 || (spa5 = {}));
