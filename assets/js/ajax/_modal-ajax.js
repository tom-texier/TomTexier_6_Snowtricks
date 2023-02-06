import {CustomModal} from "../utils/modal";
import * as Loader from "../utils/loader";

const initializedClass = 'initialized';

export function init()
{
    $('a[data-open="modal-ajax"]:not(' + initializedClass + ')').on('click', function(e) {
        e.preventDefault();

        let title = $(this).data('modal-title') ?? $(this).text();
        let target = $(this).data('target');
        let resultTarget = $(this).parent().parent();

        let loader = Loader.getLoader();
        Loader.activate(loader);

        let Modal = new CustomModal(title, loader);

        Modal.getObject.on(`custom-modal/${Modal.id}/open/after`, function() {
            $.post(target)
                .done(function(data) {
                    Modal.content = data.view;
                    initForm(Modal, data.view, resultTarget);
                })
                .fail(function(error) {
                    Modal.content = "Une erreur est survenue : <br>" + error.responseText;
                })
        });

        Modal
            .removeAllActions()
            .open();
    })
}

/**
 *
 * @param {CustomModal} Modal
 * @param view
 * @param resultTarget
 */
function initForm(Modal, view, resultTarget = null)
{
    Modal.initFormRequest(
        $(view).attr('action'),
        (result) => {
            if(result.data.group !== undefined) {
                $(resultTarget).find('#trick_trickGroup').append(`<option value="${result.data.group.id}" selected="selected">${result.data.group.name}</option>`);
                Modal.close();
            }
            else {
                Modal.content = "Une erreur est survenue";
            }
        },
        (error) => {
            if(error.responseJSON.view) {
                Modal.content = error.responseJSON.view;
            }
            else {
                Modal.content = "Une erreur est survenue : <br>" + error.responseText;
            }
        },
        () => {
            initForm(Modal, view);
        }
    );
}