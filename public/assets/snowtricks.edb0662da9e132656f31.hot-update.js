"use strict";
self["webpackHotUpdatecwa_addons"]("snowtricks",{

/***/ "./assets/js/ajax/_tricks.js":
/*!***********************************!*\
  !*** ./assets/js/ajax/_tricks.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": function() { return /* binding */ init; }
/* harmony export */ });
/* harmony import */ var _utils_loader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/loader */ "./assets/js/utils/loader.js");

function init() {
  $('#get-more-tricks').on('click', function (e) {
    e.preventDefault();
    $(this).hide();
    let loader = _utils_loader__WEBPACK_IMPORTED_MODULE_0__.getLoader();
    _utils_loader__WEBPACK_IMPORTED_MODULE_0__.activate(loader);
    $(this).parent().append(loader);
    let more_btn = $(this);
    $.get($(this).attr('href'), {
      page: $(this).attr('data-next-page')
    }).done(function (data) {
      let html = $(data.view).hide();
      $('#all-tricks .tricks').append(html.fadeIn());
      let found_items = data.found_items;
      let max_per_page = data.max_per_page;
      let next_page = data.next_page;

      if (found_items > max_per_page * next_page) {
        console.log(next_page);
        more_btn.attr('data-next-page', next_page).show();
      } else {
        more_btn.remove();
      }
    }).fail(function (error) {
      console.log(error);
      more_btn.show();
    }).always(function () {
      _utils_loader__WEBPACK_IMPORTED_MODULE_0__.deactivate(loader, true);
    });
  });
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "3519d649558ffa9fa3c5"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25vd3RyaWNrcy5lZGIwNjYyZGE5ZTEzMjY1NmYzMS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFTyxTQUFTQyxJQUFULEdBQ1A7RUFDSUMsQ0FBQyxDQUFDLGtCQUFELENBQUQsQ0FBc0JDLEVBQXRCLENBQXlCLE9BQXpCLEVBQWtDLFVBQVNDLENBQVQsRUFBWTtJQUMxQ0EsQ0FBQyxDQUFDQyxjQUFGO0lBRUFILENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUUksSUFBUjtJQUVBLElBQUlDLE1BQU0sR0FBR1Asb0RBQUEsRUFBYjtJQUNBQSxtREFBQSxDQUFnQk8sTUFBaEI7SUFDQUwsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRUSxNQUFSLEdBQWlCQyxNQUFqQixDQUF3QkosTUFBeEI7SUFFQSxJQUFJSyxRQUFRLEdBQUdWLENBQUMsQ0FBQyxJQUFELENBQWhCO0lBRUFBLENBQUMsQ0FBQ1csR0FBRixDQUFNWCxDQUFDLENBQUMsSUFBRCxDQUFELENBQVFZLElBQVIsQ0FBYSxNQUFiLENBQU4sRUFBNEI7TUFBRUMsSUFBSSxFQUFFYixDQUFDLENBQUMsSUFBRCxDQUFELENBQVFZLElBQVIsQ0FBYSxnQkFBYjtJQUFSLENBQTVCLEVBQ0tFLElBREwsQ0FDVSxVQUFTQyxJQUFULEVBQWU7TUFDakIsSUFBSUMsSUFBSSxHQUFHaEIsQ0FBQyxDQUFDZSxJQUFJLENBQUNFLElBQU4sQ0FBRCxDQUFhYixJQUFiLEVBQVg7TUFDQUosQ0FBQyxDQUFDLHFCQUFELENBQUQsQ0FBeUJTLE1BQXpCLENBQWdDTyxJQUFJLENBQUNFLE1BQUwsRUFBaEM7TUFFQSxJQUFJQyxXQUFXLEdBQUdKLElBQUksQ0FBQ0ksV0FBdkI7TUFDQSxJQUFJQyxZQUFZLEdBQUdMLElBQUksQ0FBQ0ssWUFBeEI7TUFDQSxJQUFJQyxTQUFTLEdBQUdOLElBQUksQ0FBQ00sU0FBckI7O01BRUEsSUFBR0YsV0FBVyxHQUFHQyxZQUFZLEdBQUdDLFNBQWhDLEVBQTJDO1FBQ3ZDQyxPQUFPLENBQUNDLEdBQVIsQ0FBWUYsU0FBWjtRQUNBWCxRQUFRLENBQUNFLElBQVQsQ0FBYyxnQkFBZCxFQUFnQ1MsU0FBaEMsRUFBMkNHLElBQTNDO01BQ0gsQ0FIRCxNQUlLO1FBQ0RkLFFBQVEsQ0FBQ2UsTUFBVDtNQUNIO0lBQ0osQ0FoQkwsRUFpQktDLElBakJMLENBaUJVLFVBQVNDLEtBQVQsRUFBZ0I7TUFDbEJMLE9BQU8sQ0FBQ0MsR0FBUixDQUFZSSxLQUFaO01BQ0FqQixRQUFRLENBQUNjLElBQVQ7SUFDSCxDQXBCTCxFQXFCS0ksTUFyQkwsQ0FxQlksWUFBVztNQUNmOUIscURBQUEsQ0FBa0JPLE1BQWxCLEVBQTBCLElBQTFCO0lBQ0gsQ0F2Qkw7RUF3QkgsQ0FuQ0Q7QUFvQ0g7Ozs7Ozs7O1VDeENELHFDQUFxQyIsInNvdXJjZXMiOlsid2VicGFjazovL2N3YS1hZGRvbnMvLi9hc3NldHMvanMvYWpheC9fdHJpY2tzLmpzIiwid2VicGFjazovL2N3YS1hZGRvbnMvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIExvYWRlciBmcm9tIFwiLi4vdXRpbHMvbG9hZGVyXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KClcbntcbiAgICAkKCcjZ2V0LW1vcmUtdHJpY2tzJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgJCh0aGlzKS5oaWRlKCk7XG5cbiAgICAgICAgbGV0IGxvYWRlciA9IExvYWRlci5nZXRMb2FkZXIoKTtcbiAgICAgICAgTG9hZGVyLmFjdGl2YXRlKGxvYWRlcik7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuYXBwZW5kKGxvYWRlcik7XG5cbiAgICAgICAgbGV0IG1vcmVfYnRuID0gJCh0aGlzKTtcblxuICAgICAgICAkLmdldCgkKHRoaXMpLmF0dHIoJ2hyZWYnKSwgeyBwYWdlOiAkKHRoaXMpLmF0dHIoJ2RhdGEtbmV4dC1wYWdlJykgfSlcbiAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICBsZXQgaHRtbCA9ICQoZGF0YS52aWV3KS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgJCgnI2FsbC10cmlja3MgLnRyaWNrcycpLmFwcGVuZChodG1sLmZhZGVJbigpKTtcblxuICAgICAgICAgICAgICAgIGxldCBmb3VuZF9pdGVtcyA9IGRhdGEuZm91bmRfaXRlbXM7XG4gICAgICAgICAgICAgICAgbGV0IG1heF9wZXJfcGFnZSA9IGRhdGEubWF4X3Blcl9wYWdlO1xuICAgICAgICAgICAgICAgIGxldCBuZXh0X3BhZ2UgPSBkYXRhLm5leHRfcGFnZTtcblxuICAgICAgICAgICAgICAgIGlmKGZvdW5kX2l0ZW1zID4gbWF4X3Blcl9wYWdlICogbmV4dF9wYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKG5leHRfcGFnZSk7XG4gICAgICAgICAgICAgICAgICAgIG1vcmVfYnRuLmF0dHIoJ2RhdGEtbmV4dC1wYWdlJywgbmV4dF9wYWdlKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtb3JlX2J0bi5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gICAgICAgICAgICAgICAgbW9yZV9idG4uc2hvdygpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5hbHdheXMoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgTG9hZGVyLmRlYWN0aXZhdGUobG9hZGVyLCB0cnVlKTtcbiAgICAgICAgICAgIH0pXG4gICAgfSlcbn0iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIFwiMzUxOWQ2NDk1NThmZmE5ZmEzYzVcIjsgfSJdLCJuYW1lcyI6WyJMb2FkZXIiLCJpbml0IiwiJCIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwiaGlkZSIsImxvYWRlciIsImdldExvYWRlciIsImFjdGl2YXRlIiwicGFyZW50IiwiYXBwZW5kIiwibW9yZV9idG4iLCJnZXQiLCJhdHRyIiwicGFnZSIsImRvbmUiLCJkYXRhIiwiaHRtbCIsInZpZXciLCJmYWRlSW4iLCJmb3VuZF9pdGVtcyIsIm1heF9wZXJfcGFnZSIsIm5leHRfcGFnZSIsImNvbnNvbGUiLCJsb2ciLCJzaG93IiwicmVtb3ZlIiwiZmFpbCIsImVycm9yIiwiYWx3YXlzIiwiZGVhY3RpdmF0ZSJdLCJzb3VyY2VSb290IjoiIn0=