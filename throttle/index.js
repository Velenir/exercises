// module.exports = function throttle(fn, ms) {
// 	let disabled = false, scheduled = false, timeout;
//
// 	return function() {
// 		if(!disabled) {
// 			disabled = true;
// 			scheduled = false;
// 			// clearTimeout(timeout);
//
// 			fn.apply(this, arguments);
//
// 			timeout = setTimeout(() => {
// 				disabled = false;
// 				if(scheduled) {
// 					disabled = true;
// 					scheduled = false;
//           timeout = setTimeout(() => disabled = false, ms);
// 					fn.apply(this, arguments);
// 				}
// 			}, ms);
// 		} else {
// 			scheduled = true;
// 		}
// 	};
// };

module.exports = function throttle(fn, ms) {
	let last, timeout;
	
	return function() {
		// time of call
		const now = Date.now();
		
		if(last !== undefined && now - last <= ms) {
			// not time for next call yet
			
			// cancel old scheduled call
			clearTimeout(timeout);
			
			// schedule last call to execute after delay
			timeout = setTimeout(() => {
				// time of last call
				last = Date.now();
				// console.log("scheduled");
				fn.apply(this, arguments);
			}, ms);
		} else {
			// free to make next call
			
			// time of last call
			last = now;
			fn.apply(this, arguments);
		}
	};
};

// module.exports = function(func, limit) {
//   var inThrottle,
//     lastFunc,
//     throttleTimer;
//   return function() {
//     var context = this,
//       args = arguments;
//     if (inThrottle) {
//       clearTimeout(lastFunc);
//       return lastFunc = setTimeout(function() {
//         func.apply(context, args);
//         inThrottle = false;
//       }, limit);
//     } else {
//       func.apply(context, args);
//       inThrottle = true;
//       return throttleTimer = setTimeout(function() {
//         return inThrottle = false;
//       }, limit);
//     }
//   };
// };
