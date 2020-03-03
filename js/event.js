var EventUtil = {
    addHandler: function (ele, type, handler) {
        if(ele.addEventlistener) {
            ele.addEventlistener(type, handler, false)
        } else if(ele.attachEvent) {
            ele.attachEvent('on' + type, handler)
        } else {
            ele['on' + type] = handler
        }
    },
    getEvent: function (event) {
        return event ? event : window.event
    },
    getTarget: function (event) {
        return event.target || event.srcElement
    },
    preventDefault:  function (event) {
        if(event.preventDefault) {
            event.preventDefault()
        } else {
            event.returnValue = false
        }
    },
    stopPropagation: function (event) {
        if(event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true
        }
    },
    removeHandler: function (ele,type,handler) {
        if(ele.removeEventlistener) {
            ele.removeEventlistener(type, handler, false)
        } else if(ele.detachEvent) {
            ele.detachEvent('on' + type, handler)
        } else {
            ele['on' + type] = null
        }
    }
}

