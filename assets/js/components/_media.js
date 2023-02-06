const initializedClass = 'initialized';

export function init()
{
    document.querySelectorAll('form input[type="file"]:not('+ initializedClass +')').forEach((input) => {
        input.addEventListener('change', (e) => event(e, input));
        input.classList.add(initializedClass);
    })
}

export function reInit()
{
    init();
}

function event(e, input)
{
    let parentNode = input.parentNode;
    let customNode = parentNode.querySelector('label.form_file_input');

    if(input.hasAttribute('data-preview') && input.getAttribute('data-preview') == 'true' && parentNode.querySelectorAll('img').length) {
        let imageNode = parentNode.querySelector('img.preview-image');
        imageNode.src = URL.createObjectURL(e.target.files[0]);
    }

    customNode.querySelector('.text').textContent = e.target.files[0].name;
}