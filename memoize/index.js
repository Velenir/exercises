// With object as cache (keys are strings)
//
// function getObjAtPath(cache, pathargs) {
// 	let res;
// 	for (let i = 0, len = pathargs.length; i < len; ++i) {
// 		const arg = pathargs[i];
// 		res = cache[arg];
// 		if(!res) {
// 			res = cache[arg] = {};
// 			for (++i; i < len; ++i) {
// 				const arg = pathargs[i];
// 				res = res[arg] = {};
// 			}
//
// 			return res;
// 		}
//
// 		cache = res;
// 	}
//
// 	return res;
// }
//
//
// module.exports = function(fn) {
// 	const cache = {};
//
// 	return function(...args) {
// 		const res = getObjAtPath(cache, args.map(a => String(a)));
// 		return "__value__" in res ? res.__value__ : res.__value__ = fn(...args);
// 	};
// };


// With Map as cache

function getObjAtPath(cache, pathargs) {
	let res;
	for (let i = 0, len = pathargs.length; i < len; ++i) {
		const arg = pathargs[i];
		res = cache.get(arg);
		if(!res) {
			// res = cache[arg] = {};
			cache.set(arg, res = new Map());
			for (++i; i < len; ++i) {
				const arg = pathargs[i];
				// res = res[arg] = {};
				res.set(arg, res = new Map());
			}
			
			return res;
		}
		
		cache = res;
	}
	
	return res;
}


module.exports = function(fn) {
	const cache = new Map();

	return function(...args) {
		const res = getObjAtPath(cache, args.map(a => String(a)));
		
		if(res.has("__value__")) return res.get("__value__");
		
		const calc = fn(...args);
		res.set("__value__", calc);
		return calc;
	};
};


// Official solution

function memoizeOff(fn) {
  var cache = {};
  return function(n) {
    var key = JSON.stringify([].slice.call(arguments));
    if (!(key in cache)) {
      cache[key] = fn.apply(null, arguments);
    }

    return cache[key];
  };
}
