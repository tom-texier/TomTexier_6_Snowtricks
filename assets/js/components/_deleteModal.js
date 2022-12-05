import {CustomModal} from "../utils/modal";

const initializedClass = 'initialized';

export function init()
{
    $('a[data-trigger="custom-modal"][data-action="delete"]:not(' + initializedClass + ')').on('click', function(e) {
        e.preventDefault();

        let title = $(this).attr('data-modal-title');
        let content = $(this).attr('data-modal-content');

        let Modal = new CustomModal(title, content);
        Modal
            .addAction("Supprimer", $(this).attr('href'), 'btn')
            .open();
    })
}

export function reInit()
{
    init();
}