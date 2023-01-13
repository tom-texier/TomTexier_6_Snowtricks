"use strict";
self["webpackHotUpdatecwa_addons"]("snowtricks",{

/***/ "./assets/js/ajax/_modal-ajax.js":
/*!***************************************!*\
  !*** ./assets/js/ajax/_modal-ajax.js ***!
  \***************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": function() { return /* binding */ init; }
/* harmony export */ });
/* harmony import */ var _utils_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/modal */ "./assets/js/utils/modal.js");
/* harmony import */ var _utils_loader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/loader */ "./assets/js/utils/loader.js");


const initializedClass = 'initialized';
function init() {
  $('a[data-open="modal-ajax"]:not(' + initializedClass + ')').on('click', function (e) {
    e.preventDefault();
    let title = $(this).data('modal-title') ?? $(this).text();
    let target = $(this).data('target');
    let resultTarget = $(this).parent().parent();
    let loader = _utils_loader__WEBPACK_IMPORTED_MODULE_1__.getLoader();
    _utils_loader__WEBPACK_IMPORTED_MODULE_1__.activate(loader);
    let Modal = new _utils_modal__WEBPACK_IMPORTED_MODULE_0__.CustomModal(title, loader);
    Modal.getObject.on(`custom-modal/${Modal.id}/open/after`, function () {
      $.post(target).done(function (data) {
        Modal.content = data.view;
        initForm(Modal, data.view, resultTarget);
      }).fail(function (error) {
        Modal.content = "Une erreur est survenue : <br>" + error.responseText;
      });
    });
    Modal.removeAllActions().open();
  });
}
/**
 *
 * @param {CustomModal} Modal
 * @param view
 * @param resultTarget
 */

