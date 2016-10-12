(function (angular) {
	'use strict';

	/**********************************************************
	 * 
	 * ng.cx.popover - v0.0.6
	 * 
<<<<<<< 318d629baf4a1ff01832efe2dd94e29042f90bd0
	 * Release date : 2016-06-30 : 10:46
=======
	 * Release date : 2016-10-10 : 16:10
>>>>>>> touch screen detection
	 * Author       : Jaime Beneytez - EF CTX 
	 * License      : MIT 
	 * 
	 **********************************************************/
	
	
	
	/**********************************************************
	 *
	 * @ngdoc module
	 * @name ng.cx.popover
	 * @module ng.cx.popover
	 * @description provides a way to dropdown a transcluded content
	 *
	 **********************************************************/
	
	angular.module('ng.cx.popover', [
	    'ng.cx.popover.trigger',
	    'ng.cx.popover.popover',
	    'ng.cx.popover.service'
	])
	
	/**********************************************************/
	;
	
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
	        
	
	        return {
	            scope: {},
	            bindToController: {
	                ioPopoverId : '@cxPopoverTriggerIoPopoverId',
	                ioPlacement : '@?cxPopoverTriggerIoPlacement',
	                ioEvent     : '@?cxPopoverTriggerIoEvent',
	                ioEnabled   : '=?cxPopoverTriggerIoEnabled'
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
	        
	
	        var self = this,
	            _popoverId = this.ioPopoverId,
	            _handler,
	            _popover;
	
	        self.ioEnabled   = angular.isDefined(self.ioEnabled) ? self.ioEnabled : true;
	        self.ioEvent     = self.ioEvent     || 'mouseenter';
	        self.ioPlacement = self.ioPlacement || 'right';
	
	        _init();
	
	        $scope.$on('$destroy', function() {
	            if (_popover) {
	                cxPopoverService.deregistrerPopover(_popover);
	            }
	        });
	
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
	

}(angular));