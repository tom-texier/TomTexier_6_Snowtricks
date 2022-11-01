import * as Loader from "../utils/loader";

export function init()
{
    $('#get-more-tricks').on('click', function(e) {
        e.preventDefault();

        $(this).hide();

        let loader = Loader.getLoader();
        Loader.activate(loader);
        $(this).parent().append(loader);

        let more_btn = $(this);

        $.get($(this).attr('href'), { page: $(this).attr('data-next-page') })
            .done(function(data) {
                let html = $(data.view).hide();
                $('#all-tricks .tricks').append(html.fadeIn());

                let found_items = data.found_items;
                let max_per_page = data.max_per_page;
                let next_page = data.next_page;

                if(found_items > max_per_page * next_page) {
                    console.log(next_page);
                    more_btn.attr('data-next-page', next_page).show();
                }
                else {
                    more_btn.remove();
                }
            })
            .fail(function(error) {
                console.log(error);
                more_btn.show();
            })
            .always(function() {
                Loader.deactivate(loader, true);
            })
    })
}