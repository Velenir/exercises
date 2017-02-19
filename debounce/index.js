module.exports = function debounce(fn, ms) {
	let timeout;
	
	return function (...args) {
		clearTimeout(timeout);
		timeout = setTimeout(fn.bind(this, ...args), ms);
		// timeout = setTimeout(Function.bind.apply(fn,
			// Array.prototype.concat.apply([this], arguments)), ms);
	}
};
