var spa5;
(function (spa5) {
    'use strict';
    var TopNavbarController = (function () {
        function TopNavbarController() {
            this.currentImageNumber = 0;
            this.availableImages = [
                '../../../assets/images/black_bond.png',
                '../../../assets/images/white_bond.png',
                '../../../assets/images/logo.png'
            ];
            this.templateDefault = true;
        }
        return TopNavbarController;
    })();
    spa5.TopNavbarController = TopNavbarController;
})(spa5 || (spa5 = {}));
