# Using the Stile iFrame communication interface.

Your iFrame will be sandboxed inside the Stile platform. Because of this you will only be able to communicate with Stile through the Stile iFrame communication interface.

There are two ways to communicate with Stile. The first is by receiving message from Stile, which you can optionally implement if you wish to receive them. The second is by sending events to Stile. Stile will only respond to events it recognises. Each of these methods is described below.

## Receiving messages from Stile

Stile will send messsages when it wants to communicate to you. The Stile iFrame communication interface will automatically handle the message passing between you and Stile. All interfaces are optional to implement and take a _Node.js_-style callback as its only parameter that is used to respond.

A global object `stileInterface` is exposed on the `window` object that represents the Stile communication interface. If you want to override the entire interface you can just replace the object. Alternatively you can just override individual functions.

**NOTE - If you override the entire interface you should reimplement `getWindowDimensions`, else your iFrame will appear in a 150px tall box.**

### The callback object `callback(err, response)`

All of the Stile interface functions receive a callback function that is used to respond to the request. It takes two parameters. The first is for any errors and the second is for the response.

Parameter   | Type                      | Description                                                                           |
------------| --------------------------|---------------------------------------------------------------------------------------|
`err`       | Error                     | A JavaScript Error object.                                                            |
`response`  | Object/String/Number/Array| The response to send back to Stile. Type depends on the interface call (see below).   |

#### Example
```javascript
    window.stileInterface = {
        getWindowDimensions: function(callback){
            try {
                var widthVal, heightVal;

                // Do some calculations

                var dimensions = {
                    width: widthVal,
                    height: heightVal
                }
                callback(null, dimensions);
            } catch (e) {
                callback(e);
            }
        }
    }
```

## List of Stile Interfaces

### `stileInterface.getWindowDimensions(callback)`

Called when Stile needs the size of your of your iframe. It should return the dimensions of your iframe in an object with the keys `width` and `height`.

**NOTE - Stile will not allow you to exceed 675px tall. If you return a height taller than that, your iframe will have a scrollbar.**

Parameter   | Type                      | Description                                  |
------------| --------------------------|----------------------------------------------|
`response`  | object                    | An object with the dimensions of the iFrame  |

#### Example
```javascript
    getWindowDimensions: function(callback){
        callback(null, {
            width: 1000,
            height: 400
        });
    },
```

## Sending events to Stile

You can send events to Stile by calling `window.sendStileEventCall(eventName, [eventArgs])`. It takes a Stile event name as its first argument and an optional array of arguments to pass to the event in Stile.

Parameter               | Type              | Description                                       |
------------------------| ------------------|---------------------------------------------------|
`eventName`             | Stile event name  | One of the declared Stile event names (see below) |
`eventArgs` (Optional)  | Array             | An optional array of arguments for the event      |

#### Example
```javascript
    window.sendStileEventCall('changeWindowDimensions');
```

## List of supported events

### `changeWindowDimensions`

Trigger this event if your window resizes. This will let Stile know that your iFrame needs to be resized. It will then call `getWindowDimensions` on your iFrame to get the new dimensions.

#### Example
```javascript
window.addEventListener('resize' function(){
    window.sendStileEventCall('changeWindowDimensions');
}, false);
```
