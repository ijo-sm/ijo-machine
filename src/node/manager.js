const NodeTree = require("./tree");

module.exports = class NodeManager {
	constructor() {
		this.trees = [];
		this.blueprints = [];
	}

	async initialize() {
		await ijo.db.create("nodeTrees");
	}

	load() {
		let nodeTrees = ijo.db.get("nodeTrees").value();

		for(let nodeTree of nodeTrees) {
			this.trees.push(new NodeTree(nodeTree));
		}
	}

	save() {
		for(let nodeTree of this.trees) {
			nodeTree.save();
		}
	}

	create(name) {
		let nodeTree = new NodeTree({
			name
		});
		this.trees.push(nodeTree);

		return ijo.db.get("nodeTrees").push(nodeTree.toObject()).write();
	}

	registerBlueprint(name, blueprint) {
		blueprint.name = name;
		this.blueprints.push(blueprint);
	}
}