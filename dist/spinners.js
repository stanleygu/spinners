angular.module('stanleygu.spinners', [
  'stanleygu.spinners.src',
  'stanleygu.spinners.templates'
]);
'use strict';
angular.module('stanleygu.spinners.src', []).directive('spinner', [
  '$http',
  '$templateCache',
  '$compile',
  function ($http, $templateCache, $compile) {
    return {
      restrict: 'E',
      scope: {
        screenColor: '@',
        screenOpacity: '@',
        color: '@',
        loading: '@',
        template: '@'
      },
      link: function postLink(scope, element, attr) {
        function loadTemplate(template) {
          var base = '/src/templates/';
          var url = base + template + '.html';
          $http.get(url, { cache: $templateCache }).success(function (templateContent) {
            element.children().remove();
            element.append($compile(templateContent)(scope));
            positionSpinner(element);
          });
        }
        function positionSpinner(element) {
          angular.element(element[0].querySelector('.spinner-background')).css('position', 'absolute').css('width', '100%').css('height', '100%').css('background-color', scope.screenColor || 'black').css('opacity', scope.screenOpacity || 0.6);
          angular.element(element[0].querySelector('.spinner-container')).css('position', 'absolute').css('top', '45%').css('left', '50%').css('z-index', '100');
          angular.element(element[0].querySelector('.spinner')).css('position', 'relative').css('top', '-50%').css('left', '-50%').css('margin', 'auto auto 0').css('text-align', 'center').css('z-index', '101');
          var t = element.attr('template');
          if (t === 'pulse' || t === 'rotatePlane') {
            angular.element(element[0].querySelector('.spinner')).css('background-color', scope.color || 'black');
          } else {
            angular.element(element[0].querySelectorAll('.spinner > div')).css('background-color', scope.color || 'black');
          }
        }
        var parent = element.parent();
        var previousPosition = parent.css('position');
        element.css('position', 'absolute').css('top', '0').css('right', '0').css('bottom', '0').css('left', '0').css('z-index', '99');
        scope.$watch('loading', function (newVal) {
          if (newVal === 'true' || newVal === true) {
            parent.css('position', 'relative');
            element.removeClass('ng-hide');
          } else {
            parent.css('position', previousPosition);
            element.addClass('ng-hide');
          }
        });
        scope.$watch('screenColor', function () {
          angular.element(element[0].querySelector('.spinner-background')).css('background-color', scope.screenColor || 'black');
        });
        scope.$watch('screenOpacity', function () {
          angular.element(element[0].querySelector('.spinner-background')).css('opacity', scope.screenOpacity || 0.6);
        });
        scope.$watch('color', function () {
          var t = element.attr('template');
          if (t === 'pulse' || t === 'rotatePlane') {
            angular.element(element[0].querySelector('.spinner')).css('background-color', scope.color || 'black');
          } else {
            angular.element(element[0].querySelectorAll('.spinner > div')).css('background-color', scope.color || 'black');
          }
        });
        scope.$watch('template', function () {
          loadTemplate(scope.template);
        });
      }
    };
  }
]);
angular.module('stanleygu.spinners.templates', [
  'src/templates/chasingDots.html',
  'src/templates/circle.html',
  'src/templates/doubleBounce.html',
  'src/templates/pulse.html',
  'src/templates/rectangleBounce.html',
  'src/templates/rotatePlane.html',
  'src/templates/threeBounce.html',
  'src/templates/wanderingCubes.html'
]);
angular.module('src/templates/chasingDots.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('src/templates/chasingDots.html', '<style>\n' + '.spinner {\n' + '  margin: 100px auto;\n' + '  width: 40px;\n' + '  height: 40px;\n' + '  position: relative;\n' + '  text-align: center;\n' + '  -webkit-animation: rotate 2.0s infinite linear;\n' + '  animation: rotate 2.0s infinite linear;\n' + '}\n' + '.dot1, .dot2 {\n' + '  width: 60%;\n' + '  height: 60%;\n' + '  display: inline-block;\n' + '  position: absolute;\n' + '  top: 0;\n' + '  background-color: #333;\n' + '  border-radius: 100%;\n' + '  -webkit-animation: bounce 2.0s infinite ease-in-out;\n' + '  animation: bounce 2.0s infinite ease-in-out;\n' + '}\n' + '.dot2 {\n' + '  top: auto;\n' + '  bottom: 0px;\n' + '  -webkit-animation-delay: -1.0s;\n' + '  animation-delay: -1.0s;\n' + '}\n' + '@-webkit-keyframes rotate {\n' + '  100% {\n' + '    -webkit-transform: rotate(360deg)\n' + '  }\n' + '}\n' + '@keyframes rotate {\n' + '  100% {\n' + '    transform: rotate(360deg);\n' + '    -webkit-transform: rotate(360deg)\n' + '  }\n' + '}\n' + '@-webkit-keyframes bounce {\n' + '  0%, 100% {\n' + '    -webkit-transform: scale(0.0)\n' + '  }\n' + '  50% {\n' + '    -webkit-transform: scale(1.0)\n' + '  }\n' + '}\n' + '@keyframes bounce {\n' + '  0%, 100% {\n' + '    transform: scale(0.0);\n' + '    -webkit-transform: scale(0.0);\n' + '  }\n' + '  50% {\n' + '    transform: scale(1.0);\n' + '    -webkit-transform: scale(1.0);\n' + '  }\n' + '}\n' + '</style>\n' + '<div class="spinner-background">\n' + '</div>\n' + '<div class="spinner-container">\n' + '  <div class="spinner">\n' + '    <div class="dot1"></div>\n' + '    <div class="dot2"></div>\n' + '  </div>\n' + '</div>\n' + '');
  }
]);
angular.module('src/templates/circle.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('src/templates/circle.html', '<style>\n' + '.spinner {\n' + '  margin: 100px auto;\n' + '  width: 20px;\n' + '  height: 20px;\n' + '  position: relative;\n' + '}\n' + '.container1 > div, .container2 > div, .container3 > div {\n' + '  width: 6px;\n' + '  height: 6px;\n' + '  background-color: #333;\n' + '  border-radius: 100%;\n' + '  position: absolute;\n' + '  -webkit-animation: bouncedelay 1.2s infinite ease-in-out;\n' + '  animation: bouncedelay 1.2s infinite ease-in-out;\n' + '  /* Prevent first frame from flickering when animation starts */\n' + '  -webkit-animation-fill-mode: both;\n' + '  animation-fill-mode: both;\n' + '}\n' + '.spinner .spinner-group {\n' + '  position: absolute;\n' + '  width: 100%;\n' + '  height: 100%;\n' + '}\n' + '.container2 {\n' + '  -webkit-transform: rotateZ(45deg);\n' + '  transform: rotateZ(45deg);\n' + '}\n' + '.container3 {\n' + '  -webkit-transform: rotateZ(90deg);\n' + '  transform: rotateZ(90deg);\n' + '}\n' + '.circle1 {\n' + '  top: 0;\n' + '  left: 0;\n' + '}\n' + '.circle2 {\n' + '  top: 0;\n' + '  right: 0;\n' + '}\n' + '.circle3 {\n' + '  right: 0;\n' + '  bottom: 0;\n' + '}\n' + '.circle4 {\n' + '  left: 0;\n' + '  bottom: 0;\n' + '}\n' + '.container2 .circle1 {\n' + '  -webkit-animation-delay: -1.1s;\n' + '  animation-delay: -1.1s;\n' + '}\n' + '.container3 .circle1 {\n' + '  -webkit-animation-delay: -1.0s;\n' + '  animation-delay: -1.0s;\n' + '}\n' + '.container1 .circle2 {\n' + '  -webkit-animation-delay: -0.9s;\n' + '  animation-delay: -0.9s;\n' + '}\n' + '.container2 .circle2 {\n' + '  -webkit-animation-delay: -0.8s;\n' + '  animation-delay: -0.8s;\n' + '}\n' + '.container3 .circle2 {\n' + '  -webkit-animation-delay: -0.7s;\n' + '  animation-delay: -0.7s;\n' + '}\n' + '.container1 .circle3 {\n' + '  -webkit-animation-delay: -0.6s;\n' + '  animation-delay: -0.6s;\n' + '}\n' + '.container2 .circle3 {\n' + '  -webkit-animation-delay: -0.5s;\n' + '  animation-delay: -0.5s;\n' + '}\n' + '.container3 .circle3 {\n' + '  -webkit-animation-delay: -0.4s;\n' + '  animation-delay: -0.4s;\n' + '}\n' + '.container1 .circle4 {\n' + '  -webkit-animation-delay: -0.3s;\n' + '  animation-delay: -0.3s;\n' + '}\n' + '.container2 .circle4 {\n' + '  -webkit-animation-delay: -0.2s;\n' + '  animation-delay: -0.2s;\n' + '}\n' + '.container3 .circle4 {\n' + '  -webkit-animation-delay: -0.1s;\n' + '  animation-delay: -0.1s;\n' + '}\n' + '@-webkit-keyframes bouncedelay {\n' + '  0%, 80%, 100% {\n' + '    -webkit-transform: scale(0.0)\n' + '  }\n' + '  40% {\n' + '    -webkit-transform: scale(1.0)\n' + '  }\n' + '}\n' + '@keyframes bouncedelay {\n' + '  0%, 80%, 100% {\n' + '    transform: scale(0.0);\n' + '    -webkit-transform: scale(0.0);\n' + '  }\n' + '  40% {\n' + '    transform: scale(1.0);\n' + '    -webkit-transform: scale(1.0);\n' + '  }\n' + '}\n' + '</style>\n' + '<div class="spinner-background">\n' + '</div>\n' + '<div class="spinner-container">\n' + '  <div class="spinner">\n' + '    <div class="spinner-group container1">\n' + '      <div class="circle1"></div>\n' + '      <div class="circle2"></div>\n' + '      <div class="circle3"></div>\n' + '      <div class="circle4"></div>\n' + '    </div>\n' + '    <div class="spinner-group container2">\n' + '      <div class="circle1"></div>\n' + '      <div class="circle2"></div>\n' + '      <div class="circle3"></div>\n' + '      <div class="circle4"></div>\n' + '    </div>\n' + '    <div class="spinner-group container3">\n' + '      <div class="circle1"></div>\n' + '      <div class="circle2"></div>\n' + '      <div class="circle3"></div>\n' + '      <div class="circle4"></div>\n' + '    </div>\n' + '  </div>\n' + '</div>\n' + '');
  }
]);
angular.module('src/templates/doubleBounce.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('src/templates/doubleBounce.html', '<style>\n' + '/*** Double-bounce ***/\n' + ' .spinner {\n' + '  width: 40px;\n' + '  height: 40px;\n' + '  position: relative;\n' + '  margin: 100px auto;\n' + '}\n' + '.double-bounce1, .double-bounce2 {\n' + '  width: 100%;\n' + '  height: 100%;\n' + '  border-radius: 50%;\n' + '  background-color: #333;\n' + '  opacity: 0.6;\n' + '  position: absolute;\n' + '  top: 0;\n' + '  left: 0;\n' + '  -webkit-animation: bounce 2.0s infinite ease-in-out;\n' + '  animation: bounce 2.0s infinite ease-in-out;\n' + '}\n' + '.double-bounce2 {\n' + '  -webkit-animation-delay: -1.0s;\n' + '  animation-delay: -1.0s;\n' + '}\n' + '@-webkit-keyframes bounce {\n' + '  0%, 100% {\n' + '    -webkit-transform: scale(0.0)\n' + '  }\n' + '  50% {\n' + '    -webkit-transform: scale(1.0)\n' + '  }\n' + '}\n' + '@keyframes bounce {\n' + '  0%, 100% {\n' + '    transform: scale(0.0);\n' + '    -webkit-transform: scale(0.0);\n' + '  }\n' + '  50% {\n' + '    transform: scale(1.0);\n' + '    -webkit-transform: scale(1.0);\n' + '  }\n' + '}\n' + '</style>\n' + '<div class="spinner-background">\n' + '</div>\n' + '<div class="spinner-container">\n' + '  <div class="spinner">\n' + '    <div class="double-bounce1"></div>\n' + '    <div class="double-bounce2"></div>\n' + '  </div>\n' + '</div>\n' + '');
  }
]);
angular.module('src/templates/pulse.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('src/templates/pulse.html', '<style>\n' + '.spinner {\n' + '  width: 40px;\n' + '  height: 40px;\n' + '  margin: 100px auto;\n' + '  background-color: #333;\n' + '  border-radius: 100%;\n' + '  -webkit-animation: scaleout 1.0s infinite ease-in-out;\n' + '  animation: scaleout 1.0s infinite ease-in-out;\n' + '}\n' + '@-webkit-keyframes scaleout {\n' + '  0% {\n' + '    -webkit-transform: scale(0.0)\n' + '  }\n' + '  100% {\n' + '    -webkit-transform: scale(1.0);\n' + '    opacity: 0;\n' + '  }\n' + '}\n' + '@keyframes scaleout {\n' + '  0% {\n' + '    transform: scale(0.0);\n' + '    -webkit-transform: scale(0.0);\n' + '  }\n' + '  100% {\n' + '    transform: scale(1.0);\n' + '    -webkit-transform: scale(1.0);\n' + '    opacity: 0;\n' + '  }\n' + '}\n' + '</style>\n' + '<div class="spinner-background">\n' + '</div>\n' + '<div class="spinner-container">\n' + '  <div class="spinner"></div>\n' + '</div>\n' + '');
  }
]);
angular.module('src/templates/rectangleBounce.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('src/templates/rectangleBounce.html', '<style>\n' + '/*** Rectangle Bounce ***/\n' + ' .spinner {\n' + '  margin: 100px auto;\n' + '  width: 50px;\n' + '  height: 30px;\n' + '  text-align: center;\n' + '  font-size: 10px;\n' + '}\n' + '.spinner > div {\n' + '  background-color: #333;\n' + '  height: 100%;\n' + '  width: 6px;\n' + '  display: inline-block;\n' + '  -webkit-animation: stretchdelay 1.2s infinite ease-in-out;\n' + '  animation: stretchdelay 1.2s infinite ease-in-out;\n' + '}\n' + '.spinner .rect2 {\n' + '  -webkit-animation-delay: -1.1s;\n' + '  animation-delay: -1.1s;\n' + '}\n' + '.spinner .rect3 {\n' + '  -webkit-animation-delay: -1.0s;\n' + '  animation-delay: -1.0s;\n' + '}\n' + '.spinner .rect4 {\n' + '  -webkit-animation-delay: -0.9s;\n' + '  animation-delay: -0.9s;\n' + '}\n' + '.spinner .rect5 {\n' + '  -webkit-animation-delay: -0.8s;\n' + '  animation-delay: -0.8s;\n' + '}\n' + '@-webkit-keyframes stretchdelay {\n' + '  0%, 40%, 100% {\n' + '    -webkit-transform: scaleY(0.4)\n' + '  }\n' + '  20% {\n' + '    -webkit-transform: scaleY(1.0)\n' + '  }\n' + '}\n' + '@keyframes stretchdelay {\n' + '  0%, 40%, 100% {\n' + '    transform: scaleY(0.4);\n' + '    -webkit-transform: scaleY(0.4);\n' + '  }\n' + '  20% {\n' + '    transform: scaleY(1.0);\n' + '    -webkit-transform: scaleY(1.0);\n' + '  }\n' + '}\n' + '</style>\n' + '<div class="spinner-background">\n' + '</div>\n' + '<div class="spinner-container">\n' + '  <div class="spinner">\n' + '    <div class="rect1"></div>\n' + '    <div class="rect2"></div>\n' + '    <div class="rect3"></div>\n' + '    <div class="rect4"></div>\n' + '    <div class="rect5"></div>\n' + '  </div>\n' + '</div>\n' + '');
  }
]);
angular.module('src/templates/rotatePlane.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('src/templates/rotatePlane.html', '<style>\n' + '/*** Rotating-plane ***/\n' + ' .spinner {\n' + '  width: 30px;\n' + '  height: 30px;\n' + '  background-color: #333;\n' + '  margin: 100px auto;\n' + '  -webkit-animation: rotateplane 1.2s infinite ease-in-out;\n' + '  animation: rotateplane 1.2s infinite ease-in-out;\n' + '}\n' + '@-webkit-keyframes rotateplane {\n' + '  0% {\n' + '    -webkit-transform: perspective(120px)\n' + '  }\n' + '  50% {\n' + '    -webkit-transform: perspective(120px) rotateY(180deg)\n' + '  }\n' + '  100% {\n' + '    -webkit-transform: perspective(120px) rotateY(180deg) rotateX(180deg)\n' + '  }\n' + '}\n' + '@keyframes rotateplane {\n' + '  0% {\n' + '    transform: perspective(120px) rotateX(0deg) rotateY(0deg);\n' + '    -webkit-transform: perspective(120px) rotateX(0deg) rotateY(0deg)\n' + '  }\n' + '  50% {\n' + '    transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg);\n' + '    -webkit-transform: perspective(120px) rotateX(-180.1deg) rotateY(0deg)\n' + '  }\n' + '  100% {\n' + '    transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n' + '    -webkit-transform: perspective(120px) rotateX(-180deg) rotateY(-179.9deg);\n' + '  }\n' + '}\n' + '</style>\n' + '<div class="spinner-background">\n' + '</div>\n' + '<div class="spinner-container">\n' + '  <div class="spinner"></div>\n' + '</div>\n' + '');
  }
]);
angular.module('src/templates/threeBounce.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('src/templates/threeBounce.html', '<style>\n' + '/***** Three-bounce ***/\n' + ' .three-bounce {\n' + '  text-align: center;\n' + '  font-size: 26px;\n' + '  position: relative;\n' + '  top: -26px;\n' + '  width: 80px;\n' + '  margin-right: 30px;\n' + '}\n' + '.three-bounce > div {\n' + '  display: inline-block;\n' + '  width: 18px;\n' + '  height: 18px;\n' + '  border-radius: 100%;\n' + '  background-color: #fff;\n' + '  -webkit-animation: bouncedelay 1.4s infinite ease-in-out;\n' + '  animation: bouncedelay 1.4s infinite ease-in-out;\n' + '  /* Prevent first frame from flickering when animation starts */\n' + '  -webkit-animation-fill-mode: both;\n' + '  animation-fill-mode: both;\n' + '}\n' + '.three-bounce .bounce1 {\n' + '  -webkit-animation-delay: -0.32s;\n' + '  animation-delay: -0.32s;\n' + '}\n' + '.three-bounce .bounce2 {\n' + '  -webkit-animation-delay: -0.16s;\n' + '  animation-delay: -0.16s;\n' + '}\n' + '@-webkit-keyframes bouncedelay {\n' + '  0%, 80%, 100% {\n' + '    -webkit-transform: scale(0.0)\n' + '  }\n' + '  40% {\n' + '    -webkit-transform: scale(1.0)\n' + '  }\n' + '}\n' + '@keyframes bouncedelay {\n' + '  0%, 80%, 100% {\n' + '    transform: scale(0.0);\n' + '    -webkit-transform: scale(0.0);\n' + '  }\n' + '  40% {\n' + '    transform: scale(1.0);\n' + '    -webkit-transform: scale(1.0);\n' + '  }\n' + '}\n' + '</style>\n' + '<div class="spinner-background">\n' + '</div>\n' + '<div class="spinner-container">\n' + '  <div class="spinner three-bounce">\n' + '    <div class="bounce1"></div>\n' + '    <div class="bounce2"></div>\n' + '    <div class="bounce3"></div>\n' + '  </div>\n' + '</div>\n' + '');
  }
]);
angular.module('src/templates/wanderingCubes.html', []).run([
  '$templateCache',
  function ($templateCache) {
    $templateCache.put('src/templates/wanderingCubes.html', '<style>\n' + '/*** Wandering Cubes ***/\n' + '.spinner {\n' + '  margin: 100px auto;\n' + '  width: 32px;\n' + '  height: 32px;\n' + '  position: relative;\n' + '}\n' + '.cube1, .cube2 {\n' + '  background-color: #333;\n' + '  width: 10px;\n' + '  height: 10px;\n' + '  position: absolute;\n' + '  top: 0;\n' + '  left: 0;\n' + '  -webkit-animation: cubemove 1.8s infinite ease-in-out;\n' + '  animation: cubemove 1.8s infinite ease-in-out;\n' + '}\n' + '.cube2 {\n' + '  -webkit-animation-delay: -0.9s;\n' + '  animation-delay: -0.9s;\n' + '}\n' + '@-webkit-keyframes cubemove {\n' + '  25% {\n' + '    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5)\n' + '  }\n' + '  50% {\n' + '    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg)\n' + '  }\n' + '  75% {\n' + '    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5)\n' + '  }\n' + '  100% {\n' + '    -webkit-transform: rotate(-360deg)\n' + '  }\n' + '}\n' + '@keyframes cubemove {\n' + '  25% {\n' + '    transform: translateX(42px) rotate(-90deg) scale(0.5);\n' + '    -webkit-transform: translateX(42px) rotate(-90deg) scale(0.5);\n' + '  }\n' + '  50% {\n' + '    transform: translateX(42px) translateY(42px) rotate(-179deg);\n' + '    -webkit-transform: translateX(42px) translateY(42px) rotate(-179deg);\n' + '  }\n' + '  50.1% {\n' + '    transform: translateX(42px) translateY(42px) rotate(-180deg);\n' + '    -webkit-transform: translateX(42px) translateY(42px) rotate(-180deg);\n' + '  }\n' + '  75% {\n' + '    transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);\n' + '    -webkit-transform: translateX(0px) translateY(42px) rotate(-270deg) scale(0.5);\n' + '  }\n' + '  100% {\n' + '    transform: rotate(-360deg);\n' + '    -webkit-transform: rotate(-360deg);\n' + '  }\n' + '}\n' + '</style>\n' + '<div class="spinner-background">\n' + '</div>\n' + '<div class="spinner-container">\n' + '  <div class="spinner">\n' + '    <div class="cube1"></div>\n' + '    <div class="cube2"></div>\n' + '  </div>\n' + '</div>\n' + '');
  }
]);