var spa5;
(function (spa5) {
    'use strict';
    var MainController = (function () {
        function MainController() {
            $('.tr-connect-panel').kendoSortable({
                filter: '>div',
                cursor: 'move',
                connectWith: '.tr-connect-panel',
                placeholder: function (e) {
                    return e.clone().addClass('tr-placeholder').text('drop here');
                },
                hint: function (e) {
                    return e.clone().addClass("tr-hint");
                }
            });
            $(".tr-panel-wrap").on("click", "span.k-i-arrowhead-s", function (e) {
                var contentElement = $(e.target).closest(".tr-widget").find(">div");
                $(e.target).removeClass("k-i-arrowhead-s").addClass("k-i-arrowhead-n");
                kendo.fx(contentElement).expand("vertical").stop().play();
            });
            $(".tr-panel-wrap").on("click", "span.k-i-arrowhead-n", function (e) {
                var contentElement = $(e.target).closest(".tr-widget").find(">div");
                $(e.target).removeClass("k-i-arrowhead-n").addClass("k-i-arrowhead-s");
                kendo.fx(contentElement).expand("vertical").stop().reverse();
            });
        }
        return MainController;
    })();
    spa5.MainController = MainController;
})(spa5 || (spa5 = {}));
