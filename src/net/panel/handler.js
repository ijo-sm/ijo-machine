const machinePacketList = include("src/net/panel/packets/machine");

class PacketHandler {
	constructor() {
		this.packets = new Map();

		let packetLists = [machinePacketList];

		for(let packetList of packetLists) {
			packetList.init(this);
		}
	}

	init(panelClient) {
		this.panelClient = panelClient;
	}

	addPacket(packet) {
		this.packets.set(packet.event, packet);
	}

	removePacket(event) {
		this.packets.delete(event);
	}

	async handle(data) {
		let parsedPacket = this._parsePacket(data);

		if(!this.packets.has(parsedPacket._event)) {
			return;
		}

		let packet = this.packets.get(parsedPacket._event);

		if(packet.state !== this.panelClient.state) {
			return;
		}
		
		await packet.handle(parsedPacket);
	}

	_parsePacket(packet) {
		try {
			return JSON.parse(packet.toString());
		}
		catch(e) {
			throw e;
		}
	}
}

module.exports = new PacketHandler();