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

		this.socket.on("connect", () => {
			if(app.privateConfig.get("id") == undefined) {
				this.send("machine/create");
			}
			else {
				this.send("machine/auth", {id: app.privateConfig.get("id"), secret: app.privateConfig.get("secret")});
			}
		});

		this.socket.on("error", error => {
			switch(error.code) {
				case "ECONNRESET":
					console.error("Abruptly lost connection to server");
					break;
				case "ECONNREFUSED":
					console.error("Could not connect to server");
					break;
				default:
					throw error;
			}
		});

		this.socket.on("data", data => {
			this.packetHandler.handle(data);
		});
	}

	send(event, data = {}) {
		data._event = event;

		this.socket.write(JSON.stringify(data));
	}

	disconnect() {

	}
}