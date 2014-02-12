'use strict';
/*jshint multistr:true*/

angular.module('stanleygu.spinners.src', [])
  .directive('spinner', function($http, $templateCache, $compile) {
    return {
      restrict: 'E',
      scope: {
        screenColor: '@',
        screenOpacity: '@',
        color: '@',
        loading: '@',
        template: '@'
      },
      // templateUrl: function($element, $attrs) {
      //   var base = '/templates/';
      //   return $attrs.type ? base + $attrs.type + '.html' : base + 'threeBounce.html';
      // },
      link: function postLink(scope, element, attr) {
        function loadTemplate(template) {
          var base = '/src/templates/';
          var url = base + template + '.html';
          $http.get(url, {
            cache: $templateCache
          })
            .success(function(templateContent) {
              element.children().remove();
              element.append($compile(templateContent)(scope));
              positionSpinner(element);
            });
        }

        function positionSpinner(element) {
          angular.element(element[0].querySelector('.spinner-background'))
            .css('position', 'absolute')
            .css('width', '100%')
            .css('height', '100%')
            .css('background-color', scope.screenColor || 'black')
            .css('opacity', scope.screenOpacity || 0.6);

          angular.element(element[0].querySelector('.spinner-container'))
            .css('position', 'absolute')
            .css('top', '45%')
            .css('left', '50%')
            .css('z-index', '100');

          angular.element(element[0].querySelector('.spinner'))
            .css('position', 'relative')
            .css('top', '-50%')
            .css('left', '-50%')
            .css('margin', 'auto auto 0')
            .css('text-align', 'center')
            .css('z-index', '101');

          var t = element.attr('template');
          if (t === 'pulse' || t === 'rotatePlane') {
            angular.element(element[0].querySelector('.spinner')).css('background-color', scope.color || 'black');
          } else {
            angular.element(element[0].querySelectorAll('.spinner > div'))
              .css('background-color', scope.color || 'black');
          }
        }
        // var base = '/templates/';
        // scope.$watch(attr.type, function() {
        var parent = element.parent();
        var previousPosition = parent.css('position');

        element
          .css('position', 'absolute')
          .css('top', '0')
          .css('right', '0')
          .css('bottom', '0')
          .css('left', '0')
          .css('z-index', '99');

        scope.$watch('loading', function(newVal) {
          if (newVal === 'true' || newVal === true) {
            parent.css('position', 'relative');
            element.removeClass('ng-hide');
          } else {
            parent.css('position', previousPosition);
            element.addClass('ng-hide');
          }
        });

        scope.$watch('screenColor', function() {
          angular.element(element[0].querySelector('.spinner-background'))
            .css('background-color', scope.screenColor || 'black');
        });

        scope.$watch('screenOpacity', function() {
          angular.element(element[0].querySelector('.spinner-background'))
            .css('opacity', scope.screenOpacity || 0.6);
        });

        scope.$watch('color', function() {
          var t = element.attr('template');
          if (t === 'pulse' || t === 'rotatePlane') {
            angular.element(element[0].querySelector('.spinner')).css('background-color', scope.color || 'black');
          } else {
            angular.element(element[0].querySelectorAll('.spinner > div'))
              .css('background-color', scope.color || 'black');
          }
        });

        scope.$watch('template', function() {
          loadTemplate(scope.template);
        });
      }
    };
  });
