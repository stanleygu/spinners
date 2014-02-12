'use strict';

angular.module('myApp', ['stanleygu.spinners']);

angular.module('myApp')
  .controller('DemoCtrl', function($scope) {
    $scope.type = 'pulse';
    $scope.types = ['chasingDots', 'doubleBounce', 'pulse', 'rectangleBounce', 'rotatePlane', 'threeBounce', 'wanderingCubes'];

    $scope.loading = true;

    $scope.colors = ['white', 'black', 'red', 'orange', 'yellow', 'green', 'blue', 'violet'];
    $scope.screenColor = 'black';
    $scope.color = 'green';

    $scope.opacity = '30';

  });