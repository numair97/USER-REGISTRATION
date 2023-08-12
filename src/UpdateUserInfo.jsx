import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './updateUser.css';


const UpdateUserInfo = () => {
  const { id } = useParams();
  const [subjects, setSubjects] = useState([]);
  const [document, setDocument] = useState(null);

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line
  }, [id]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost/api/user/${id}`);
      const userData = response.data.user;
      setSubjects(JSON.parse(userData.subjects));
      setDocument(userData.document);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    const updatedData = {
      subjects: subjects,
      document: document,
    };

    try {
      const response = await axios.put(`http://localhost/api/user/${id}`, updatedData);
      console.log('Update successful:', response.data);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  return (
    <div className="container">
      <h1>Update User Information</h1>
      {subjects?.map((subject, index) => (
        <div className="input-group" key={index}>
          <input
            type="text"
            value={subject}
            onChange={(e) => {
              const updatedSubjects = [...subjects];
              updatedSubjects[index] = e.target.value;
              setSubjects(updatedSubjects);
            }}
          />
        </div>
      ))}
      {document && <p>{document}</p>}
      <div className="input-group">
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) =>setDocument(e.target.files[0].name)}
        />
      </div>
      <div className="button-group">
        <button onClick={handleUpdate}>Update</button>
      </div>
    </div>
  )
};

export default UpdateUserInfo;
