const NodeTree = include("src/node/tree");
const database = include("src/database/database");

class NodeManager {
	constructor() {
		this.trees = [];
		this.blueprints = [];
	}

	async initialize() {
		await database.create("nodeTrees");
	}

	load() {
		let nodeTrees = database.get("nodeTrees").value();

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

		return database.get("nodeTrees").push(nodeTree.toObject()).write();
	}

	registerBlueprint(name, blueprint) {
		blueprint.name = name;
		this.blueprints.push(blueprint);
	}
}

module.exports = new NodeManager();