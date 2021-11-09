import { api, LightningElement } from "lwc";
const ESC_KEY_CODE = 27;
const ESC_KEY_STRING = "Escape";
const LIGHTNING_INPUT_FIELD = "LIGHTNING-INPUT-FIELD";
const TAB_KEY_CODE = 9;
const SLDS_HIDE = "slds-hide";
const TAB_KEY_STRING = "Tab";

export default class Dialog extends LightningElement {
    @api describedBy;
    @api label;
    @api labelledBy;
    @api role = "dialog";
    @api type;

    _cssClass = "";
    _isFirstRender = true;
    _isOpen = false;

    @api
    get cssClass() {
        const baseClasses = new Set(this._cssClass.split(" "));
        baseClasses.add(SLDS_HIDE);
        this._isOpen && baseClasses.delete(SLDS_HIDE);
        return [...baseClasses].join(" ");
    }

    @api
    get opened() {
        return this._isOpen;
    }

    get _body() {
        return this.template.querySelector('slot[name="body"]');
    }

    get _closeButton() {
        return this._closeButtonInSlot || this._closeButtonInTemplate;
    }

    get _closeButtonInSlot() {
        return this.querySelector('[data-id="close"]');
    }

    get _closeButtonInTemplate() {
        return this.template.querySelector('[data-id="close"]');
    }

    get _isClosed() {
        return !this._isOpen;
    }

    get _isModal() {
        return this.type === "modal";
    }

    get _isTooltip() {
        return this.type === "tooltip";
    }

    set cssClass(value) {
        this._cssClass = value;
    }

    @api
    close() {
        this._isOpen = false;
        const theEvent = new CustomEvent("closed");
        this.dispatchEvent(theEvent);
    }

    @api
    open() {
        this._isOpen = true;
        const theEvent = new CustomEvent("opened");
        this.dispatchEvent(theEvent);
        !this._isTooltip && this._focusFirstChild();
    }

    @api
    toggleDialog() {
        this._isOpen ? this.close() : this.open();
    }

    _close = () => this.close();

    _innerClickHandler = e => e.stopPropagation();

    _innerKeyUpHandler(event) {
        event.preventDefault();
        event.stopPropagation();
        if (event.keyCode === ESC_KEY_CODE || event.code === ESC_KEY_STRING) {
            this.close();
        } else if (
            event.keyCode === TAB_KEY_CODE ||
            event.code === TAB_KEY_STRING
        ) {
            const el = this.template.activeElement;
            const firstAndNavigatingBackwards =
                event.shiftKey && el?.classList.contains("firstlink");
            const lastElementInDoom = el?.classList.contains("lastLink");

            if (firstAndNavigatingBackwards || lastElementInDoom) {
                this._closeButton.focus();
            }
        }
    }

    async _focusFirstChild() {
        const children = [...this.querySelectorAll("*")]
            .filter(e => e !== this._closeButton)
            .filter(e => e.tabIndex >= 0);
        for (const child of children) {
            let hasBeenFocused = false;
            await this._setFocus(child).then(res => {
                hasBeenFocused = res;
            });
            if (hasBeenFocused) {
                return;
            }
        }
        // if there is no focusable markup from slots
        // focus the close button
        this._closeButton.focus();
    }

    _open = () => this.open();

    _outsideClickListener = e => {
        e.stopPropagation();
        this._isOpen && this.close();
    };

    _setFocus(el) {
        return new Promise(resolve => {
            /**
             * don't ever try to trap focus on a disabled element that can't be interacted with ...
             * As well, there's been some regression with lightning-input-field components -
             * they don't properly pass the "focus" event downwards through the component hierarchy, which has the fun effect of:
             * - not triggering the promise to resolve (not what we wanted)
             * - triggering the validation for required fields (DEFINITELY not what we wanted)
             */
            if (
                el.disabled ||
                (el.tagName === LIGHTNING_INPUT_FIELD && el.required)
            ) {
                return resolve(false);
            } else {
                try {
                    if (el.focus) {
                        setTimeout(() => {
                            el.focus();
                            resolve(true);
                        }, 0);
                        return;
                    }
                    setTimeout(() => resolve(false), 0);
                } catch (ex) {
                    return resolve(false);
                }
            }
        });
    }

    disconnectedCallback() {
        if (!this._isTooltip) {
            document.removeEventListener("click", this._outsideClickListener);
            this._body?.removeEventListener(
                "click",
                this._outsideClickListener
            );
        }
    }

    renderedCallback() {
        if (this._isFirstRender) {
            this._isFirstRender = false;
            this._closeButton?.addEventListener("click", this._close);
            if (!this._isTooltip) {
                document.addEventListener("click", this._outsideClickListener);
                this._body?.addEventListener("click", this._innerClickHandler);
                const section = this.template.querySelector("section");
                const attribute = this.labelledBy
                    ? "aria-labelledby"
                    : "aria-label";
                const value = this.labelledBy || this.label;
                value && section.setAttribute(attribute, value);
            }
        }
    }
}
