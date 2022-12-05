import * as Media from './_media';
import * as Form from './form/form';
import * as DeleteModal from './_deleteModal';
import * as Alerts from './_alerts';

export function init()
{
    Media.init();
    Form.init();
    DeleteModal.init();
    Alerts.init();
}