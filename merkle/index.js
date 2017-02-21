function merkle(ar, hasher) {
	function getVerification(item) {
		const index = ar.indexOf(item);
		if(index === -1) return false;
		
		const breadcrumbs = [];
		
		if(ar.length <= 1) return {index, breadcrumbs};

		breadcrumbs.push(ar[index + (index % 2 === 0 ? 1 : -1)]);
		
		
		let nextAr = ar, newIndex = index;
		do {
			nextAr = hashOnce(nextAr, hasher);
			newIndex = Math.floor(newIndex / 2);
			if(nextAr.length <= 1) break;

			if(nextAr.length % 2 === 1) {
				nextAr.push(nextAr[nextAr.length - 1]);
			}
			breadcrumbs.push(nextAr[newIndex + (newIndex % 2 === 0 ? 1 : -1)]);
		} while (nextAr.length > 2);
				
		return {index, breadcrumbs};
	}
	
	return {
		root: hashToRoot(ar, hasher),
		getVerification
	};
}

function hashOnce(ar, hasher) {
	if(ar.length % 2 === 1) {
		ar.push(ar[ar.length - 1]);
	}
	const nextAr = [];
	for (let i = 0, len = ar.length; i < len; i+=2) {
		nextAr.push(hasher(ar[i] + ar[i+1]));
	}
	
	return nextAr;
}

function hashToRoot(ar, hasher) {
	if(ar.length === 1) return ar[0];

	const nextAr = hashOnce(ar, hasher);
	return hashToRoot(nextAr, hasher);
}

merkle.verify = function(item, root, object, hasher) {
	let {index, breadcrumbs} = object;
	return root === breadcrumbs.reduce((p, c) => {
		const toHash = index % 2 === 0 ? p + c : c + p;
		index = Math.floor(index / 2);
		return hasher(toHash);
	}, item);
}

module.exports = merkle;
