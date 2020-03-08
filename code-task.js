
function checkIfFunction(func) {
    return typeof func == 'function'
}
function doOnlyWhen(toDoHandler, toCheckHandler, interval=1000, times=20, failHandler) {
    if (!checkIfFunction(toDoHandler) || !checkIfFunction(toCheckHandler) || !checkIfFunction(failHandler) || isNaN(interval) || isNaN(times))
        return "Wrong type of values";
    if (times > 0) {
        if (toCheckHandler())
            toDoHandler();
        else
            setTimeout(() => {
                doOnlyWhen(toDoHandler, toCheckHandler, interval, times - 1, failHandler);
            }, interval)
    }
    else
        failHandler();
}
///To check
var x = 5;

function check() {
    return (x-- == 0)
}
//print true
doOnlyWhen(() => console.log("true"), check, 500, 8, () => console.log("false"));
x = 5;
//print false
doOnlyWhen(() => console.log("true"), check, 500, 4, () => console.log("false"));
/**********************************************************************************************************************************/

function isElementVisible(element) {
    if (!(element instanceof Element) || (element.style.display == 'none') || (element.style.visibility == 'hidden') || (element.style.opacity == '0'))
        return false;
    if (element.parentElement == null)
        return true;
    return isElementVisible(element.parentElement);
}

/**********************************************************************************************************************************/
function checkIfString(str) {
    return typeof str == 'string'
}
function createStyle(selector, rule) {
    if (!checkIfString(selector) || !checkIfString(rule) || rule == '' || selector == '')
        return "Wrong type of values";
    if (!document.querySelector(selector))
        return "Cant find the element";
    var style=document.createElement('style');
    style.type = 'text/css';
    style.appendChild(document.createTextNode(`${selector} { ${rule} }`));
    document.head.appendChild(style);
}
/**********************************************************************************************************************************/
function unmask(listenSelector, updateSelector) {
    if (typeof listenSelector != 'string' || typeof updateSelector != 'string' || listenSelector == '' || updateSelector == '')
        return "Wrong type of values";
    var listenElement = document.querySelector(listenSelector);
    var updateElement = document.querySelector(updateSelector);
    if (listenElement == null || updateElement == null)
        return "Cant find the element";
    listenElement.addEventListener('input', function (event) {
        updateElement.value = event.target.value
    });
}