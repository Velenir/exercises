module.exports = function flatten(thunk) {
	// Works like this:
	//
	// return function(cb) {
	// 	thunk3(
	// 		(err, thunk2) => thunk2(
	// 			(err, thunk1) => thunk1(cb)
	// 		)
	// 	);
	// };
	
	if(typeof thunk !== "function") return thunk;
	
	return function(cb) {
		thunk((err, thnk) => {
			if(err) return cb(err);
			
			const res = flatten(thnk);
			typeof res === "function" ? res(cb) : cb(null, res);
		});
	};
};

// Official solution:
//
function flattenThunk(thunk) {
  return function(cb) {
    next();
    function next() {
      thunk(function(err, result) {
        if (typeof result === 'function') {
          thunk = result;
          next();
        } else {
          cb(null, result);
        }
      });
    }
  }
}
