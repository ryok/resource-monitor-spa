var spa5;
(function (spa5) {
    'use strict';
    var TitleClockController = (function () {
        function TitleClockController($timeout) {
            var _this = this;
            this.clock = 'loading clock...';
            this.tickInterval = 1000;
            this.timeout = $timeout;
            var tick = function () {
                _this.clock = Date.now();
                _this.timeout(tick, _this.tickInterval);
            };
            this.timeout(tick, this.tickInterval);
        }
        return TitleClockController;
    })();
    spa5.TitleClockController = TitleClockController;
})(spa5 || (spa5 = {}));
