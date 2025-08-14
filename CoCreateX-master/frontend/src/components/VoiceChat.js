import React, { useState, useEffect, useRef } from 'react';
import { FaMicrophone, FaMicrophoneSlash, FaUser } from 'react-icons/fa';
import './VoiceChat.css';

const VoiceChat = ({ roomId }) => {
    const [isMuted, setIsMuted] = useState(false);
    const [activeSpeakers, setActiveSpeakers] = useState([]);
    const [connectionStatus, setConnectionStatus] = useState('connecting');
    const socketRef = useRef(null);

    useEffect(() => {
        // Initialize WebSocket connection
        socketRef.current = new WebSocket(`wss://your-server.com/voice?room=${roomId}`);

        socketRef.current.onopen = () => {
            setConnectionStatus('connected');
            console.log('Voice connection established');
        };

        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'activeSpeakers') {
                setActiveSpeakers(data.speakers);
            }
        };

        socketRef.current.onerror = (error) => {
            console.error('Voice connection error:', error);
            setConnectionStatus('error');
        };

        socketRef.current.onclose = () => {
            setConnectionStatus('disconnected');
        };

        return () => {
            if (socketRef.current) {
                socketRef.current.close();
            }
        };
    }, [roomId]);

    const toggleMute = () => {
        const newMutedState = !isMuted;
        setIsMuted(newMutedState);
        
        if (socketRef.current.readyState === WebSocket.OPEN) {
            socketRef.current.send(JSON.stringify({
                type: 'muteToggle',
                isMuted: newMutedState
            }));
        }
    };

    return (
        <div className="voice-chat-container">
            <div className="connection-status">
                Status: <span className={`status-${connectionStatus}`}>
                    {connectionStatus}
                </span>
            </div>

            <div className="active-speakers">
                <h3>Active Speakers</h3>
                {activeSpeakers.length > 0 ? (
                    <div className="speakers-grid">
                        {activeSpeakers.map((speaker, index) => (
                            <div key={index} className="speaker-card">
                                <div className="speaker-avatar">
                                    <FaUser />
                                </div>
                                <div className="speaker-info">
                                    <span className="speaker-name">{speaker.name}</span>
                                    {speaker.isSpeaking && (
                                        <div className="speaking-indicator"></div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No active speakers</p>
                )}
            </div>

            <div className="voice-controls">
                <button 
                    onClick={toggleMute}
                    className={`mute-button ${isMuted ? 'muted' : ''}`}
                >
                    {isMuted ? (
                        <>
                            <FaMicrophoneSlash /> Unmute
                        </>
                    ) : (
                        <>
                            <FaMicrophone /> Mute
                        </>
                    )}
                </button>
            </div>

            {connectionStatus === 'error' && (
                <div className="error-alert">
                    Connection error. Please try refreshing.
                </div>
            )}
        </div>
    );
};

export default VoiceChat;