var spa5;
(function (spa5) {
    'use strict';
    var MinimalizaSidebarController = (function () {
        function MinimalizaSidebarController($timeout) {
            this.timeout = $timeout;
        }
        MinimalizaSidebarController.prototype.minimalize = function () {
            $('body').toggleClass('mini-navbar');
            if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
                $('#side-menu').hide();
                this.timeout(function () {
                    $('#side-menu').fadeIn(500);
                }, 100);
            }
            else if ($('body').hasClass('fixed-sidebar')) {
                $('#side-menu').hide();
                this.timeout(function () {
                    $('#side-menu').fadeIn(500);
                }, 300);
            }
            else {
                $('#side-menu').removeAttr('style');
            }
        };
        return MinimalizaSidebarController;
    })();
    spa5.MinimalizaSidebarController = MinimalizaSidebarController;
})(spa5 || (spa5 = {}));
