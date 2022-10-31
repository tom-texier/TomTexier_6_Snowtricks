const initializedClass = 'condition-initialized';

export function init()
{
    mediaCondition();
}

/**
 * @param {Element|null} item_collection
 */
export function reInit()
{
    init();
}

function mediaCondition()
{
    document.querySelectorAll('form #trick_medias .collection_item input[type="radio"]:not('+ initializedClass +')').forEach((input) => {
        let collection_item = input.closest('.collection_item');
        mediaInit(collection_item);

        input.addEventListener('change', function(e) {
            let parentNode = input.parentNode.parentNode.parentNode;

            let srcBlock = parentNode.querySelector('textarea').parentNode;
            let fileBlock = parentNode.querySelector('input[type="file"]').parentNode;

            if(input.value == 1) {
                srcBlock.style.display = 'none';
                fileBlock.style.display = 'block';
            }
            else if(input.value == 2) {
                srcBlock.style.display = 'block';
                fileBlock.style.display = 'none';
            }
            else {
                return false;
            }
        })
        input.classList.add(initializedClass);
    })
}

export function mediaInit(item)
{
    let choice = item.querySelector('input[type="radio"]:checked').value;
    let srcBlock = item.querySelector('textarea').parentNode;
    let fileBlock = item.querySelector('input[type="file"]').parentNode;

    if(choice == 1) {
        srcBlock.style.display = 'none';
        fileBlock.style.display = 'block';
    }
    else if(choice == 2) {
        srcBlock.style.display = 'block';
        fileBlock.style.display = 'none';
    }
    else {
        srcBlock.style.display = 'none';
        fileBlock.style.display = 'block';
    }
}