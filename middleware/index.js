class Middleware {
	constructor() {
		this.middlewares = [];
	}

	use(fn) {
		this.middlewares.push(fn);
	}

	go(fn) {
		// this.middlewares.reduceRight((p, c) => c.bind(this, p.bind(this)), fn)();
		// this.middlewares.reduceRight((p, c) => () => c.call(this, p.bind(this)), fn)();
		
		// this inside functions will be global context (window or whatever)
		this.middlewares.reduceRight((p, c) => () => c(p), fn)();
	}
}

// function Middleware() {
// 	this.middlewares = [];
// }
//
// Middleware.prototype.use = function(fn) {
// 	this.middlewares.push(fn);
// }
//
// Middleware.prototype.go = function(fn) {
// 	// this.middlewares.reduceRight((p, c) => c.bind(this, p.bind(this)), fn)();
// 	this.middlewares.reduceRight((p, c) => (...args) => c(p), fn)();
// }

module.exports = Middleware;
