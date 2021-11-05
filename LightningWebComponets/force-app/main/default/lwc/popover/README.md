c-popover(requires c-dialog)

@api(optional) describedBy = use same value that you would use in aria-describedby 
@api(optional) labelledBy = use same value that you would use in aria-labelledby
@api(optional) label = use same value that you would use in aria-label
@api(optional- defaulted to dynamic) placement
   dynamic(default value)
      dynamicly identifies the best placement for the popup so that it is in the screen and it is close to the triggering element
	top
		popover appears on top of the triggering element
	bottom
		popover appears bellow triggering element
	left
		popover appears on the left of the triggering element
	right
		popover appears on the right of the triggering element
	center
		popover appears on top of the triggering element
	manual
		location as well as nubbins of the popup are up to you (use css or classes)

@api cssClass(optional) class to be applied to the section element (nubbin classes ignored unless placement='manual')

@api open(directions)
   opens the popover relative to the directions given

   directions: object with the following properties { width, height, top, bottom, left, right }
      advice (you can use : https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)

@api close()
   closes the popover

@api(getter) opened
   returns true if the modal is open otherwise false

events
   opened
      use thing event if you want to do something when the popover is opened
   closed
      use thing event if you want to do something when the popover is closed
