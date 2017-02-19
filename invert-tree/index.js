module.exports = function invertTree(root) {
	if(root == undefined) return;
	if(root.left == undefined && root.right == undefined) return;
	
	[root.left, root.right] = [root.right, root.left];
	invertTree(root.left);
	invertTree(root.right);
};
