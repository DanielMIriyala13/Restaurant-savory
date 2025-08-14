import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Dashboard.css";

const Dashboard = () => {
    const [documents, setDocuments] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const token = user ? user.token : null;
                const { data } = await axios.get('http://localhost:5000/api/documents', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDocuments(data);
            } catch (error) {
                console.error('Failed to fetch documents:', error);
                navigate('/');
            }
        };
        fetchDocuments();
    }, [navigate]);

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">Your Documents</h2>
            <div className="document-grid">
                {documents.map((doc) => (
                    <div key={doc._id} className="document-card">
                        <div className="document-card-body">
                            <h5 className="document-title">{doc.title}</h5>
                            <p className="document-date">Created: {new Date(doc.createdAt).toLocaleDateString()}</p>
                            <Link to={`/document/${doc._id}`} className="open-button">Open</Link>
                        </div>
                    </div>
                ))}
            </div>
            <div className="create-button-container">
                <button className="create-document-button" onClick={() => navigate('/document/new')}>
                    + New Document
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
