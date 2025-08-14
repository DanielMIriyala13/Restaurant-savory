import { useState, useEffect } from 'react';

const useWebSocket = (url, onMessage, onError) => {
    const [socket, setSocket] = useState(null);
    const [status, setStatus] = useState('connecting');
    const reconnectAttempts = useRef(0);
    const reconnectTimer = useRef(null);

    const connect = () => {
        const ws = new WebSocket(url);

        ws.onopen = () => {
            setStatus('connected');
            reconnectAttempts.current = 0;
            console.log('WebSocket connected');
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                onMessage(data);
            } catch (error) {
                console.error('Error parsing WebSocket message:', error);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            setStatus('error');
            onError(error);
        };

        ws.onclose = () => {
            setStatus('disconnected');
            // Attempt reconnection with exponential backoff
            const delay = Math.min(1000 * Math.pow(2, reconnectAttempts.current), 30000);
            reconnectTimer.current = setTimeout(() => {
                reconnectAttempts.current += 1;
                connect();
            }, delay);
        };

        setSocket(ws);
    };

    useEffect(() => {
        connect();

        return () => {
            if (socket) {
                socket.close();
            }
            if (reconnectTimer.current) {
                clearTimeout(reconnectTimer.current);
            }
        };
    }, [url]);

    const send = (data) => {
        if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify(data));
            return true;
        }
        return false;
    };

    return { socket, status, send };
};
// src/socket.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000', { autoConnect: false });



export default useWebSocket;