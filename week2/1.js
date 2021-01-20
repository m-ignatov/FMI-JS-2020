var sum = function (x, y) { return x + y; }

function memoize(fn) {
	var storeMap = new Map();

	return function () {
		var args = [].slice.call(arguments);
		var key = args.toString();

		if (storeMap.has(key)) {
			return storeMap.get(key);
		}
		var result = fn(...args);
		storeMap.set(key, result);

		return result;
	}
}

var memSum = memoize(sum);
console.log(memSum(2, 3));
console.log(memSum(2, 3));
