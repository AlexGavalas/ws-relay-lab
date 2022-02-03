const Websocket = require('ws');
const { createServer } = require('http');

const server = createServer();

const websocketServer = new Websocket.Server({ noServer: true, perMessageDeflate: true });

websocketServer.on('connection', async (socket, req) => {
	console.log('Got a connection');

	socket.on('message', (data) => {
		try {
			console.log(data.toString().replace('\n', ''));
		} catch (e) {
			console.log(e);
		}
	});

	socket.on('close', (code) => {
		console.log(`Closed connection with code ${code}`);
	});

	socket.on('error', (e) => {
		console.log(`Error: ${e}`);
	});
});

server.on('upgrade', (req, socket, head) => {
	websocketServer.handleUpgrade(req, socket, head, (ws) => {
		websocketServer.emit('connection', ws, req);
	});
});

server.listen(process.env.port, () => console.log(`Listening on port ${process.env.port}`));
