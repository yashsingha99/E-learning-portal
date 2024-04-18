import React, { useState } from 'react';
import axios from 'axios';
//  re_a9JY7a6r_3bwCbufPvQezoqcVD1mkbFHs
const EmailForm = () => {
    const [to, setTo] = useState('');
    const [subject, setSubject] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/send-email', { to, subject, text });
            alert('Email sent successfully');
        } catch (error) {
            console.error('Error sending email:', error);
            alert('Error sending email');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} required />
            <input type="text" placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
            <textarea placeholder="Message" value={text} onChange={(e) => setText(e.target.value)} required />
            <button type="submit">Send Email</button>
        </form>
    );
};

export default EmailForm;