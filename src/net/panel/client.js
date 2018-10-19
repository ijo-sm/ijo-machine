const net = require("net");
const Encryption = require("./../encryption");

module.exports = class PanelClient {
	constructor() {
		this.encryption = new Encryption();
		this.state = "authenticating";
	}

	connect() {

	}

	disconnect() {

	}
}