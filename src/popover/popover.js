/**********************************************************
 *
 * @ngdoc module
 * @name ng.cx.popover.popover
 * @module ng.cx.popover.popover
 *
 **********************************************************/
angular.module('ng.cx.popover.popover', [
    'ngAnimate',
    'ng.cx.popover.service'
])

/**********************************************************
 *
 * @ngdoc component
 * @name cxPopover
 * @module ng.cx.popover
 *
 **********************************************************/

.directive('cxPopover', [
    function() {
        'use strict';

        return {
            replace: 'element',
            transclude: true,
            template: '<div class="cx-popover" ng-show="isVisible" ng-class="{\'visible\':isVisible}"><div class="arrow"></div><div ng-transclude></div></div>',
            scope: {},
            bindToController: {
                ioPopoverId: '@cxPopoverIoPopoverId'
            },
            controller: 'cxPopoverController as cxPopoverController'
        };
    }
])

/**********************************************************
 *
 * @ngdoc controller
 * @name cxPopoverController
 * @module ng.cx.popover
 * @description  Description
 *
 **********************************************************/

.controller('cxPopoverController', [
    '$scope',
    '$document',
    '$element',
    '$animate',
    'cxPopoverService',
    function cxPopoverController(
        $scope,
        $document,
        $element,
        $animate,
        cxPopoverService
    ) {
        'use strict';

        var self = this,
            _popoverRect,
            _popoverId = this.ioPopoverId,
            _isVisible = false;

        this.show = show;
        this.hide = hide;
        this.remove = remove;

        Object.defineProperty($scope, 'isVisible', {
            get: function() {
                return _isVisible;
            }
        });

        Object.defineProperty(self, 'isVisible', {
            get: function() {
                return _isVisible;
            }
        });

        Object.defineProperty(self, 'popoverId', {
            get: function() {
                return _popoverId;
            }
        });

        _init();

        $scope.$on('$destroy', function() {
            cxPopoverService.deregistrerPopover(self);
        });

        function remove() {
            $element.remove();
        }

        function _init() {
            cxPopoverService.registrerPopover(self);
            $document.find('body').append($element);
            // calculate the measurements when the element has been rendered
            $scope.$applyAsync(_calculatePopoverRect);

        }

        function _calculatePopoverRect() {
            $element.css('opacity', '0');
            _popoverRect = $element[0].getBoundingClientRect();
            $element.css('opacity', null);
        }

        function show($target, placement) {
            $element.addClass(placement);
            _move($target, placement);
            _isVisible = true;
            $scope.$applyAsync();
        }

        function hide() {
            _isVisible = false;
            _move();
            $scope.$evalAsync();
        }

        function _move(target, placement) {
            var coords;
            if (target && placement) {
                updatePosition(_getCoordsByTargetAndPlacement(target, placement));
            } else {
                $animate.on('addClass', $element, updatePosition);
            }

            function updatePosition(position) {
                $element.css('top', position.top);
                $element.css('left', position.left);
            }

        }

        function _getCoordsByTargetAndPlacement($target, placement) {
            var $targetRect = $target[0].getBoundingClientRect(),
                $popoverRect = _popoverRect,
                top, left;

            switch (placement) {
                case 'right':
                    top = ($targetRect.top + ($targetRect.height / 2)) - ($popoverRect.height / 2);
                    left = $targetRect.left + $targetRect.width;
                    break;
                case 'left':
                    top = ($targetRect.top + ($targetRect.height / 2)) - ($popoverRect.height / 2);
                    left = $targetRect.left - $popoverRect.width;
                    break;
                case 'top':
                    left = ($targetRect.left + ($targetRect.width / 2)) - ($popoverRect.width / 2);
                    top = $targetRect.top - $popoverRect.height;
                    break;
                case 'bottom':
                    left = ($targetRect.left + ($targetRect.width / 2)) - ($popoverRect.width / 2);
                    top = $targetRect.top + $targetRect.height;
                    break;
            }

            return {
                top: top + 'px',
                left: left + 'px'
            };

        }
    }
]);
