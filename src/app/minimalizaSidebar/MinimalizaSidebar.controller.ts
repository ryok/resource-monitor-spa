module spa5 {
  'use strict';

  export class MinimalizaSidebarController {
    private timeout: ng.ITimeoutService;

    /* @ngInject */
    constructor($timeout: ng.ITimeoutService) {
      this.timeout = $timeout;
    }

    minimalize() {
      $('body').toggleClass('mini-navbar');

      if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        // hide menu in order to smoothly turn on when maximize menu
        $('#side-menu').hide();

        // for smoothly turn on menu
        this.timeout(() => {
          $('#side-menu').fadeIn(500);
        }, 100);
      } else if ($('body').hasClass('fixed-sidebar')) {
        $('#side-menu').hide();

        // for smoothly turn on menu
        this.timeout(() => {
          $('#side-menu').fadeIn(500);
        }, 300);
      } else {
        // remove all inline style from jquery fadeIn function to reset menu state
        $('#side-menu').removeAttr('style');
      }
    }
  }
}
