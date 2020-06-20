/*
 * Measure performance of functions where this methods are placed.
 * This functions will measure total time of given function execution and count their initialization
 *
 * Usage:
 * var $a = window.startTest();
 *
 * window.endTest($a);
 */
(function(){
    var performanceTimes = {},
        performanceCount = {},
        performanceTimeouts = {};

    window.startTest = function(key){
        var callerName;
        try { throw new Error(); }
        catch (e) {
            callerName = e.stack.split("\n")[2].trim().split(' ')[1];
        }

        if ( !(callerName in performanceTimes) ) {
            performanceTimes[callerName] = 0;
            performanceCount[callerName] = 0;
        }

        performanceCount[callerName]++;

        return {
            name : callerName,
            t : (new Date).getTime()
        };
    }

    window.endTest = function(data){
        performanceTimes[data.name] += ((new Date).getTime() - data.t);

        if ( performanceTimeouts[data.name] ) {
            clearTimeout(performanceTimeouts[data.name]);
        }

        performanceTimeouts[data.name] = setTimeout(() => {
            console.log(performanceCount[data.name]+'x '+data.name+' '+(performanceTimes[data.name]/1000000)+'s');

            performanceCount[data.name] = 0;
            performanceTimes[data.name] = 0;
        }, 100);
    }
}());