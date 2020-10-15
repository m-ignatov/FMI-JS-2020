var addOne = (x) => x + 1;
var sqrt = (x) => x * x;
var log = (x) => console.log(x);

function compose() {
	var fns = arguments;

	return function () {
		var args = [].slice.call(arguments);

		for (var i = fns.length - 1; i >= 0; i--) {
			args = [fns[i](...args)];
		}
		return args;
	}
}

addOneSqrtAndPrint = compose(log, sqrt, addOne);
addOneSqrtAndPrint(1); // 4