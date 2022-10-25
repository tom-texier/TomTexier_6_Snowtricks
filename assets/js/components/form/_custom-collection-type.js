import * as Media from '../_media';
import * as DisplayConditions from './_display-conditions';

const collectionsContainersSelector = '.custom_collection_type_container';
const collectionsSelector = '.custom_collection_type';
const collectionsItemsClass = 'collection_item';
const collectionsItemsSelector = '.' + collectionsItemsClass;

const initializedClass = 'initialized';
const addBtnSelector = '.add_another_collection_widget';
const deleteBtnsClass = 'delete_another_collection_widget';
const deleteBtnsSelector = '.' + deleteBtnsClass;

export function init()
{
    let allCollections = document.querySelectorAll(collectionsSelector + ':not(.'+initializedClass+')');

    allCollections.forEach((collection) => {
        collection.classList.add(initializedClass);
        let collectionMinItems = getAttrValue(collection, 'data-min-items', true);
        let nbItems = getCollectionNbItems(collection);

        collection.querySelectorAll(collectionsItemsSelector).forEach((item) => {
            addActions(collection, item);
        })

        checkForbiddenBtns(collection);

        if(collectionMinItems !== null && nbItems < collectionMinItems) {
            for(let i = nbItems + 1; i <= collectionMinItems; i++) {
                addItem(collection);
            }
        }
    })

    initAddBtnAction();
    initDeleteBtnAction();
}

function reInit()
{
    init();
}

/**
 * @param {Element|null} item_collection
 */
function reInitEvents(item_collection = null)
{
    Media.reInit();
    DisplayConditions.reInit(item_collection);
}

/**
 * Get HTML attribute value
 * @param {Element} target
 * @param {string} attr_name
 * @param {boolean} isNan
 */
function getAttrValue(target, attr_name, isNan = false)
{
    let value = target.getAttribute(attr_name) === undefined ? null : target.getAttribute(attr_name);

    if(!isNan || value === null) return value;

    return parseInt(value);
}

/**
 * Get the count of items in the collection
 * @param {Element} collection
 */
function getCollectionNbItems(collection)
{
    return getAttrValue(collection, 'data-widget-counter', true) || collection.children.length;
}

/**
 * Add some actions on collections items
 * @param {Element} collection
 * @param {Element} item
 */
function addActions(collection, item)
{
    addDeleteBtn(collection, item);
}

/**
 * Add a delete button on a collection item
 * @param {Element} collection
 * @param {Element} item
 */
function addDeleteBtn(collection, item)
{
    if(getAttrValue(collection, 'data-allow-delete', true) != 1) return false;

    let removeBtn = document.createElement('a');
    removeBtn.href = '#';
    removeBtn.innerHTML = '<i class="fas fa-trash"></i>';
    removeBtn.classList.add(deleteBtnsClass);
    removeBtn = item.appendChild(removeBtn);

    removeBtn.addEventListener('click', removeBtnEvent);
}

/**
 * Check visibily for Add and Remove buttons according to configs and nbItems
 * @param {Element} collection
 */
function checkForbiddenBtns(collection)
{
    let collectionMinItems = getAttrValue(collection, 'data-min-items', true);
    let collectionMaxItems = getAttrValue(collection, 'data-max-items', true);
    let nbItems = getCollectionNbItems(collection);

    let addBtn = collection.parentElement.querySelector(addBtnSelector);
    let removeBtns = collection.querySelectorAll(deleteBtnsSelector);

    // Add button
    if (collectionMaxItems !== null && nbItems === collectionMaxItems) {
        addBtn.style.display = 'none';
    }
    else {
        addBtn.style.display = 'block';
    }

    // Delete button
    if(collectionMinItems !== null && nbItems === collectionMinItems) {
        removeBtns.forEach((btn) => {
            btn.style.display = 'none';
        })
    }
    else {
        removeBtns.forEach((btn) => {
            btn.style.display = 'flex';
        })
    }
}

/**
 * Add an item in the collection
 * @param {Element} collection
 */
function addItem(collection)
{
    let collectionMaxItems = getAttrValue(collection, 'data-max-items', true);
    let nbItems = getCollectionNbItems(collection);

    if(collectionMaxItems !== null && nbItems === collectionMaxItems) return false;

    let newWidget = getAttrValue(collection, 'data-prototype');
    let regex = new RegExp('__name__', 'g');
    if(getAttrValue(collection, 'data-prototype-name') !== '') {
        regex = new RegExp(getAttrValue(collection, 'data-prototype-name'), 'g');
    }
    nbItems++;
    newWidget = newWidget.replace(regex, nbItems);
    collection.setAttribute('data-widget-counter', nbItems);

    let newItem = document.createElement(getAttrValue(collection, 'data-widget-tags'));
    newItem.classList.add(collectionsItemsClass);
    newItem.innerHTML = newWidget;

    collection.appendChild(newItem);

    addActions(collection, newItem);
    checkForbiddenBtns(collection);

    reInitEvents(newItem);
    reInit();
}

function initAddBtnAction()
{
    let addBtns = document.querySelectorAll(addBtnSelector);
    addBtns.forEach((btn) => {
        btn.removeEventListener('click', addBtnEvent);
        btn.addEventListener('click', addBtnEvent);
    })
}

function addBtnEvent(e)
{
    e.preventDefault();
    let target = e.target;
    let collection = document.querySelector(getAttrValue(target, 'data-collection-selector'));
    addItem(collection);
    checkForbiddenBtns(collection);
}

function initDeleteBtnAction()
{
    let deleteBtns = document.querySelectorAll(deleteBtnsSelector);
    deleteBtns.forEach((btn) => {
        btn.removeEventListener('click', removeBtnEvent);
        btn.addEventListener('click', removeBtnEvent);
    })
}

function removeBtnEvent(e)
{
    e.preventDefault();
    let target = e.target;
    let collection = target.closest(collectionsSelector);
    target.closest('.collection_item').remove();
    checkForbiddenBtns(collection);
}