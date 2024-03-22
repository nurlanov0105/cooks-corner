export const resizeTextarea = (el: any) => {
   setTimeout(function () {
      el.style.cssText = 'height:auto; padding:0';
      el.style.cssText = 'height:' + el.scrollHeight + 'px';
   }, 1);
};
