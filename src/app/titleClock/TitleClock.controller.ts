module spa5 {
  'use strict';

  export class TitleClockController {
    clock: string | number;
    private tickInterval: number;
    private timeout: ng.ITimeoutService;

    /* @ngInject */
    constructor($timeout: ng.ITimeoutService) {
      this.clock = 'loading clock...'; // initialise the time variable
      this.tickInterval = 1000; // ms
      this.timeout = $timeout;

      var tick = () => {
        this.clock = Date.now();
        this.timeout(tick, this.tickInterval);
      };
      // start the timer
      this.timeout(tick, this.tickInterval);
    }
  }
}
