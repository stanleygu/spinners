# Angular Spinners

## [Live Demo](http://stanleygu.com/spinners/)

##Usage

Add the spinners module to your app:

```javascript
angular.module('myApp', ['stanleygu.spinners']);
```

Invoke the directives with the desired attributes
```html
<spinner template="{{type}}" color="{{color}}" screen-color="{{screenColor}}" screen-opacity="{{screenOpacity}}" 
loading="{{loading}}" z-index="200"></spinner>
```

`template` is a string containing one of 7 different spinner types:

```javascript
[
  'chasingDots',
  'doubleBounce',
  'pulse',
  'rectangleBounce',
  'rotatePlane',
  'threeBounce',
  'wanderingCubes'
];
```

`loading` is a boolean that turns on and off the spinner.

`color` and `screen-color` are CSS color names for the spinner color and background screen color, respectively.

`opacity` is a number from 0-1 for the screen opacity.

`z-index` is the z-index of the spinner.
