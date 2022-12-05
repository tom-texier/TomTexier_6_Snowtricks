/**
 * Scroll to an element or a position in the current page
 * @param {Number, HTMLElement} to
 */
export function scrollTo(to)
{
    let top;

    if($.type(to) === 'number') {
        top = to;
    }
    else {
        top = $(to).offset().top - 90;
    }

    $(window).scrollTop(top);
}