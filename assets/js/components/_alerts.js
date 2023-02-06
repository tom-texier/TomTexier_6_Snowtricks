import {scrollTo} from "../utils/scrollTo";

export function init()
{
    if($('.alert').length) {
        scrollTo($('.alert').first());
    }
    else if($('.form-error').length) {
        scrollTo($('.form-error').first());
    }
}