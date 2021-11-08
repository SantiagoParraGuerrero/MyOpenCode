import { LightningElement, api } from "lwc";

export default class Modal extends LightningElement {
  @api describedBy;
  @api label;
  @api labelledBy;
  @api noBackdrop;
  _cssClass;
  _isOpen = false;

  @api
  get cssClass() {
      const baseClasses = new Set(this._cssClass.split(" "));
      baseClasses.add("slds-modal");
      return [...baseClasses].join(" ");
  }

  @api
  get opened() {
    return this._isOpen;
  }

  get _dialog() {
    return this.template.querySelector("c-dialog");
  }

  set cssClass(value) {
      this._cssClass = value;
  }

  @api
  close() {
    this._dialog.close();
  }

  @api
  open() {
    setTimeout(() => this._dialog.open(), 0);
  }

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
}
