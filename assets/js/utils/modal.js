export class CustomModal
{
    constructor(title, content, body_fixed = true) {
        this.modal = "";
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

        this.modal = this.getContainerObject();
    }

    #createContainer() {
        const html =
            "<div id='custom-modal-container'>" +
                "<div class='custom-modal-content'>" +
                    "<div class='custom-modal-title'></div>" +
                    "<div class='custom-modal-description'></div>" +
                    "<div class='custom-modal-actions'></div>" +
                "</div>" +
            "</div>";

        $('body').append(html);
    }

    #containerExist() {
        return !!$('#custom-modal-container').length;
    }

    getContainerObject() {
        return $('#custom-modal-container');
    }

    open(duration = 200) {
        this.#beforeOpen();
        this.modal.fadeIn(duration);
    }

    close(duration = 200) {
        this.#beforeClose();
        this.modal.fadeOut(duration);
    }

    #beforeOpen() {
        if(this.body_fixed) {
            $('html, body').addClass('custom-modal-open');
        }

        this.initContent();

        this.modal.trigger('custom-modal/open/before');
    }

    #beforeClose() {
        if(this.body_fixed) {
            $('html, body').removeClass('custom-modal-open');
        }

        this.modal.trigger('custom-modal/close/before');
    }

    initContent() {
        this.resetContent();

        this.modal.find('.custom-modal-content .custom-modal-title').html(this._title);
        this.modal.find('.custom-modal-content .custom-modal-description').html(this._content);

        this.actions.forEach((action) => {
            let btn = $(`<a href="${action.url}" class="${action.classes}">${action.title}</a>`);

            if(action.url === '#closeCustomModal') {
                btn.on('click', (e) => {
                    e.preventDefault();
                    this.close();
                })
            }

            this.modal.find('.custom-modal-content .custom-modal-actions').append(btn);
        })
    }

    resetContent() {
        this.modal.find('.custom-modal-content .custom-modal-title').html("");
        this.modal.find('.custom-modal-content .custom-modal-description').html("");
        this.modal.find('.custom-modal-content .custom-modal-actions').html("");
    }

    /**
     * Add a button in the modal
     * @param {String} title
     * @param {String} url
     * @param {String} classes
     */
    addAction(title, url, classes = "") {
        this.actions.push({title, url, classes});

        return this;
    }

    set title(value) {
        this._title = value;

        return this;
    }

    set content(value) {
        this._content = value;

        return this;
    }
}