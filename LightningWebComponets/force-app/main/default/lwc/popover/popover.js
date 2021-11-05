import { LightningElement, api } from "lwc";
export default class Popover extends LightningElement {
  @api cssClass;
  @api describedBy;
  @api label;
  @api labelledBy;
  @api placement = "dynamic";

  _nubbinsByPosition = {
    bottom: "slds-nubbin_top",
    bottomLeft: "slds-nubbin_top-right",
    bottomRight: "slds-nubbin_top-left",
    center: "",
    left: "slds-nubbin_right",
    right: "slds-nubbin_left",
    top: "slds-nubbin_bottom",
    topLeft: "slds-nubbin_bottom-right",
    topRight: "slds-nubbin_bottom-left"
  };

  @api
  get opened() {
    return this._dialog.opened;
  }

  get _css() {
    return document.body.style;
  }

  get _dialog() {
    return this.template.querySelector("c-dialog");
  }

  @api
  open(directions) {
    this._dialog.open();
    this.placement !== "manual" &&
      setTimeout(() => this._setPopoverLocation(directions), 0);
  }

  @api
  close() {
    this._dialog.close();
  }

  _getClosestCornerToCenterOfScreen(directions) {
    const centerOfScreen = {
      left: window.innerWidth / 2,
      top: window.innerHeight / 2
    };
    const corners = {
      topLeft: { left: directions.left, top: directions.top },
      bottomLeft: { left: directions.left, top: directions.bottom },
      topRight: { left: directions.right, top: directions.top },
      bottomRight: { left: directions.right, top: directions.bottom }
    };

    Object.entries(corners).forEach(([key, value]) => {
      const a = value.left - centerOfScreen.left;
      const b = value.top - centerOfScreen.top;
      const distance = Math.sqrt(a * a + b * b);
      corners[key].distanceFromCenterOfScreen = distance;
    });

    const closerDistance = Math.min(
      ...Object.values(corners).map(e => e.distanceFromCenterOfScreen)
    );
    return Object.entries(corners).find(
      ([key, value]) => value.distanceFromCenterOfScreen === closerDistance
    )[0];
  }

  _setPopoverLeft(directions, popUp, dynamic) {
    const centerOfButton = directions.left + directions.width / 2;
    const centerOfPopUp = popUp.width / 2;
    if (["bottom", "top", "center"].includes(this.placement)) {
      return centerOfButton - centerOfPopUp;
    }
    if (this.placement === "left") {
      return directions.left - popUp.width;
    }
    if (this.placement === "right") {
      return directions.right;
    }

    return dynamic.includes("Left")
      ? centerOfButton - popUp.width
      : centerOfButton;
  }

  _setPopoverLocation(directions) {
    const popUp =
      this.querySelector('[data-id="body"]').getBoundingClientRect();
    const baseClasses = new Set(this.cssClass.split(" "));
    [...baseClasses]
      .filter(e => e.startsWith("slds-nubbin"))
      .forEach(e => baseClasses.delete(e));
    const dynamic = this._getClosestCornerToCenterOfScreen(directions);
    const nubbins =
      this.placement === "dynamic"
        ? this._nubbinsByPosition[dynamic]
        : this._nubbinsByPosition[this.placement];
    baseClasses.add(nubbins);
    this.cssClass = [...baseClasses].join(" ");
    this._css.setProperty(
      "--popoverLeft",
      `${this._setPopoverLeft(directions, popUp, dynamic)}px`
    );
    this._css.setProperty(
      "--popoverTop",
      `${this._setPopoverTop(directions, popUp, dynamic)}px`
    );
    //TODO USE CSS Modules when added to lwc
  }

  _setPopoverTop(directions, popUp, dynamic) {
    const centerOfButton = directions.top + directions.height / 2;
    const centerOfPopUp = popUp.height / 2;
    if (["left", "right", "center"].includes(this.placement)) {
      return centerOfButton - centerOfPopUp;
    }
    if (this.placement === "top") {
      return directions.top - popUp.height;
    }
    if (this.placement === "bottom") {
      return directions.bottom;
    }
    return dynamic.includes("top")
      ? directions.top - popUp.height
      : directions.bottom;
  }

  _onDialogClose(event) {
    event.preventDefault();
    event.stopPropagation();
    const theEvent = new CustomEvent("closed");
    this.dispatchEvent(theEvent);
  }

  _onDialogOpen(event) {
    event.preventDefault();
    event.stopPropagation();
    const theEvent = new CustomEvent("opened");
    this.dispatchEvent(theEvent);
  }
}
