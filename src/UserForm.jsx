import React, { useState } from 'react'
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const UserForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [image, setImage] = useState(null);
    const [document, setDocument] = useState(null);
    const [subjectNames, setSubjectNames] = useState(['']);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleDocumentChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setDocument(file);
        }
    };

    const handleInputChange = (index, value) => {
        const newsubjectNames = [...subjectNames];
        newsubjectNames[index] = value;
        setSubjectNames(newsubjectNames);
    };

    const handleAddInput = () => {
        setSubjectNames([...subjectNames, '']);
    };

    const removeInputValue = (value) => {
        const values = subjectNames.filter((subject) => subject !== value);
        setSubjectNames(values);
    };

    const handleSubmitData = async () => {
        const requestData = {
            name: name,
            email: email,
            phone: phone,
            image: image,
            document: document.name,
            subjects: subjectNames,
        };

        try {
            const response = await axios.post('http://localhost/api/user/', requestData);
            setName('');
            setEmail('');
            setPhone('')
            setImage('');
            setDocument('');
            setSubjectNames(['']);
            if (response.status === 200) {
                toast.success('User Registered Successfully !', {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            }
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div className='UserForm'>
            <h1>User Registration</h1>
            <div>
                <label>Name</label>
                <input type='text' name='name' value={name} onChange={(e) => { setName(e.target.value) }} />
            </div>
            <div>
                <label>Email</label>
                <input type='email' name='email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
            </div>
            <div>
                <label>Phone Number</label>
                <input type='number' name='phone' value={phone} onChange={(e) => { setPhone(e.target.value) }} />
            </div>
            <div>
                <label>Upload Image</label>
                <input type='file' accept='image/*' name='image' onChange={handleImageChange} />
            </div>
            {image && (
                <div className="image-preview">
                    <img src={image} alt='Preview' style={{ maxWidth: '100%' }} />
                    <span className="remove-button" onClick={() => { setImage(null) }}>X</span>
                </div>
            )}
            <div>
                <label>Upload Document</label>
                <input type='file' accept='.pdf,.doc,.docx' name='document' onChange={handleDocumentChange} />
            </div>
            {document && (
                <div className="document-preview">
                    <p>{document.name}</p>
                    <span className="remove-button" onClick={() => setDocument(null)}>X</span>
                </div>
            )}
            <div>
                <label>Add Subject's Name</label>
                {subjectNames.map((value, index) => (
                    <div key={index} className='FormDiv'>
                        <input
                            type="text"
                            value={value}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                        {subjectNames.length > 1 ?
                            <span className="remove-button" onClick={() => removeInputValue(value)}>X</span>
                            : null}
                    </div>
                ))}
                <button onClick={handleAddInput}>Add Input</button>
            </div>
            <button onClick={handleSubmitData}>Submit</button>
            <ToastContainer />
        </div>

    )
}

export default UserForm