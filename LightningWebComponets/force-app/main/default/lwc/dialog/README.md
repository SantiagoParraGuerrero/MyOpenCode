c-dialog

@api(optional) describedBy = use same value that you would use in aria-describedby
@api(optional) labelledBy = use same value that you would use in aria-labelledby
@api(optional) label = use same value that you would use in aria-label
css-class(optional) = class to be applied to the section element

@api opened
return true if the dialog is open otherwise false

@api open()
   opens the dialog

@api close()
   closes the dialog

@api(getter) opened
   returns true if the dialog is open otherwise false

events
opened
   use thing event if you want to do something when the dialog is opened
closed
   use thing event if you want to do something when the dialog is closed
