module spa5 {
  'use strict';

  /** @ngInject */
  export function iCheck(): ng.IDirective {

    return {
      restrict: 'A',
      scope: {},
      bindToController: {},
      //require: 'ngModel',
      controller: 'ICheckController',
      controllerAs: 'iCheck'
    };
  }

  // function linkFunc(scope: ng.IScope, element: JQuery, attrs: any, ngModel: any) {
  //   return this.timeout( () => {
  //     var value;
  //     value = attrs['value'];

  //     scope.$watch(attrs['ngModel'], (newValue) => {
  //       element.iCheck('update');
  //     });

  //     return element.iCheck({
  //       checkboxClass: 'icheckbox_square',
  //       radioClass: 'iradio_square'
  //     }).on('ifChanged', (event) => {
  //       // if (element.attr('type') === 'checkbox' && attrs['ngModel']) {
  //       //   scope.$apply( () => {
  //       //     return ngModel.$setViewValue(event.target.checked);
  //       //   });
  //       // }
  //       if (element.attr('type') === 'radio' && attrs['ngModel']) {
  //         return scope.$apply( () => {
  //           return ngModel.$setViewValue(value);
  //         });
  //       }
  //     });
  //   });
  // }
}
