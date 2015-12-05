module spa5 {
  'use strict';

  export class TopNavbarController {
    currentImageNumber: number;
    availableImages: Array<string>;
    templateDefault: boolean;

    /* @ngInject */
    constructor() {
      this.currentImageNumber = 0;
      this.availableImages = [
        '../../../assets/images/black_bond.png',
        '../../../assets/images/white_bond.png',
        '../../../assets/images/logo.png'
      ];

      this.templateDefault = true;
    }

    // changeColor(): void {
    //   if (this.templateDefault) {
    //     $('body').removeClass('black-orange');
    //     $('body').addClass('white-green');

    //     this.currentImageNumber = 1;
    //     $('#right-sidebar').removeClass('black-orange');
    //     $('#right-sidebar').addClass('white-green');
    //   } else {
    //     $('body').removeClass('white-green');
    //     $('body').addClass('black-orange');

    //     this.currentImageNumber = 0;
    //     $('#right-sidebar').removeClass('white-green');
    //     $('#right-sidebar').addClass('black-orange');
    //   }

    //   this.templateDefault = !this.templateDefault;
    // }
  }
}
