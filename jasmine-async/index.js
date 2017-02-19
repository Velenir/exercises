module.exports = function(fn) {
	const {desc, setup, test} = fn();
	
	it(desc, function () {
		let flag = false;
		
		runs(() => setup(() => flag = true));
		
		waitsFor(() => flag);
		
		runs(test);
	});
}
