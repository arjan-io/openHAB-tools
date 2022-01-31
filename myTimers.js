/* This array stores the timer into a 2d array in the cache.
* This way, timers are persisted between rule and script reloads
*
* The array consists per object of 3 elements: timerName, timer and whenDone
* - timerName is a unique name
* - timer is just that, the timer
* - whenDone is the function to call when the timer is up
* A fourth element (bool) can be passed when calling the 'insertMyTimer' as to wether or
* not to reschedule a timer in case one already exists. If one exists and this variable
* is false, then the function returns nothing and the existing timer remains active.
* 
* Initials code written by arjan-io Jan 2022
* version 0.0.1 Jan 2022
*/

// Define array
let myTimers = [];

// Get a list of timers from the array
const listMyTimers = () => {
    console.debug("listMyTimer script started")

    for (var i = 0; i <myTimers.length; i++) {
        var rslt = myTimers[i][0] + ", " + myTimers[i][1] + ", " + myTimers[i][2] + "\n";
        return rslt;
    }
}

// Get a specific timer from the array
const getMyTimers = (timerName) => {
    console.debug("getMyTimers script started", "\n", "timerName is ", timerName);
    
    for (var i = 0; i <myTimers.length; i++) {
            return myTimers[i][0] == timerName;
    }
}

// Delete timer from array
const deleteMyTimers = (timerName) => {
    console.debug("deleteMyTimers script started", "\n", "timerName is ", timerName)
    
    for (var i = 0; i <myTimers.length; i++) {
        if (myTimers[i][0] == timerName) {
            myTimers.splice(i, 1);
        }
    }
}

// Insert a timer into the array
const insertMyTimers = (timerName, timer, whenDone, rst) => {
    console.debug("Insert started with variables " + timerName + ", " + timer + ", " + whenDone + ", " + rst);

    var curr = getMyTimers(timerName)
    console.debug("bool timer exists = ", curr);

    var rslt = "";

    if(!curr) {
        myTimers.push([timerName, timer, whenDone]);
        rslt = "Timer saved in array";
    } else if(rst) {
        deleteMyTimers(timerName);
        myTimers.push([timerName, timer, whenDone]);
        rslt = "Timer already existed.", "\n", "Current entry deleted and new entry saved";
    } else {
        console.warn("Already a timer with name ", timerName, ". Override false, no timer persisted")
        rslt = "Timer already existed.", "\n", "No new timer saved as override was set to False";
    }

    return rslt;
}

module.exports = {
    listMyTimers,
    getMyTimers,
    deleteMyTimers,
    insertMyTimers
}

