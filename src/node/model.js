module.exports = class Node {
	constructor(data) {
		this.parent = data.parent;
		this.children = data.children || [];
		this.id = data.id;
		this.blueprint = data.blueprint;
		this.data = data.data;
	}

	toObject() {
		return {
			parent: this.parent,
			children: ["1", "2"],
			id: this.id,
			blueprint: this.blueprint,
			data: this.data
		};
	}
}