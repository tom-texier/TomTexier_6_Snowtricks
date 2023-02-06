export function getLoader()
{
    return $('<span class="loader"></span>');
}

export function activate(loader)
{
    $(loader).addClass('active');
}

export function deactivate(loader, do_remove = false)
{
    $(loader).removeClass('active');

    if(do_remove) {
        remove(loader);
    }
}

export function remove(loader)
{
    $(loader).remove();
}