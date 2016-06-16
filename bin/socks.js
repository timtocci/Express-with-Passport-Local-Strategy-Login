module.exports = function (ws) {
	// define all of you WebSocket programming here
	var sendData = function (obj) {
		// stringify all objects
		ws.send(JSON.stringify(obj));
	};
	var receiveStrData = function (strObj) {
		// turn the string back into an object
		return robj = JSON.parse(strObj);
	}
	// only handle JSON
	ws.on('data', function (opcode, data) {
		if (opcode === 1) {
			//console.log('socket received text data');
			data = receiveStrData(data);
			sendData(data); //<--just return what we received
		} else if (opcode === 2) {
			//console.log('socket received binary data');
		} // close, ping and pong are handled elsewhere
	});
	ws.on('close', function (code, reason) {
		// throw one of these on the client when closing (optionally)
		switch (code) {
		case 1000:
			// Normal Close
			break;
		case 1001:
			// Going Away
			break;
		case 1002:
			// Protocol Error
			break;
		case 1003:
			// Unacceptable Data Type
			break;
		case 1007:
			// Invalid Data
			break;
		case 1008:
			// Message Violates Policy
			break;
		case 1009:
			// Message Too Large
			break;
		case 1010:
			// Extension Requires
			break;
		case 1011:
			// Unexpected Condition
			break;
		}

		console.log("WebSocket closed: " + code + ' ' + reason);
	});
}