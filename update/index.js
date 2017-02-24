module.exports = function update(obj, command) {
	const keys = Object.keys(command);
	if(typeof obj === "object" && obj) obj = Array.isArray(obj) ? obj.slice() : Object.assign({}, obj);
	
	for(let key of keys) {
		const val = command[key];
		
		switch (key) {
			case "$push":
				obj.push.apply(obj, val);
				break;
			case "$unshift":
				obj.unshift.apply(obj, val);
				break;
			case "$splice":
				val.forEach(v => obj.splice.apply(obj, v));
				break;
			case "$set":
				obj = val;
				break;
			case "$merge":
				Object.assign(obj, val);
				break;
			case "$apply":
				obj = val(obj);
				break;
			default:
				obj[key] = update(obj[key], val);
		}
	}
	return obj;	
};
