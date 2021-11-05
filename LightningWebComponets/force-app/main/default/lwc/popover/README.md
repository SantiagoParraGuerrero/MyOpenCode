# c-popover(requires c-dialog)

## Copy any popup you like from https://www.lightningdesignsystem.com/components/popovers/

![image](https://user-images.githubusercontent.com/68650314/140560057-9564bcbd-840c-422d-a7e0-c7944dc67e5f.png)

* replace the `<section>` tag to use the `<c-popover>` component

* put all your content inside a `<div>` with the `data-id="body"`

* add the `data-id="close"` to your close button element (_this is just the x button that popovers have to the right corner_)

* that's it now you have all functionality described in
  * https://www.lightningdesignsystem.com/components/popovers/#Notable-features
  * https://www.lightningdesignsystem.com/components/popovers/#Notable-attributes
 
![image](https://user-images.githubusercontent.com/68650314/140559410-ac3e3969-a657-448c-8d3a-48a6dcdb9cf4.png)
![image](https://user-images.githubusercontent.com/68650314/140561206-26e28437-be0f-491a-8723-fd0873baeca4.png)

* @api **describedBy**

> use same value that you would use in aria-describedby

* @api **labelledBy**

> use same value that you would use in aria-labelledby

* @api **label**

> use same value that you would use in aria-label

* @api **placement**
  * **dynamic**(_default value_)
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
    (_advice: <https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect>_)
  * > opens the popover relative to the directions given

* @api **close()**

> closes the popover

* @api(getter) **opened**

> true if the popover is open otherwise false

* events
  * **opened:** triggered when the popover is opened
  * **closed** triggered when the popover is closed
