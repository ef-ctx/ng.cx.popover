/**********************************************************
 *
 * @ngdoc module
 * @name ng.cx.popover.service
 * @module ng.cx.popover.service
 *
 **********************************************************/
angular.module('ng.cx.popover.service', [
    'ngAnimate'
])

/**********************************************************
 *
 * @ngdoc service
 * @name cxPopoverService
 *
 **********************************************************/

.service('cxPopoverService', [
    function cxPopoverService() {
        'use strict';

        var _popoverMap = {};

        this.registrerPopover = registrerPopover;
        this.deregistrerPopover = deregistrerPopover;
        this.getPopoverById = getPopoverById;
        this.hideAll = hideAll;

        function registrerPopover(popoverController) {
            _popoverMap[popoverController.popoverId] = popoverController;
        }

        function deregistrerPopover(popoverController) {
            if (_popoverMap.hasOwnProperty(popoverController.popoverId)) {
                popoverController.remove();
                delete _popoverMap[popoverController.popoverId];
            }
        }

        function getPopoverById(id) {
            return _popoverMap[id];
        }

        function hideAll() {
            for (var id in _popoverMap) {
                _popoverMap[id].hide();
            }
        }
    }
])

/**********************************************************/

;
