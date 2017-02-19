module.exports = function (arr, item) {
	let last = arr.length - 1, first = 0;
	while(first <= last) {
		const mid = (first + last) >> 1;
		const midItem = arr[mid];
		if(midItem === item) {
			return mid;
		}
		
		if(item < midItem) {
			last = mid - 1;
		} else {
			first = mid + 1;
		}
	}
	
	return -1;
};
