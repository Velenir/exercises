module.exports = function customMap(ar, cb, ctx = ar) {
	const res = [];
	
	for (let i = 0, len = ar.length; i < len; ++i) {
		const mappedItem = cb.call(ctx, ar[i], i, ar);
		res.push(mappedItem);
	}
	
	return res;
};
