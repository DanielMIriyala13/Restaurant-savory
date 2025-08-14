import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './DocumentForm.css';

const DocumentForm = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [saving, setSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet',
        'link', 'image'
    ];

    const handleAutoSave = async () => {
        try {
            setSaving(true);
            setError(null);
            const user = JSON.parse(localStorage.getItem('user'));
            const token = user?.token;

            if (!token) {
                throw new Error('Authentication required');
            }

            const { data } = await axios.post('http://localhost:5000/api/documents',
                { title, content },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSaving(false);
            setSaveMessage('Document created successfully!');
            setTimeout(() => setSaveMessage(''), 2000);
            navigate(`/document/${data._id}`, {
                state: { message: 'Document created successfully!' }
            });
        } catch (error) {
            console.error('Failed to save document:', error);
            setSaving(false);
            setError(error.response?.data?.message || error.message || 'Failed to create document');
            setSaveMessage('Save failed');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleAutoSave();
    };

    const wordCount = content.replace(/<[^>]+>/g, '').trim().split(/\s+/).filter(word => word.length > 0).length;
    const charCount = content.replace(/<[^>]+>/g, '').length;

    return (
        <div className="document-form-container">
            <h2>Create New Document</h2>

            {error && <div className="alert alert-error">{error}</div>}
            {saveMessage && !error && <div className="alert alert-success">{saveMessage}</div>}

            <form onSubmit={handleSubmit} className="document-form">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        placeholder="Enter document title"
                    />
                </div>

                <div className="form-group">
                    <label>Content</label>
                    <ReactQuill
                        theme="snow"
                        value={content}
                        onChange={setContent}
                        modules={modules}
                        formats={formats}
                        placeholder="Write your content here..."
                    />
                    <div className="editor-info">
                        <span>Words: {wordCount}</span>
                        <span>Characters: {charCount}</span>
                    </div>
                </div>

                <div className="form-footer">
                    <div className="save-status">
                        {saving ? 'Saving...' : saveMessage}
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={saving}
                    >
                        {saving ? 'Creating...' : 'Create Document'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DocumentForm;
