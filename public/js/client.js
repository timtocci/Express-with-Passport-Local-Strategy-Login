/**
 * Created by Owner on 007, Jun 7, 2016.
 */
if (window.WebSocket) {
    var ws = new WebSocket("ws://127.0.0.1:3000/");
    // listen to the websocket for events
    ws.onopen = function (e) {
        console.log('websocket opened ...');
        // send a text format message
        var now = Date.now();
        ws.send(JSON.stringify({
            type: 'init',
            id: now
        }));
    }
    ws.onmessage = function (e) {
        if (typeof e.data === 'string') {
            console.log('String message recieved ', e, e.data);
            console.log('parsed message = ' + JSON.parse(e.data))
        } else {
            // binary format can be either blob or arraybuffer
            // and must be set before processing incoming data
            // default is Blob
            ws.binaryType = 'blob';
            if (e.data instanceof Blob) {
                var blob = new Blob(e.data);
            }

            ws.binaryType = 'arraybuffer';
            if (e.data instanceof ArrayBuffer) {
                var a = new Uint8Array(e.data);
            }
        }
    }
    ws.onerror = function (e) {
        console.log('Socket error -->', e);
    }
    ws.onclose = function (e) {
        console.log('Socket closed -->', e);
    }
} else {
    console.log("This browser does not support WebSocket.");
    window.location = '/rejected'
}
