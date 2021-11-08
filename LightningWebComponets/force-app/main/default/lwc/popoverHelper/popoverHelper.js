const nubbinsByPosition = {
	bottom: "slds-nubbin_top",
	bottomleft: "slds-nubbin_top-right",
	bottomright: "slds-nubbin_top-left",
	center: "",
	left: "slds-nubbin_right",
	right: "slds-nubbin_left",
	top: "slds-nubbin_bottom",
	topleft: "slds-nubbin_bottom-right",
	topright: "slds-nubbin_bottom-left"
};

class PopoverHelper {
	placement;
	popUpDirections;
	directions;
	closestCornerToScreen;

    constructor(placement, directions, popUpDirections) {
		this.placement = placement;
		this.popUpDirections = popUpDirections;
		this.directions = directions;
		this.closestCornerToScreen = this.getClosestCornerToCenterOfScreen();
    }

    getClosestCornerToCenterOfScreen() {
        const centerOfScreen = {
            left: window.innerWidth / 2,
            top: window.innerHeight / 2
        };
        const corners = {
            topleft: { left: this.directions.left, top: this.directions.top },
            bottomleft: { left: this.directions.left, top: this.directions.bottom },
            topright: { left: this.directions.right, top: this.directions.top },
            bottomright: { left: this.directions.right, top: this.directions.bottom }
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
            ([key, value]) =>
                value.distanceFromCenterOfScreen === closerDistance
        )[0];
    }

    getLeftLocation() {
        const centerOfButton = this.directions.left + this.directions.width / 2;
        const centerOfPopUp = this.popUpDirections.width / 2;
        if (["bottom", "top", "center"].includes(this.placement)) {
            return centerOfButton - centerOfPopUp;
        }
        if (this.placement === "left") {
            return this.directions.left - this.popUpDirections.width;
        }
        if (this.placement === "right") {
            return this.directions.right;
        }

        return this.closestCornerToScreen.includes("left")
            ? centerOfButton - this.popUpDirections.width
            : centerOfButton;
    }

    getPopoverLocation() {
        return { top: this.getTopLocation(), left: this.getLeftLocation() }
    }

	getNubbins() {
        return this.placement === "dynamic" ? nubbinsByPosition[this.closestCornerToScreen] : nubbinsByPosition[this.placement];
	}

    getTopLocation() {
        const centerOfButton = this.directions.top + this.directions.height / 2;
        const centerOfPopUp = this.popUpDirections.height / 2;
        if (["left", "right", "center"].includes(this.placement)) {
            return centerOfButton - centerOfPopUp;
        }
        if (this.placement === "top") {
            return this.directions.top - this.popUpDirections.height;
        }
        if (this.placement === "bottom") {
            return this.directions.bottom;
        }
        return this.closestCornerToScreen.includes("top")
            ? this.directions.top - this.popUpDirections.height
            : this.directions.bottom;
    }
}

export { PopoverHelper }
