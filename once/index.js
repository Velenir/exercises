module.exports = function (fn) {
	let res, called = false;
	
	return function() {
		return called ? res : (called = true, res = fn.apply(this, arguments));
	}
}
