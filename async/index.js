const sequence = thunks => cb =>
	thunks.reduceRight((p,c) =>
		(cb, ...rest) => c(p, ...rest), cb)();
		
const parallel = thunks => cb => {
	const res = [];
	let len = thunks.length, done= false;
	thunks.forEach((thunk, i) =>
		thunk((err, data) => {
			if(done) return;
			if(err) {
				done = true;
				cb(err);
				return;
			}
			
			res[i] = data;
			if(!--len) cb(null, res);
		}));
};

const race = thunks => cb => {
	let done = false;
	thunks.forEach((thunk, i) =>
		thunk((err, data) => {
			if(done) return;
			done = true;
			
			cb(err, data);
		}));
};
	

module.exports = {
	sequence,
	parallel,
	race
};
