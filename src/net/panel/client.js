const Net = include("net");
const packetHandler = include("src/net/panel/handler");
const globalConfig = include("src/config/global");

class PanelClient {
	constructor() {
		this.state = "authenticating";
	}

	connect() {
		packetHandler.init(this);

		this.socket = Net.createConnection({
			host: globalConfig.get("panel.host"),
			port: globalConfig.get("panel.port")
		});

		this.socket.on("connect", () => {
			packetHandler.handle(JSON.stringify({
				_event: "machine/connected"
			}));
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
			packetHandler.handle(data);
		});
	}

	send(event, data = {}) {
		data._event = event;

		this.socket.write(JSON.stringify(data));
	}

	disconnect() {

	}
}

module.exports = new PanelClient();