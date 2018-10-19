const net = require("net");
const Encryption = require("./../encryption");

module.exports = class PanelClient {
	constructor() {
		this.encryption = new Encryption();
		this.state = "authenticating";
	}

	connect() {
		this.socket = net.createConnection({
			host: app.globalConfig.get("panel.host"),
			port: app.globalConfig.get("panel.port")
		});

	}

	disconnect() {

	}
}