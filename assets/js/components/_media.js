const initializedClass = 'initialized';

export function init()
{
    document.querySelectorAll('form > div > input[type="file"][data-preview="true"]:not('+ initializedClass +')').forEach((input) => {
        input.addEventListener('change', function(e) {
            let parentNode = input.parentNode;
            let imageNode = parentNode.querySelector('img.preview-image');
            imageNode.src = URL.createObjectURL(e.target.files[0]);
        })
        input.classList.add(initializedClass);
    })
}

export function reInit()
{
    init();
}