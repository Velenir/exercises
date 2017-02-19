module.exports = function curry(fn) {
	return function (...args) {
		if(args.length >= fn.length) {
			return fn(...args);
		}
		
		return curry(fn.bind(null, ...args));
	}
};
