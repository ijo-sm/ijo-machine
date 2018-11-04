const assert = require("assert");
const PacketList = require("./model");
const Packet = require("./../packet");

module.exports = class MachinePacketList extends PacketList {
	init(handler) {
		super.init(handler);

		handler.addPacket(new Packet("machine/created", "authenticating", this.created));
		handler.addPacket(new Packet("machine/authed", "authenticating", this.authed));
		handler.addPacket(new Packet("machine/connected", "authenticating", this.connected));
	}

	created(packet) {
		assert(packet.id, "The value id of the received packet is undefined");
		assert(packet.secret, "The value secret of the received packet is undefined");

		ijo.privateConfig.set("id", packet.id);
		ijo.privateConfig.set("secret", packet.secret);
	}

	authed() {
		console.log("machine was authenticated");
	} 

	connected() {
		if(ijo.privateConfig.get("id") == undefined) {
			ijo.panelClient.send("machine/create");
		}
		else {
			ijo.panelClient.send("machine/auth", {id: ijo.privateConfig.get("id"), secret: ijo.privateConfig.get("secret")});
		}
	}
}