import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { getDocumentById, updateDocument, deleteDocument } from '../services/documentService';
import { io } from 'socket.io-client';
import "./DocumentDetails.css";

const DocumentDetails = () => {
    const socket = io('http://localhost:5000');

    const { id } = useParams();
    const navigate = useNavigate();
    const [document, setDocument] = useState(null);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isMuted, setIsMuted] = useState(false);
    const [activeSpeakers, setActiveSpeakers] = useState([]);

    const location = useLocation();
    const message = location.state?.message;

    useEffect(() => {
        const fetchDocument = async () => {
            try {
                const doc = await getDocumentById(id);
                setDocument(doc);
                setTitle(doc.title);
                setContent(doc.content);
            } catch (error) {
                setError('Failed to fetch document');
            }
        };
        fetchDocument();
    }, [id]);

    useEffect(() => {
        // Join the document room
        socket.emit('joinDocument', id);

        // Listen for real-time updates
        socket.on('receiveUpdate', (updatedData) => {
            if (updatedData.title) {
                setTitle(updatedData.title);
            }
            if (updatedData.content) {
                setContent(updatedData.content);
            }
        });

        socket.on('receiveUpdatedTitle', (updatedContent) => {
            setContent(updatedContent);
        });

        // Voice chat events
        socket.on('activeSpeakers', (speakers) => {
            setActiveSpeakers(speakers);
        });

        // Cleanup on component unmount
        return () => {
            socket.disconnect();
        };
    }, [id, socket]);

    const handleUpdate = async () => {
        try {
            await updateDocument(id, { title, content });
            socket.emit('documentUpdate', { documentId: id, title, content });
            setSuccessMessage('Document updated successfully!');
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (error) {
            setError('Failed to update document');
            setTimeout(() => setError(null), 3000);
        }
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this document?')) {
            try {
                await deleteDocument(id);
                navigate('/dashboard');
            } catch (error) {
                setError('Failed to delete document');
                setTimeout(() => setError(null), 3000);
            }
        }
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
        socket.emit('toggleMute', { documentId: id, isMuted: !isMuted });
    };

    if (!document) return <div className="loading-spinner">Loading...</div>;

    return (
        <div className="document-details-container">
            {message && <div className="alert alert-success">{message}</div>}
            {error && <div className="alert alert-danger">{error}</div>}
            {successMessage && <div className="alert alert-success">{successMessage}</div>}

            <div className="document-header">
                <h2>Document Editor</h2>
                <div className="document-actions">
                    <button className="btn btn-primary" onClick={handleUpdate}>
                        Save Changes
                    </button>
                    <button className="btn btn-danger" onClick={handleDelete}>
                        Delete Document
                    </button>
                </div>
            </div>

            <div className="document-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={title}
                        onChange={(e) => {
                            setTitle(e.target.value);
                            socket.emit('documentUpdate', { 
                                documentId: id, 
                                title: e.target.value, 
                                content 
                            });
                        }}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="content">Content</label>
                    <textarea
                        id="content"
                        className="form-control document-content"
                        value={content}
                        onChange={(e) => {
                            setContent(e.target.value);
                            socket.emit('documentUpdate', { 
                                documentId: id, 
                                title, 
                                content: e.target.value 
                            });
                        }}
                    />
                </div>
            </div>

            <div className="voice-chat-section">
                <h3>Voice Chat</h3>
                <div className="voice-controls">
                    <button 
                        className={`mute-btn ${isMuted ? 'muted' : ''}`}
                        onClick={toggleMute}
                    >
                        {isMuted ? 'Unmute' : 'Mute'}
                    </button>
                </div>
                
                {activeSpeakers.length > 0 && (
                    <div className="active-speakers">
                        <h4>Active Speakers:</h4>
                        <ul>
                            {activeSpeakers.map((speaker, index) => (
                                <li key={index}>{speaker}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DocumentDetails;