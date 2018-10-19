const net = require("net");
const Encryption = require("./../encryption");
const PacketHandler = require("./handler");
const MachinePackets = require("./packets/machine");

module.exports = class PanelClient {
	constructor() {
		this.packetHandler = new PacketHandler();
		this.encryption = new Encryption();
		this.state = "authenticating";

		let packetLists = [
			new MachinePackets()
		];
		
		for(let packetList of packetLists) {
			packetList.init(this.packetHandler);
		}
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