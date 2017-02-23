module.exports = function({codes, message, timeouter, toggle}, cb) {
	const states = Array.prototype.map.call(message,
		lt => {
			let repl = codes[lt];
			if(!repl)
				if(lt === " ") repl = "00";
				else throw new Error("unknown symbol:", lt);
			
			return repl;
	}).join("00").replace(/-|\./g, match => match === "-" ? "1110" : "10");

	let bulb = "0", i = 0;
	for (let len = states.length; i < len; ++i) {
		const current = states[i];
		if(bulb !== current) {
			timeouter(toggle, i);
			bulb = current;
		}
	}
	
	timeouter(cb, i);
};
