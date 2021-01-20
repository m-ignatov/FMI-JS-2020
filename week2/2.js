function trippleAdd(a, b, c) {
    return a + b + c;
}

function curry(fn) {
    return function curried() {
        var args = [].slice.call(arguments);

        if (args.length < fn.length) {
            return function () {
                args.push(...arguments);
                return curried(...args);
            }
        }
        return fn(...args);
    }
}

cTrippleAdd = curry(trippleAdd);

console.log(cTrippleAdd(1)(2)(3)); //6
console.log(cTrippleAdd(1, 2)(3)); //6
console.log(cTrippleAdd(1, 2, 3)); //6