window.aloft = window.aloft || {};
aloft.toggleFBComments = function () {
  if (!aloft.commentStyle) {
    var css = '.UFIComment {display: none;}', head = document.head || document.getElementsByTagName('head')[0], style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet) {
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);
    aloft.commentStyle = style;
  } else {
    aloft.commentStyle.remove();
    aloft.commentStyle = null;
  }
};
aloft.toggleFBComments();