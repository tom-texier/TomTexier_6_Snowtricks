import * as Tricks from './_tricks';
import * as Comments from './_comments';
import * as ModalAjax from './_modal-ajax';

export function init()
{
    Tricks.init();
    Comments.init();
    ModalAjax.init();
}

export function callAjax(action, params, done, fail, always)
{
    if(!params) {
        params = {};
    }

    $.post(action, params)
        .done(done)
        .fail(fail)
        .always(always)
}