/*Objects participating in observable pattern are:

    Subject
        -maintains list of observers
        -lets observer subscribe or unsubscribe
        -sends a notification to observers when its state changes

    Observers
        -has a function signature that can be invoked when Subject changes

*/


function Click() {
    this.handlers = [];  // observers
}
 
Click.prototype = {               //represents the Subject
 
    subscribe: function(fn) {
        this.handlers.push(fn);   //pushes to handlers array when subscribed
    },
 
    unsubscribe: function(fn) {
        this.handlers = this.handlers.filter(
            function(item) {      //returns new handlers array without unsubscribed function
                if (item !== fn) {
                    return item;
                }
            }
        );
    },
 
    fire: function(o, thisObj) {       //o represents details about event, thisObj is the context (the 'this' value) for when eventhandlers are called
        var scope = thisObj || window; //if no context is provided, use global object instead
        this.handlers.forEach(function(item) {
            item.call(scope, o);       //for each function in the handlers array, invoke each callback function with scope and o as arguments
        });
    }
}
 
// log helper
 
var log = (function() {    //helper function that collects and displays results
    var log = "";
 
    return {
        add: function(msg) { log += msg + "\n"; },  //adds message to log variable
        show: function() { alert(log); log = ""; }  //alerts log variable
    }
})();
 
function run() {
 
    var clickHandler = function(item) { 
        log.add("fired: " + item); 
    };
 
    var click = new Click();
 
    click.subscribe(clickHandler);
    click.fire('event #1');
    click.unsubscribe(clickHandler);
    click.fire('event #2');
    click.subscribe(clickHandler);
    click.fire('event #3');
 
    log.show();
}

log();