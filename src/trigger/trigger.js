/**********************************************************
 *
 * @ngdoc module
 * @name ng.cx.popover.trigger
 * @module ng.cx.popover.trigger
 *
 **********************************************************/
angular.module('ng.cx.popover.trigger', [
    'ngAnimate',
    'ng.cx.popover.service'
])

/**********************************************************
 *
 * @ngdoc component
 * @name cxPopoverTrigger
 * @module ng.cx.popover
 *
 **********************************************************/

.directive('cxPopoverTrigger', [
    '$document',
    function(
        $document
    ) {
        'use strict';

        return {
            scope: {},
            bindToController: {
                ioPopoverId : '@cxPopoverTriggerIoPopoverId',
                ioPlacement : '@cxPopoverTriggerIoPlacement',
                ioEvent     : '@cxPopoverTriggerIoEvent',
                ioEnabled   : '=cxPopoverTriggerIoEnabled'
            },
            controller: 'cxPopoverTriggerController as cxPopoverTriggerController'
        };
    }
])

/**********************************************************
 *
 * @ngdoc controller
 * @name cxPopoverTriggerController
 * @module ng.cx.popover
 * @description  Description
 *
 **********************************************************/

.controller('cxPopoverTriggerController', [
    '$scope',
    '$document',
    '$element',
    'cxPopoverService',
    function cxPopoverTriggerController(
        $scope,
        $document,
        $element,
        cxPopoverService
    ) {
        'use strict';

        var self = this,
            _popoverId = this.ioPopoverId,
            _handler,
            _popover;

        self.ioEnabled   = self.ioEnabled   || true;
        self.ioEvent     = self.ioEvent     || 'mouseenter';
        self.ioPlacement = self.ioPlacement || 'right';

        _init();

        function _init() {
            _addEventListeners(self.ioEvent);
        }

        function _show() {
            if(self.ioEnabled) {
                cxPopoverService.hideAll();
                _popover.show($element, self.ioPlacement);
            }
        }

        function _hide() {
            _popover.hide();
        }

        function _addEventListeners() {
            switch(self.ioEvent){
                case 'mouseenter':
                    _addTriggerListener(_show);
                    _addLeaveListener();
                    break;
                case 'click':
                    _addTriggerListener(_onClickHandler);
                    break;
            }
        }

        function _addTriggerListener(handler) {
            _handler = handler;
            $element.on(self.ioEvent, _assignPopover);
        }

        function _assignPopover(event) {
            _popover = cxPopoverService.getPopoverById(_popoverId);
            $element.off(self.ioEvent, _assignPopover);
            $element.on(self.ioEvent, _handler);
            _handler(event);
        }

        function _addLeaveListener() {
            $element.on('mouseleave', _hide);
            $element.on('click', _hide);
        }

        function _onClickHandler(event) {
            event.stopImmediatePropagation();

            if(_popover.isVisible) {
                $document.off('click', _hide);
                _hide();
            } else {
                $document.on('click', _hide);
                _show();
            }
        }
    }
]);
