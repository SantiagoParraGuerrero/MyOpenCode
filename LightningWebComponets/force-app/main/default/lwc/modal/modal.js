import { LightningElement, api } from "lwc";

export default class Modal extends LightningElement {
  @api cssClass;
  @api describedBy;
  @api label;
  @api labelledBy;
  @api noBackdrop;
  _isOpen = false;

  @api
  get opened() {
    return this._isOpen;
  }

  get _dialog() {
    return this.template.querySelector("c-dialog");
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
