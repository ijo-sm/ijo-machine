const PacketList = include("src/net/panel/packets/model");
const Packet = include("src/net/panel/packet");
const Assert = include("assert");
const privateConfig = include("src/config/private");

class MachinePacketList extends PacketList {
	init(handler) {
		super.init(handler);

		this.handler.addPacket(new Packet("machine/created", "authenticating", this.created.bind(this)));
		this.handler.addPacket(new Packet("machine/authed", "authenticating", this.authed.bind(this)));
		this.handler.addPacket(new Packet("machine/connected", "authenticating", this.connected.bind(this)));
	}

	created(packet) {
		Assert(packet.id, "The value id of the received packet is undefined");
		Assert(packet.secret, "The value secret of the received packet is undefined");

		privateConfig.set("id", packet.id);
		privateConfig.set("secret", packet.secret);
	}

	authed() {
		console.log("machine was authenticated");
	} 

	connected() {
		if(privateConfig.get("id") == undefined) {
			this.handler.panelClient.send("machine/create");
		}
		else {
			this.handler.panelClient.send("machine/auth", {id: privateConfig.get("id"), secret: privateConfig.get("secret")});
		}
	}
}

module.exports = new MachinePacketList();