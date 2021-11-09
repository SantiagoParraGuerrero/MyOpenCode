import { LightningElement, api } from "lwc";
import { PopoverHelper } from "c/popoverHelper";

export default class Popover extends LightningElement {
    @api describedBy;
    @api label;
    @api labelledBy;
    @api placement = "dynamic";
    @api role;
    @api type = "popover";
    _cssClass = "";
    _isFirstRender = true;
    _isOpen = false;

    @api
    get cssClass() {
        const baseClasses = new Set(this._cssClass.split(" "));
        baseClasses.add("slds-popover");
        return [...baseClasses].join(" ");
    }

    @api
    get opened() {
        return this._dialog.opened;
    }

    get _body() {
        return this.template.querySelector('slot[name="body"]');
    }

    get _dialog() {
        return this.template.querySelector("c-dialog");
    }

    get _isTooltip() {
        return this.type === "tooltip";
    }

    get _tooltip() {
        return this.template.querySelector('slot[name="tooltip"]');
    }

    set cssClass(value) {
        this.setAttribute('cssClass', value);
        this._cssClass = value;
    }

    @api
    open(directions) {
        this._dialog.open();
        this.placement !== "manual" &&
            setTimeout(() => this._setPopOverLocation(directions), 0);
    }

    @api
    close() {
        this._dialog.close();
    }

    _hoverInside = e => {
        e.stopPropagation();
        this._dialog.open();
        this.placement !== "manual" &&
            setTimeout(() => {
                const directions =
                    this.querySelector(
                        '[slot="tooltip"]'
                    ).getBoundingClientRect();
                this._setPopOverLocation(directions);
            }, 0);
    };

    _hoverOutside = e => {
        e.stopPropagation();
        this._isOpen && this.close();
    };

    _onDialogClose(event) {
        event.preventDefault();
        event.stopPropagation();
        this._isOpen = false;
        const theEvent = new CustomEvent("closed");
        this.dispatchEvent(theEvent);
    }

    _onDialogOpen(event) {
        event.preventDefault();
        event.stopPropagation();
        this._isOpen = true;
        const theEvent = new CustomEvent("opened");
        this.dispatchEvent(theEvent);
    }

    _setDirections(newDirections) {
        const css = document.body.style;
        css.setProperty("--popoverLeft", `${newDirections.left}px`);
        css.setProperty("--popoverTop", `${newDirections.top}px`);
        //TODO USE CSS Modules when added to lwc
    }

    _setNubbins(nubbins) {
        const baseClasses = new Set(this.cssClass.split(" "));
        [...baseClasses]
            .filter(e => e.startsWith("slds-nubbin"))
            .forEach(e => baseClasses.delete(e));
        baseClasses.add(nubbins);
        this.cssClass = [...baseClasses].join(" ");
    }

    _setPopOverLocation(directions) {
        const popUpDirections =
            this.querySelector('[slot="body"]').getBoundingClientRect();
        const helper = new PopoverHelper(
            this.placement,
            directions,
            popUpDirections
        );
        this._setNubbins(helper.getNubbins());
        this._setDirections(helper.getPopoverLocation());
    }

    disconnectedCallback() {
        if (this._isTooltip) {
            this.template.removeEventListener("mouseover", this._hoverInside);
            document.removeEventListener("mouseover", this._hoverOutside);
        }
    }

    renderedCallback() {
        if (this._isFirstRender) {
            this._isFirstRender = false;
            if (this._isTooltip) {
                document.addEventListener("mouseover", this._hoverOutside);
                this.template.addEventListener("mouseover", this._hoverInside);
            }
        }
    }
}
