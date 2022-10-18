export default function initMedia()
{
    document.querySelectorAll('form > div > input[type="file"][data-preview="true"]').forEach((input, index) => {
        console.log(input);
        input.addEventListener('change', function(e) {
            let parentNode = input.parentNode;
            let imageNode = parentNode.querySelector('img.preview-image');
            imageNode.src = URL.createObjectURL(e.target.files[0]);
        })
    })
}