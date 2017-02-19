module.exports = function flatten(ar) {
	const res = [];
	for(let item of ar) {
		if(!Array.isArray(item)) res.push(item);
		else res.push(...flatten(item));
		// else Array.prototype.push.apply(res, flatten(item));
	}
	
	return res;
}
