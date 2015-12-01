module spa1 {
  'use strict';

  export class ICheckController {
    private timeout: ng.ITimeoutService;
    private scope: ng.IScope;
    private element: JQuery;
    private attrs: any;

    /* @ngInject */
    constructor($timeout: ng.ITimeoutService, $scope: ng.IScope, $element: JQuery, $attrs: any) {
      this.timeout = $timeout;
      this.scope = $scope;
      this.element = $element;
      this.attrs = $attrs;

      this.timeout(() => {
        var value;
        value = this.attrs['value'];

        this.scope.$watch(this.attrs['ngModel'], (newValue) => {
          this.element.iCheck('update');
        });

        return this.element.iCheck({
          checkboxClass: 'icheckbox_square',
          radioClass: 'iradio_square'
        }).on('ifChanged', (event) => {
          // if (element.attr('type') === 'checkbox' && attrs['ngModel']) {
          //   scope.$apply( () => {
          //     return ngModel.$setViewValue(event.target.checked);
          //   });
          // }
          if (this.element.attr('type') === 'radio' && this.attrs['ngModel']) {
            return this.scope.$apply(() => {
              return this.attrs['ngModel'].$setViewValue(value);
            });
          }
        });
      });
    }
  }
}
