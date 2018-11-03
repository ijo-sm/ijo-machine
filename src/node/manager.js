const NodeList = require("./model");

module.exports = class NodeManager {
	async initialize() {
		await ijo.db.create("nodelists");
	}
}