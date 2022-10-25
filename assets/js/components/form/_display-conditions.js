const initializedClass = 'condition-initialized';

export function init()
{
    mediaCondition();
}

/**
 * @param {Element|null} item_collection
 */
export function reInit(item_collection = null)
{
    init();

    if(item_collection !== null) {
        mediaInit(item_collection);
    }
}

function mediaCondition()
{
    document.querySelectorAll('form #trick_medias .collection_item input[type="radio"]:not('+ initializedClass +')').forEach((input) => {
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
    let srcBlock = item.querySelector('textarea').parentNode.style.display = 'none';
    let fileBlock = item.querySelector('input[type="file"]').parentNode.style.display = 'block';
}