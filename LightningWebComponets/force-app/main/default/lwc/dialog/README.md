# c-dialog

* @api **describedBy**

> use same value that you would use in aria-describedby

* @api **labelledBy**

> use same value that you would use in aria-labelledby

* @api **label**

> use same value that you would use in aria-label

* @api **cssClass**

> class to be applied to the section element

* @api **open()**

> opens the dialog relative to the directions given

* @api **close()**

> closes the dialog

* @api(getter) **opened**

> true if the dialog is open otherwise false

* events
  * **opened:** triggered when the dialog is opened
  * **closed** triggered when the dialog is closed

I want to thank https://github.com/jamessimone/lwc-modal as his code helped me to build c-dialog (pretty much just copied it but make it extendable to be able to implement it in modals and popovers)
