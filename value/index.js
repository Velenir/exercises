module.exports = function (val) {
	while(typeof val === "function") val = val();
	return val;
}
