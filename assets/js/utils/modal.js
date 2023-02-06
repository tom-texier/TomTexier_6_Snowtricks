import {uniqid} from "./uniqid";
import {callAjax} from "../ajax/ajax";
import * as Loader from "./loader";

export class CustomModal
{
    constructor(title, content, body_fixed = true) {
        this._id = uniqid('modal-');
        this._object = "";
        this.body_fixed = body_fixed;
        this._title = title;
        this._content = content;
        this.actions = [{
            title: "Annuler",
            url: "#closeCustomModal",
            classes: "btn"
        }];

        this.#init();
    }

    #init() {
        if(!this.#containerExist()) {
            this.#createContainer();
        }

        this._object = this.getContainerObject();
    }

    #createContainer() {
        let html =
            "<div id='custom-modal-container'>" +
                "<div class='custom-modal-content'>" +
                    "<div class='close-icon'><i class='fas fa-times'></i></div>" +
                    "<div class='custom-modal-title'></div>" +
                    "<div class='custom-modal-description'></div>" +
                    "<div class='custom-modal-actions'></div>" +
                "</div>" +
            "</div>";

        $('body').append(html);

        $('#custom-modal-container').find('.close-icon').on('click', () => {
            this.close();
        })

        this.#initEvents();
    }

    #containerExist() {
        return !!$('#custom-modal-container').length;
    }

    getContainerObject() {
        return $('#custom-modal-container');
    }

    open(duration = 200) {
        this.#beforeOpen();
        this._object.fadeIn(duration);
        this.#afterOpen();
    }

    close(duration = 200) {
        this.#beforeClose();
        this._object.fadeOut(duration);
        this.#afterClose();
    }

    #beforeOpen() {
        if(this.body_fixed) {
            $('html, body').addClass('custom-modal-open');
        }

        this.initContent();

        this._object.trigger(`custom-modal/${this._id}/open/before`);
    }

    #afterOpen() {
        this._object.trigger(`custom-modal/${this._id}/open/after`);
    }

    #beforeClose() {
        if(this.body_fixed) {
            $('html, body').removeClass('custom-modal-open');
        }

        this._object.trigger(`custom-modal/${this._id}/close/before`);
    }

    #afterClose() {
        this._object.trigger(`custom-modal/${this._id}/close/after`);
    }

    #initEvents() {

    }

    initContent() {
        this.resetContent();

        this._object.find('.custom-modal-content .custom-modal-title').html(this._title);
        this._object.find('.custom-modal-content .custom-modal-description').html(this._content);

        this.actions.forEach((action) => {
            let btn = $(`<a href="${action.url}" class="${action.classes}">${action.title}</a>`);

            if(action.url === '#closeCustomModal') {
                btn.on('click', (e) => {
                    e.preventDefault();
                    this.close();
                })
            }

            this._object.find('.custom-modal-content .custom-modal-actions').append(btn);
        })
    }

    resetContent() {
        this._object.find('.custom-modal-content .custom-modal-title').html("");
        this._object.find('.custom-modal-content .custom-modal-description').html("");
        this._object.find('.custom-modal-content .custom-modal-actions').html("");
    }

    /**
     * Add a button in the modal
     * @param {string} title
     * @param {string} url
     * @param {string} classes
     */
    addAction(title, url, classes = "") {
        this.actions.push({title, url, classes});

        return this;
    }

    /**
     * Remove all actions in the modal
     */
    removeAllActions() {
        this.actions = [];
        this._object.find('.custom-modal-content .custom-modal-actions').html("");

        return this;
    }

    /**
     * Init ajax request and listener on an element inside the modal
     * @param {string} action
     * @param {function} done
     * @param {function} fail
     * @param {function} always
     */
    initFormRequest(action, done = () => {}, fail = () => {}, always = () => {}) {
        let selector = $(this.getObject).find('form');

        $(selector).off('submit');
        $(selector).on('submit', function(e) {
            e.preventDefault();
            const formDataObj = {};
            const loader = Loader.getLoader();
            Loader.activate(loader);
            $(this).append(loader);
            (new FormData(e.target)).forEach((value, key) => (formDataObj[key] = value));

            callAjax(action, formDataObj, done, fail, always);
        })
    }

    set title(value) {
        this._title = value;
        this._object.find('.custom-modal-content .custom-modal-title').html(value);

        return this;
    }

    set content(value) {
        this._content = value;
        this._object.find('.custom-modal-content .custom-modal-description').html(value);

        return this;
    }

    get id() {
        return this._id;
    }

    get getObject() {
        return this._object;
    }
}