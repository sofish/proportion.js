/*! Licensed under MIT, https://github.com/sofish/proportion.js */

var proportion = (function() {

  // ** get window size
  var size = function() {
    return {
      height: Math.max(window.innerHeight || 0, document.documentElement.clientHeight),
      width: Math.max(window.innerWidth || 0, document.documentElement.clientWidth)
    }
  };

  // ** Params
  // @el: {Element} the element
  // @isLanscape: {Boolean} [OPTION] by default is portrait
  // @radio: the proportion of theShortSide/theLongSide，by default is 0.61
  // @maxWidth: the max-width, by default is 640
  // @maxHeight: the max-height, by default is 1008
  return function(el, isLanscape, radio, maxWidth, maxHeight) {
    if(!el || el.nodeType !== 1) throw new Error('Please specific an element!');

    if(!el.styleSetted) {
      el.style.position = 'absolute';
      el.style.left = '50%';
      el.style.top = '50%';
      el.style.top = '50%';
      el.style.maxHeight = '100%';
      el.style.maxWidth = '100%';
      el.styleSetted = 1;
    }

    var screen = size();
    var width = 'width';
    var height = 'height';
    var marginLeft = 'marginLeft';
    var marginTop = 'marginTop';

    radio = radio || 0.618; // looks great on Wechat
    maxWidth = Math.min(screen.width, maxWidth || 640);
    maxHeight = Math.min(screen.height, maxHeight || 1008);
    isLanscape = isLanscape || 0;

    if(isLanscape) {
      maxWidth = [maxHeight, maxHeight = maxWidth][0];
      width = [height, height = width][0];
      marginLeft = [marginTop, marginTop = marginLeft][0];
    }

    r = (maxHeight / maxWidth).toFixed(3);
    r = radio >= radio ? radio : r;

    el.style[width]= maxHeight * r + 'px';
    el.style[height] =  maxHeight + 'px';
    el.style[marginLeft] = - Math.min(maxWidth, maxHeight * r)/2 + 'px'; // 注意宽高变化
    el.style[marginTop] = -(maxHeight / 2) + 'px';
  };

}());