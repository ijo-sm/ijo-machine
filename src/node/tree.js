const Node = include("src/node/model");
const database = include("src/database/database");

module.exports = class NodeTree {
	constructor(data) {
		this.name = data.name;
		this.nodes = this._parseNodes(data.nodes);
	}

	save() {
		database.get("nodeTrees").find({name: this.name}).assign(this.toObject()).write();
	}

	toObject() {
		return {
			name: this.name,
			nodes: this.nodes.map(node => node.toObject())
		};
	}

	_parseNodes(nodes) {
		return nodes.map(node => new Node(node));
	}
}