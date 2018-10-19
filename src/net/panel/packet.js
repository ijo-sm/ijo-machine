module.exports = class Packet {
	constructor(event, callback) {
		this.event = event;
		this.callback = callback;
	}

	handle(packet, machine) {
		this.callback(packet, machine);
	}
}