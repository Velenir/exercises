// execute promises in slices of num
function throttlePromisesSlicesOfNum(num, factories) {
	let promise = Promise.resolve([]), ind = 0;
	const len = factories.length;
    
	while(ind < len) {
		const startInd = ind;
		promise = promise.then(results =>
			Promise.all(factories.slice(startInd, startInd + num)
				.map(factory => factory())
			).then(resSlice => (console.log(resSlice),results.concat(resSlice)))
		);
		ind += num;
	}
	
	return promise.catch(err => console.error("RRR:",err));
};


// start num promises in parallel and add one when one resolves
function throttlePromisesMaxNum(num, factories) {
	const result = new Array(factories.length),
		len = factories.length;
		
	function next() {
		if(num >= len) {
			return;
		}
		const currentInd = num++;
		return factories[currentInd]().then(res1 => (result[currentInd] = res1, next()));
	}
	
	
	const parelleled = factories.slice(0, num).map((factory, i) => factory()
		.then(res1 => (result[i] = res1, next()))
	);
	
	return Promise.all(parelleled).then(() => result);
};


module.exports = throttlePromisesMaxNum;