function initForm(Modal, view, resultTarget = null) {
  Modal.initFormRequest($(view).attr('action'), result => {
    if (result.data.group !== undefined) {
      $(resultTarget).find('#trick_trickGroup').append(`<option value="${result.data.group.id}" selected="selected">${result.data.group.name}</option>`);
      Modal.close();
    } else {
      Modal.content = "Une erreur est survenue";
    }
  }, error => {
    if (error.responseJSON.view) {
      Modal.content = error.responseJSON.view;
    } else {
      Modal.content = "Une erreur est survenue : <br>" + error.responseText;
    }
  }, () => {
    initForm(Modal, view);
  });
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "a712cfff30f79a83e35d"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25vd3RyaWNrcy5iMWZhN2VkOTZkNDZhMGI3NWJmMy5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFFQSxNQUFNRSxnQkFBZ0IsR0FBRyxhQUF6QjtBQUVPLFNBQVNDLElBQVQsR0FDUDtFQUNJQyxDQUFDLENBQUMsbUNBQW1DRixnQkFBbkMsR0FBc0QsR0FBdkQsQ0FBRCxDQUE2REcsRUFBN0QsQ0FBZ0UsT0FBaEUsRUFBeUUsVUFBU0MsQ0FBVCxFQUFZO0lBQ2pGQSxDQUFDLENBQUNDLGNBQUY7SUFFQSxJQUFJQyxLQUFLLEdBQUdKLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUUssSUFBUixDQUFhLGFBQWIsS0FBK0JMLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUU0sSUFBUixFQUEzQztJQUNBLElBQUlDLE1BQU0sR0FBR1AsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRSyxJQUFSLENBQWEsUUFBYixDQUFiO0lBQ0EsSUFBSUcsWUFBWSxHQUFHUixDQUFDLENBQUMsSUFBRCxDQUFELENBQVFTLE1BQVIsR0FBaUJBLE1BQWpCLEVBQW5CO0lBRUEsSUFBSUMsTUFBTSxHQUFHYixvREFBQSxFQUFiO0lBQ0FBLG1EQUFBLENBQWdCYSxNQUFoQjtJQUVBLElBQUlHLEtBQUssR0FBRyxJQUFJakIscURBQUosQ0FBZ0JRLEtBQWhCLEVBQXVCTSxNQUF2QixDQUFaO0lBRUFHLEtBQUssQ0FBQ0MsU0FBTixDQUFnQmIsRUFBaEIsQ0FBb0IsZ0JBQWVZLEtBQUssQ0FBQ0UsRUFBRyxhQUE1QyxFQUEwRCxZQUFXO01BQ2pFZixDQUFDLENBQUNnQixJQUFGLENBQU9ULE1BQVAsRUFDS1UsSUFETCxDQUNVLFVBQVNaLElBQVQsRUFBZTtRQUNqQlEsS0FBSyxDQUFDSyxPQUFOLEdBQWdCYixJQUFJLENBQUNjLElBQXJCO1FBQ0FDLFFBQVEsQ0FBQ1AsS0FBRCxFQUFRUixJQUFJLENBQUNjLElBQWIsRUFBbUJYLFlBQW5CLENBQVI7TUFDSCxDQUpMLEVBS0thLElBTEwsQ0FLVSxVQUFTQyxLQUFULEVBQWdCO1FBQ2xCVCxLQUFLLENBQUNLLE9BQU4sR0FBZ0IsbUNBQW1DSSxLQUFLLENBQUNDLFlBQXpEO01BQ0gsQ0FQTDtJQVFILENBVEQ7SUFXQVYsS0FBSyxDQUNBVyxnQkFETCxHQUVLQyxJQUZMO0VBR0gsQ0ExQkQ7QUEyQkg7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsU0FBU0wsUUFBVCxDQUFrQlAsS0FBbEIsRUFBeUJNLElBQXpCLEVBQStCWCxZQUFZLEdBQUcsSUFBOUMsRUFDQTtFQUNJSyxLQUFLLENBQUNhLGVBQU4sQ0FDSTFCLENBQUMsQ0FBQ21CLElBQUQsQ0FBRCxDQUFRUSxJQUFSLENBQWEsUUFBYixDQURKLEVBRUtDLE1BQUQsSUFBWTtJQUNSLElBQUdBLE1BQU0sQ0FBQ3ZCLElBQVAsQ0FBWXdCLEtBQVosS0FBc0JDLFNBQXpCLEVBQW9DO01BQ2hDOUIsQ0FBQyxDQUFDUSxZQUFELENBQUQsQ0FBZ0J1QixJQUFoQixDQUFxQixtQkFBckIsRUFBMENDLE1BQTFDLENBQWtELGtCQUFpQkosTUFBTSxDQUFDdkIsSUFBUCxDQUFZd0IsS0FBWixDQUFrQmQsRUFBRyx5QkFBd0JhLE1BQU0sQ0FBQ3ZCLElBQVAsQ0FBWXdCLEtBQVosQ0FBa0JJLElBQUssV0FBdkk7TUFDQXBCLEtBQUssQ0FBQ3FCLEtBQU47SUFDSCxDQUhELE1BSUs7TUFDRHJCLEtBQUssQ0FBQ0ssT0FBTixHQUFnQix5QkFBaEI7SUFDSDtFQUNKLENBVkwsRUFXS0ksS0FBRCxJQUFXO0lBQ1AsSUFBR0EsS0FBSyxDQUFDYSxZQUFOLENBQW1CaEIsSUFBdEIsRUFBNEI7TUFDeEJOLEtBQUssQ0FBQ0ssT0FBTixHQUFnQkksS0FBSyxDQUFDYSxZQUFOLENBQW1CaEIsSUFBbkM7SUFDSCxDQUZELE1BR0s7TUFDRE4sS0FBSyxDQUFDSyxPQUFOLEdBQWdCLG1DQUFtQ0ksS0FBSyxDQUFDQyxZQUF6RDtJQUNIO0VBQ0osQ0FsQkwsRUFtQkksTUFBTTtJQUNGSCxRQUFRLENBQUNQLEtBQUQsRUFBUU0sSUFBUixDQUFSO0VBQ0gsQ0FyQkw7QUF1Qkg7Ozs7Ozs7O1VDbkVELHFDQUFxQyIsInNvdXJjZXMiOlsid2VicGFjazovL2N3YS1hZGRvbnMvLi9hc3NldHMvanMvYWpheC9fbW9kYWwtYWpheC5qcyIsIndlYnBhY2s6Ly9jd2EtYWRkb25zL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0N1c3RvbU1vZGFsfSBmcm9tIFwiLi4vdXRpbHMvbW9kYWxcIjtcbmltcG9ydCAqIGFzIExvYWRlciBmcm9tIFwiLi4vdXRpbHMvbG9hZGVyXCI7XG5cbmNvbnN0IGluaXRpYWxpemVkQ2xhc3MgPSAnaW5pdGlhbGl6ZWQnO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdCgpXG57XG4gICAgJCgnYVtkYXRhLW9wZW49XCJtb2RhbC1hamF4XCJdOm5vdCgnICsgaW5pdGlhbGl6ZWRDbGFzcyArICcpJykub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgbGV0IHRpdGxlID0gJCh0aGlzKS5kYXRhKCdtb2RhbC10aXRsZScpID8/ICQodGhpcykudGV4dCgpO1xuICAgICAgICBsZXQgdGFyZ2V0ID0gJCh0aGlzKS5kYXRhKCd0YXJnZXQnKTtcbiAgICAgICAgbGV0IHJlc3VsdFRhcmdldCA9ICQodGhpcykucGFyZW50KCkucGFyZW50KCk7XG5cbiAgICAgICAgbGV0IGxvYWRlciA9IExvYWRlci5nZXRMb2FkZXIoKTtcbiAgICAgICAgTG9hZGVyLmFjdGl2YXRlKGxvYWRlcik7XG5cbiAgICAgICAgbGV0IE1vZGFsID0gbmV3IEN1c3RvbU1vZGFsKHRpdGxlLCBsb2FkZXIpO1xuXG4gICAgICAgIE1vZGFsLmdldE9iamVjdC5vbihgY3VzdG9tLW1vZGFsLyR7TW9kYWwuaWR9L29wZW4vYWZ0ZXJgLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQucG9zdCh0YXJnZXQpXG4gICAgICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBNb2RhbC5jb250ZW50ID0gZGF0YS52aWV3O1xuICAgICAgICAgICAgICAgICAgICBpbml0Rm9ybShNb2RhbCwgZGF0YS52aWV3LCByZXN1bHRUYXJnZXQpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgTW9kYWwuY29udGVudCA9IFwiVW5lIGVycmV1ciBlc3Qgc3VydmVudWUgOiA8YnI+XCIgKyBlcnJvci5yZXNwb25zZVRleHQ7XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgfSk7XG5cbiAgICAgICAgTW9kYWxcbiAgICAgICAgICAgIC5yZW1vdmVBbGxBY3Rpb25zKClcbiAgICAgICAgICAgIC5vcGVuKCk7XG4gICAgfSlcbn1cblxuLyoqXG4gKlxuICogQHBhcmFtIHtDdXN0b21Nb2RhbH0gTW9kYWxcbiAqIEBwYXJhbSB2aWV3XG4gKiBAcGFyYW0gcmVzdWx0VGFyZ2V0XG4gKi9cbmZ1bmN0aW9uIGluaXRGb3JtKE1vZGFsLCB2aWV3LCByZXN1bHRUYXJnZXQgPSBudWxsKVxue1xuICAgIE1vZGFsLmluaXRGb3JtUmVxdWVzdChcbiAgICAgICAgJCh2aWV3KS5hdHRyKCdhY3Rpb24nKSxcbiAgICAgICAgKHJlc3VsdCkgPT4ge1xuICAgICAgICAgICAgaWYocmVzdWx0LmRhdGEuZ3JvdXAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICQocmVzdWx0VGFyZ2V0KS5maW5kKCcjdHJpY2tfdHJpY2tHcm91cCcpLmFwcGVuZChgPG9wdGlvbiB2YWx1ZT1cIiR7cmVzdWx0LmRhdGEuZ3JvdXAuaWR9XCIgc2VsZWN0ZWQ9XCJzZWxlY3RlZFwiPiR7cmVzdWx0LmRhdGEuZ3JvdXAubmFtZX08L29wdGlvbj5gKTtcbiAgICAgICAgICAgICAgICBNb2RhbC5jbG9zZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgTW9kYWwuY29udGVudCA9IFwiVW5lIGVycmV1ciBlc3Qgc3VydmVudWVcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgKGVycm9yKSA9PiB7XG4gICAgICAgICAgICBpZihlcnJvci5yZXNwb25zZUpTT04udmlldykge1xuICAgICAgICAgICAgICAgIE1vZGFsLmNvbnRlbnQgPSBlcnJvci5yZXNwb25zZUpTT04udmlldztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIE1vZGFsLmNvbnRlbnQgPSBcIlVuZSBlcnJldXIgZXN0IHN1cnZlbnVlIDogPGJyPlwiICsgZXJyb3IucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICBpbml0Rm9ybShNb2RhbCwgdmlldyk7XG4gICAgICAgIH1cbiAgICApO1xufSIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gXCJhNzEyY2ZmZjMwZjc5YTgzZTM1ZFwiOyB9Il0sIm5hbWVzIjpbIkN1c3RvbU1vZGFsIiwiTG9hZGVyIiwiaW5pdGlhbGl6ZWRDbGFzcyIsImluaXQiLCIkIiwib24iLCJlIiwicHJldmVudERlZmF1bHQiLCJ0aXRsZSIsImRhdGEiLCJ0ZXh0IiwidGFyZ2V0IiwicmVzdWx0VGFyZ2V0IiwicGFyZW50IiwibG9hZGVyIiwiZ2V0TG9hZGVyIiwiYWN0aXZhdGUiLCJNb2RhbCIsImdldE9iamVjdCIsImlkIiwicG9zdCIsImRvbmUiLCJjb250ZW50IiwidmlldyIsImluaXRGb3JtIiwiZmFpbCIsImVycm9yIiwicmVzcG9uc2VUZXh0IiwicmVtb3ZlQWxsQWN0aW9ucyIsIm9wZW4iLCJpbml0Rm9ybVJlcXVlc3QiLCJhdHRyIiwicmVzdWx0IiwiZ3JvdXAiLCJ1bmRlZmluZWQiLCJmaW5kIiwiYXBwZW5kIiwibmFtZSIsImNsb3NlIiwicmVzcG9uc2VKU09OIl0sInNvdXJjZVJvb3QiOiIifQ==