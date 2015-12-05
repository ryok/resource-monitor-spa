module spa5 {
  'use strict';

  export class MainController {

    /* @ngInject */
    constructor() {
      $('.tr-connect-panel').kendoSortable({
        filter: '>div',
        cursor: 'move',
        connectWith: '.tr-connect-panel',
        placeholder: (e) => {
          return e.clone().addClass('tr-placeholder').text('drop here');
        },
        hint: (e) => {
          return e.clone().addClass('tr-hint');
        }
      });

      // exapand
      $('.tr-panel-wrap').on('click', 'span.k-i-arrowhead-s', (e) => {
        var contentElement = $(e.target).closest('.tr-widget').find('>div');
        $(e.target).removeClass('k-i-arrowhead-s').addClass('k-i-arrowhead-n');

        kendo.fx(contentElement).expand('vertical').stop().play();
      });

      // collapse
      $('.tr-panel-wrap').on('click', 'span.k-i-arrowhead-n', (e) => {
        var contentElement = $(e.target).closest('.tr-widget').find('>div');
        $(e.target).removeClass('k-i-arrowhead-n').addClass('k-i-arrowhead-s');

        kendo.fx(contentElement).expand('vertical').stop().reverse();
      });
    }
  }
}
