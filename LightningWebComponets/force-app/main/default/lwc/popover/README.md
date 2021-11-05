## c-popover(requires c-dialog)

* @api **describedBy**
> use same value that you would use in aria-describedby 
* @api **labelledBy**
> use same value that you would use in aria-labelledby
* @api **label**
> use same value that you would use in aria-label
* @api **placement**
  * **dynamic**
  > dynamicly identifies the best placement for the popup so that it is in the screen and it is close to the triggering element
  * **top**
  > popover appears on top of the triggering element
  * **bottom**
  > popover appears bellow triggering element
  * **left**
  > popover appears on the left of the triggering element
  * **right**
  > popover appears on the right of the triggering element
  * **center**
  > popover appears on top of the triggering element
  * **manual**
  > location as well as nubbins of the popup are up to you (use css or classes)

* @api **cssClass**
> class to be applied to the section element (_nubbin classes ignored unless placement='manual'_)

* @api **open(directions)**
  * > **directions**: object with the following properties { width, height, top, bottom, left, right } given in px'
    _(_advice: https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)_
  * > opens the popover relative to the directions given

* @api **close()**
> closes the popover

* @api(getter) *opened*
> true if the popover is open otherwise false

* events
  * **opened:** triggered when the popover is opened
  * **closed** triggered when the popover is closed
