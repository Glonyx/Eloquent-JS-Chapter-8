// exercise 1 - retry
class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure("Klunk");
  }
}

function reliableMultiply(a, b) {
  // Your code here.
    "use strict";
    // creates loop that doesn't terminate on its own
    for (;;) {
        // try runs until next try or catch
        try { 
            return primitiveMultiply(a, b);
        }
        catch (exception) {
            // if exception is in the function, it tells you to try again,
            // else, it raises an exception
            if (exception instanceof MultiplicatorUnitFailure) {
               console.log("Try Again.");
            }
            else {
                throw exception;
            }
        }
    }
}

console.log(reliableMultiply(8, 8));
// → 64


// exercise 2 - the locked box
const box = {
    locked: true,
    unlock() { this.locked = false; },
    lock() { this.locked = true;  },
    _content: [],
    get content() {
      if (this.locked) throw new Error("Locked!");
      return this._content;
    }
  };
  
  function withBoxUnlocked(body) {
    // Your code here.
    // unlocks the box
    box.unlock();

    // try returns the body checking if the box is locked or not
    try {
        return body();
    }
    // locks the box again
    finally {
        box.lock();
    }
  }
  
  withBoxUnlocked(function() {
    box.content.push("gold piece");
  });
  
  try {
    withBoxUnlocked(function() {
      throw new Error("Pirates on the horizon! Abort!");
    });
  } catch (e) {
    console.log("Error raised: " + e);
  }
  console.log(box.locked);
  // → true