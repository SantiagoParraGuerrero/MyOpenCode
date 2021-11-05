c-modal(requires c-dialog)
   @api describedBy = use same value that you would use in aria-describedby
   @api labelledBy = use same value that you would use in aria-labelledby
   @api label = use same value that you would use in aria-label
   css-class = class to be applied to the section element
   
   @api opened
   return true if the modal is open otherwise false
   
   @api open()
      opens the modal
   
   @api close()
      closes the modal
   
   events
   onopened
      use thing event if you want to do something when the modal is opened
   onclosed
      use thing event if you want to do something when the modal is closed
