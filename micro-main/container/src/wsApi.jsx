export const newWebSocket = (token, onMessage) => {
    const ws = new WebSocket("ws://localhost:3010");
    ws.onopen = () => {
        console.log('web socket onopen');
        ws.send(JSON.stringify({ type: 'authorization', payload: { token } }));
    };
    ws.onclose = () => {
        console.log('web socket onclose');
    };
    ws.onerror = error => {
        console.log('web socket onerror', error);
    };
    ws.onmessage = messageEvent => {
        console.log('web socket onmessage', messageEvent.data);
        onMessage(JSON.parse(messageEvent.data));
    };
    return () => {
        ws.close();
    }
}