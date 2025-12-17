function getShortestPath(start, target) {
    let path = [];

    // Error checking
    if (!start instanceof Array || !target instanceof Array) {
        path.push("getShortestPath - start and/or target not an array, both must be")
        return;
    }

    if (start.length !== 2 || target.length !== 2) {
        path.push("getShortestPath - start and/or target have a length other than 2 - both must have length 2");
        return;
    }


}

getShortestPath(1, 2);