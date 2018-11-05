module.exports = class NodeBlueprint {
	constructor() {
		this.handles = new Map();
	}

	handle(event, callback) {
		this.handles.set(event, callback);
	}
}