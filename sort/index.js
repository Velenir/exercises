module.exports = function sort(ar, cmp = (a,b) => a > b ? 1 : a < b ? -1 : 0) {
	if(ar.length <= 1) return ar;
	
	
	// Bubble sort
	// let changed = true;
	//
	// while(changed) {
	// 	changed = false;
	//
	// 	for (let i = 0, len = ar.length; i < len - 1; ++i) {
	// 		if(cmp(ar[i], ar[i+1]) > 0) {
	// 			[ar[i], ar[i+1]] = [ar[i+1], ar[i]];
	// 			changed = true;
	// 		}
	// 	}
	// }
	//
	
	// Insertion sort
	for (let i = 0, len = ar.length; i < len; ++i) {
		let item = ar[i];
		let j = i - 1, prev;
		
		while(j>=0 && cmp(prev = ar[j], item) > 0) {
			ar[j--+1] = prev;
		}
		
		ar[j+1] = item;
	}
	
	return ar;
};

// console.log(sort([5, 1, 4, 2, 3]));

/*
5 1 4 2 3
1 4 2 3 5
1 2 3 4 5
1 2 3 4 5
*/
