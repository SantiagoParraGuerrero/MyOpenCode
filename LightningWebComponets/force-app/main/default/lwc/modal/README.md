# c-modal(requires c-dialog)

## Copy any modal you like from https://www.lightningdesignsystem.com/components/modals/

![image](https://user-images.githubusercontent.com/68650314/140563798-2f8328fa-ee3e-4b05-b528-56790e3d8a15.png)

* replace the `<section>` tag to use the `<c-modal>` component

* put all your content inside a `<div>` with the `data-id="body"`

**it has to be inside the `<div class="slds-modal__container">` this is because slds-modal__container behaves in an unexpected way and messes up the close-on-click-outside functionality**

* add the `data-id="close"` to your close button element (_this is just the x button that modals have to the right corner_)

* remove this line that should be at the end `<div class="slds-backdrop slds-backdrop_open"></div>`
  * _backdrop is disabled or enable when closed/opened the modal_ (see @api noBackdrop in case you dont want to have a backdrop)

* that's it now you have all functionality described in
  * https://www.lightningdesignsystem.com/components/modals/#Expected-keyboard-interactions
 
![image](https://user-images.githubusercontent.com/68650314/140575582-c8b2da62-6e1a-4058-9622-ad83915669b1.png)


![image](https://user-images.githubusercontent.com/68650314/140564038-13d7e469-a871-4146-8fca-fb6cfd374d3d.png)

* @api **describedBy**

> use same value that you would use in aria-describedby

* @api **labelledBy**

> use same value that you would use in aria-labelledby

* @api **label**

> use same value that you would use in aria-label

* @api **cssClass**

> class to be applied to the section element

* @api **open()**

> opens the modal relative to the directions given

* @api **close()**

> closes the modal

* @api **noBackdrop**

> disables backdrop

* @api(getter) **opened**

> true if the modal is open otherwise false

* events
  * **opened:** triggered when the modal is opened
  * **closed** triggered when the modal is closed