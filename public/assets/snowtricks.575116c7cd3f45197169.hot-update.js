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
    initForm(Modal, view); // Loader.deactivate($('.loader'))
  });
}

/***/ })

},
/******/ function(__webpack_require__) { // webpackRuntimeModules
/******/ /* webpack/runtime/getFullHash */
/******/ !function() {
/******/ 	__webpack_require__.h = function() { return "b1fa7ed96d46a0b75bf3"; }
/******/ }();
/******/ 
/******/ }
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic25vd3RyaWNrcy41NzUxMTZjN2NkM2Y0NTE5NzE2OS5ob3QtdXBkYXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFFQSxNQUFNRSxnQkFBZ0IsR0FBRyxhQUF6QjtBQUVPLFNBQVNDLElBQVQsR0FDUDtFQUNJQyxDQUFDLENBQUMsbUNBQW1DRixnQkFBbkMsR0FBc0QsR0FBdkQsQ0FBRCxDQUE2REcsRUFBN0QsQ0FBZ0UsT0FBaEUsRUFBeUUsVUFBU0MsQ0FBVCxFQUFZO0lBQ2pGQSxDQUFDLENBQUNDLGNBQUY7SUFFQSxJQUFJQyxLQUFLLEdBQUdKLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUUssSUFBUixDQUFhLGFBQWIsS0FBK0JMLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUU0sSUFBUixFQUEzQztJQUNBLElBQUlDLE1BQU0sR0FBR1AsQ0FBQyxDQUFDLElBQUQsQ0FBRCxDQUFRSyxJQUFSLENBQWEsUUFBYixDQUFiO0lBQ0EsSUFBSUcsWUFBWSxHQUFHUixDQUFDLENBQUMsSUFBRCxDQUFELENBQVFTLE1BQVIsR0FBaUJBLE1BQWpCLEVBQW5CO0lBRUEsSUFBSUMsTUFBTSxHQUFHYixvREFBQSxFQUFiO0lBQ0FBLG1EQUFBLENBQWdCYSxNQUFoQjtJQUVBLElBQUlHLEtBQUssR0FBRyxJQUFJakIscURBQUosQ0FBZ0JRLEtBQWhCLEVBQXVCTSxNQUF2QixDQUFaO0lBRUFHLEtBQUssQ0FBQ0MsU0FBTixDQUFnQmIsRUFBaEIsQ0FBb0IsZ0JBQWVZLEtBQUssQ0FBQ0UsRUFBRyxhQUE1QyxFQUEwRCxZQUFXO01BQ2pFZixDQUFDLENBQUNnQixJQUFGLENBQU9ULE1BQVAsRUFDS1UsSUFETCxDQUNVLFVBQVNaLElBQVQsRUFBZTtRQUNqQlEsS0FBSyxDQUFDSyxPQUFOLEdBQWdCYixJQUFJLENBQUNjLElBQXJCO1FBQ0FDLFFBQVEsQ0FBQ1AsS0FBRCxFQUFRUixJQUFJLENBQUNjLElBQWIsRUFBbUJYLFlBQW5CLENBQVI7TUFDSCxDQUpMLEVBS0thLElBTEwsQ0FLVSxVQUFTQyxLQUFULEVBQWdCO1FBQ2xCVCxLQUFLLENBQUNLLE9BQU4sR0FBZ0IsbUNBQW1DSSxLQUFLLENBQUNDLFlBQXpEO01BQ0gsQ0FQTDtJQVFILENBVEQ7SUFXQVYsS0FBSyxDQUNBVyxnQkFETCxHQUVLQyxJQUZMO0VBR0gsQ0ExQkQ7QUEyQkg7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsU0FBU0wsUUFBVCxDQUFrQlAsS0FBbEIsRUFBeUJNLElBQXpCLEVBQStCWCxZQUFZLEdBQUcsSUFBOUMsRUFDQTtFQUNJSyxLQUFLLENBQUNhLGVBQU4sQ0FDSTFCLENBQUMsQ0FBQ21CLElBQUQsQ0FBRCxDQUFRUSxJQUFSLENBQWEsUUFBYixDQURKLEVBRUtDLE1BQUQsSUFBWTtJQUNSLElBQUdBLE1BQU0sQ0FBQ3ZCLElBQVAsQ0FBWXdCLEtBQVosS0FBc0JDLFNBQXpCLEVBQW9DO01BQ2hDOUIsQ0FBQyxDQUFDUSxZQUFELENBQUQsQ0FBZ0J1QixJQUFoQixDQUFxQixtQkFBckIsRUFBMENDLE1BQTFDLENBQWtELGtCQUFpQkosTUFBTSxDQUFDdkIsSUFBUCxDQUFZd0IsS0FBWixDQUFrQmQsRUFBRyx5QkFBd0JhLE1BQU0sQ0FBQ3ZCLElBQVAsQ0FBWXdCLEtBQVosQ0FBa0JJLElBQUssV0FBdkk7TUFDQXBCLEtBQUssQ0FBQ3FCLEtBQU47SUFDSCxDQUhELE1BSUs7TUFDRHJCLEtBQUssQ0FBQ0ssT0FBTixHQUFnQix5QkFBaEI7SUFDSDtFQUNKLENBVkwsRUFXS0ksS0FBRCxJQUFXO0lBQ1AsSUFBR0EsS0FBSyxDQUFDYSxZQUFOLENBQW1CaEIsSUFBdEIsRUFBNEI7TUFDeEJOLEtBQUssQ0FBQ0ssT0FBTixHQUFnQkksS0FBSyxDQUFDYSxZQUFOLENBQW1CaEIsSUFBbkM7SUFDSCxDQUZELE1BR0s7TUFDRE4sS0FBSyxDQUFDSyxPQUFOLEdBQWdCLG1DQUFtQ0ksS0FBSyxDQUFDQyxZQUF6RDtJQUNIO0VBQ0osQ0FsQkwsRUFtQkksTUFBTTtJQUNGSCxRQUFRLENBQUNQLEtBQUQsRUFBUU0sSUFBUixDQUFSLENBREUsQ0FFRjtFQUNILENBdEJMO0FBd0JIOzs7Ozs7OztVQ3BFRCxxQ0FBcUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9jd2EtYWRkb25zLy4vYXNzZXRzL2pzL2FqYXgvX21vZGFsLWFqYXguanMiLCJ3ZWJwYWNrOi8vY3dhLWFkZG9ucy93ZWJwYWNrL3J1bnRpbWUvZ2V0RnVsbEhhc2giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDdXN0b21Nb2RhbH0gZnJvbSBcIi4uL3V0aWxzL21vZGFsXCI7XG5pbXBvcnQgKiBhcyBMb2FkZXIgZnJvbSBcIi4uL3V0aWxzL2xvYWRlclwiO1xuXG5jb25zdCBpbml0aWFsaXplZENsYXNzID0gJ2luaXRpYWxpemVkJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXQoKVxue1xuICAgICQoJ2FbZGF0YS1vcGVuPVwibW9kYWwtYWpheFwiXTpub3QoJyArIGluaXRpYWxpemVkQ2xhc3MgKyAnKScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIGxldCB0aXRsZSA9ICQodGhpcykuZGF0YSgnbW9kYWwtdGl0bGUnKSA/PyAkKHRoaXMpLnRleHQoKTtcbiAgICAgICAgbGV0IHRhcmdldCA9ICQodGhpcykuZGF0YSgndGFyZ2V0Jyk7XG4gICAgICAgIGxldCByZXN1bHRUYXJnZXQgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpO1xuXG4gICAgICAgIGxldCBsb2FkZXIgPSBMb2FkZXIuZ2V0TG9hZGVyKCk7XG4gICAgICAgIExvYWRlci5hY3RpdmF0ZShsb2FkZXIpO1xuXG4gICAgICAgIGxldCBNb2RhbCA9IG5ldyBDdXN0b21Nb2RhbCh0aXRsZSwgbG9hZGVyKTtcblxuICAgICAgICBNb2RhbC5nZXRPYmplY3Qub24oYGN1c3RvbS1tb2RhbC8ke01vZGFsLmlkfS9vcGVuL2FmdGVyYCwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkLnBvc3QodGFyZ2V0KVxuICAgICAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgTW9kYWwuY29udGVudCA9IGRhdGEudmlldztcbiAgICAgICAgICAgICAgICAgICAgaW5pdEZvcm0oTW9kYWwsIGRhdGEudmlldywgcmVzdWx0VGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIE1vZGFsLmNvbnRlbnQgPSBcIlVuZSBlcnJldXIgZXN0IHN1cnZlbnVlIDogPGJyPlwiICsgZXJyb3IucmVzcG9uc2VUZXh0O1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuXG4gICAgICAgIE1vZGFsXG4gICAgICAgICAgICAucmVtb3ZlQWxsQWN0aW9ucygpXG4gICAgICAgICAgICAub3BlbigpO1xuICAgIH0pXG59XG5cbi8qKlxuICpcbiAqIEBwYXJhbSB7Q3VzdG9tTW9kYWx9IE1vZGFsXG4gKiBAcGFyYW0gdmlld1xuICogQHBhcmFtIHJlc3VsdFRhcmdldFxuICovXG5mdW5jdGlvbiBpbml0Rm9ybShNb2RhbCwgdmlldywgcmVzdWx0VGFyZ2V0ID0gbnVsbClcbntcbiAgICBNb2RhbC5pbml0Rm9ybVJlcXVlc3QoXG4gICAgICAgICQodmlldykuYXR0cignYWN0aW9uJyksXG4gICAgICAgIChyZXN1bHQpID0+IHtcbiAgICAgICAgICAgIGlmKHJlc3VsdC5kYXRhLmdyb3VwICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAkKHJlc3VsdFRhcmdldCkuZmluZCgnI3RyaWNrX3RyaWNrR3JvdXAnKS5hcHBlbmQoYDxvcHRpb24gdmFsdWU9XCIke3Jlc3VsdC5kYXRhLmdyb3VwLmlkfVwiIHNlbGVjdGVkPVwic2VsZWN0ZWRcIj4ke3Jlc3VsdC5kYXRhLmdyb3VwLm5hbWV9PC9vcHRpb24+YCk7XG4gICAgICAgICAgICAgICAgTW9kYWwuY2xvc2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIE1vZGFsLmNvbnRlbnQgPSBcIlVuZSBlcnJldXIgZXN0IHN1cnZlbnVlXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIChlcnJvcikgPT4ge1xuICAgICAgICAgICAgaWYoZXJyb3IucmVzcG9uc2VKU09OLnZpZXcpIHtcbiAgICAgICAgICAgICAgICBNb2RhbC5jb250ZW50ID0gZXJyb3IucmVzcG9uc2VKU09OLnZpZXc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBNb2RhbC5jb250ZW50ID0gXCJVbmUgZXJyZXVyIGVzdCBzdXJ2ZW51ZSA6IDxicj5cIiArIGVycm9yLnJlc3BvbnNlVGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgaW5pdEZvcm0oTW9kYWwsIHZpZXcpO1xuICAgICAgICAgICAgLy8gTG9hZGVyLmRlYWN0aXZhdGUoJCgnLmxvYWRlcicpKVxuICAgICAgICB9XG4gICAgKTtcbn0iLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmggPSBmdW5jdGlvbigpIHsgcmV0dXJuIFwiYjFmYTdlZDk2ZDQ2YTBiNzViZjNcIjsgfSJdLCJuYW1lcyI6WyJDdXN0b21Nb2RhbCIsIkxvYWRlciIsImluaXRpYWxpemVkQ2xhc3MiLCJpbml0IiwiJCIsIm9uIiwiZSIsInByZXZlbnREZWZhdWx0IiwidGl0bGUiLCJkYXRhIiwidGV4dCIsInRhcmdldCIsInJlc3VsdFRhcmdldCIsInBhcmVudCIsImxvYWRlciIsImdldExvYWRlciIsImFjdGl2YXRlIiwiTW9kYWwiLCJnZXRPYmplY3QiLCJpZCIsInBvc3QiLCJkb25lIiwiY29udGVudCIsInZpZXciLCJpbml0Rm9ybSIsImZhaWwiLCJlcnJvciIsInJlc3BvbnNlVGV4dCIsInJlbW92ZUFsbEFjdGlvbnMiLCJvcGVuIiwiaW5pdEZvcm1SZXF1ZXN0IiwiYXR0ciIsInJlc3VsdCIsImdyb3VwIiwidW5kZWZpbmVkIiwiZmluZCIsImFwcGVuZCIsIm5hbWUiLCJjbG9zZSIsInJlc3BvbnNlSlNPTiJdLCJzb3VyY2VSb290IjoiIn0=