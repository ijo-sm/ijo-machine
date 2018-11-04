const Node = require("./model");

function parseNodes(nodes) {
	return nodes.map(node => new Node(node));
}

module.exports = class NodeTree {
	constructor(data) {
		this.name = data.name;
		this.nodes = parseNodes(data.nodes);
	}

	save() {
		ijo.db.get("nodeTrees").find({name: this.name}).assign(this.toObject()).write();
	}

	toObject() {
		return {
			name: this.name,
			nodes: this.nodes.map(node => node.toObject())
		};
	}
}