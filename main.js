function getShortestPaths(start, target) {
    // Error checking
    // Are arrays
    if (!(start instanceof Array) || !(target instanceof Array)) {
        throw new Error("getShortestPath - start and/or target not an array, both must be");
    }

    // Valid length 
    if (start.length !== 2 || target.length !== 2) {
        throw new Error("getShortestPath - start and/or target have a length other than 2 - both must have length 2");
    }

    // Values in bounds
    if (start[0] > 7 || start[0] < 0 || start[1] > 7 || start[1] < 0 || target[0] > 7 || target[0] < 0 || target[1] > 7 || target[1] < 0) {
        throw new Error("getShortestPath - start and/or target have value(s) outside 0-7 - both must have values (inclusive) 0-7");
    }

    // This will hold all paths with the shortest length
    let paths = [];
    
    // Breadth first search variables
    let queue = [start];
    let processed = [];

    let reached = false;

    while (!reached) {
        process([start], queue, processed, target, found);
    }
    

    // Find valid paths (end in target)
}

// Test for pathListValuesAndIndices logic
// process([[[0,0],[0,0]], [[6,6],[1,1]], [[0,0],[2,2]], [[0,0],[0,0]], [[1,1],[4,4]], [[7,7],[2,2]], [3,3]], [[]], [[]], [], [])

// Test for queue logic making new positions and validating them
// This test will also check to see if they are correctly put in newQueue
process([[0,0]], [[0,0]], [[1,2]], [7,7], false); 

function process(currentPathList, queue, alreadyProcessed, target, reached) {
    // Array for last paths and their indices in currentPathList - 1
        // Form: [Final entry of path(s), [array of indices for path(s) ending in this path]]
        // [ [[0,0], [0, 3, 5]], [[7, 7], [2, 4, 6]], [...] ]
        // Explain: Above there are three paths ending in [0,0], their indices in currentPathList are 0, 1, 2

        // This list is used when making new paths while the queue is being processed so currentPathList doesn't have to be searched repeatedly
    let pathListValuesAndIndices = [];
    
    for (let i = 0; i < currentPathList.length; i++) {
        let pathEnd = currentPathList[i].at(-1); // Last entry in path

        // See if pathEnd is equal to target
        if (pathEnd[0] === target[0] && pathEnd[1] === target[1]) {
            // They are equal
            // Let the rest of this call to process happen in case multiple paths reached target in the same number of steps
            reached = true;
        }

        // Add new paths to the list, or add indices to already found paths
            // See if pathEnd is already in the list
        let indexOfPathEnd = -1;
        for (let j = 0; j < pathListValuesAndIndices.length; j++) {
            let path = pathListValuesAndIndices[j][0];
            if (path[0] === pathEnd[0] && path[1] === path[1]) {
                indexOfPathEnd = j;
                break;
            }
        }

        if (indexOfPathEnd === -1) { // Wasn't in the list
            pathListValuesAndIndices.push([pathEnd, [i]]);
        } else {
            // let pathEndList = pathListValuesAndIndices[indexOfPathEnd][1];
            // pathEndList.push[i];
            pathListValuesAndIndices[indexOfPathEnd][1].push(i);
        }
    }
    
    // Array for holding new paths - 2
        //  The paths here will replace the paths in currentPathList
    let newPaths = []; // Holds all the paths created from processing the queue

    // Master array for holding new queue entries - 3
        // These values will be pushed into queue when it finishes processing, setting up the next call to process()
    let newQueue = [];

    // For each in queue
    for (let i = 0; i < queue.length; i++) {
        let thisPos = queue.pop();
        // Create internal array holding queue entries to be used for creation of new paths in 2 - 4
        // Find next positions
        // Add positions to 4
        let nextPositions = findPositionsFromPos(thisPos);
        // Remove positions from 4 that are in alreadyProcessed
        nextPositions = excludePositionsInAlreadyProcessed(nextPositions, alreadyProcessed);

        // Add positions from 4 to 3 if they aren't already present
        let addToQueue = true;
        for (let j = 0; j < nextPositions.length; j++) {
            let pos = nextPositions[i];
            for (let k = 0; k < newQueue.length; k++) {
                let nqPos = newQueue[k];
                if (pos[0] === nqPos[0] && pos[1] === nqPos[1]) {
                    addToQueue = false;
                    break;
                }
            }
            if (addToQueue) {
                newQueue.push(pos);
            } else {
                addToQueue = true;
            }
        }

        // Take positions from 4 and add to 2 by index list(1)
        
        // Add this position to alreadyProcessed
        alreadyProcessed.push(thisPos);
    }

    // Replace currentPathList with newPaths
    currentPathList.length = 0;
    for (path of newPaths) {
        currentPathList.push(path);
    }
    // Put newQueue entries into queue
    for (q of newQueue) {
        queue.push(q);
    }
}

// Returns all positions in the [0,0]-[7,7] range, it doesn't look in a queue
function findPositionsFromPos(pos) {
    let toReturn = [];
    
    // Find positions with 1 horizontal change and 2 vertical change
    // [pos[0]+1, pos[1]+2];
    // [pos[0]+1, pos[1]-2];
    // [pos[0]-1, pos[1]+2];
    // [pos[0]-1, pos[1]-2];
    for (let i = 0; i < 4; i++) {
        // Create position to check
        let h = 1;
        let v = 2;

        if (i > 1) {
            h = -1;
        }

        if (i % 2 === 1) {
            v = -2;
        }

        let thisPos = [pos[0] + h, pos[1] + v];

        // See if position is valid
        if (thisPos[0] > 7 || thisPos[0] < 0 || thisPos[1] > 7 || thisPos[1] < 0 ) {
            // Invalid
            continue;
        } else {
            toReturn.push(thisPos);
        }
    }

    // Find positions with 2 in horizontal change and 1 vertical change
    // [pos[0]+2, pos[1]+1];
    // [pos[0]+2, pos[1]-1];
    // [pos[0]-2, pos[1]+1];
    // [pos[0]-2, pos[1]-1];
    for (let i = 0; i < 4; i++) {
        // Create position to check
        let h = 2;
        let v = 1;

        if (i > 1) {
            h = -2;
        }

        if (i % 2 === 1) {
            v = -1;
        }

        let thisPos = [pos[0] + h, pos[1] + v];

        // See if position is valid
        if (thisPos[0] > 7 || thisPos[0] < 0 || thisPos[1] > 7 || thisPos[1] < 0 ) {
            // Invalid
            continue;
        } else {
            toReturn.push(thisPos);
        }
    }

    return toReturn;
}

function excludePositionsInAlreadyProcessed(positions, alreadyProcessed) {
    let validPos = [];
    let addToArr = true;
    for (let i = 0; i < positions.length; i++) {
        let pos = positions[i];
        for (let j = 0; j < alreadyProcessed.length; j++) {
            let apPos = alreadyProcessed[j];
            if (pos[0] === apPos[0] && pos[1] === apPos[1]) { // If the position isn't in alreadyProcessed it is valid to be processed
                addToArr = false;
                break;
            }
        }
        if (addToArr) {
            validPos.push(pos);
        } else {
            addToArr = true;
        }
    }

    return validPos;
}