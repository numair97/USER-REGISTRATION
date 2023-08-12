import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './App.css';

const ShowUserInfo = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    fetchUserData();
    // eslint-disable-next-line
  }, [id]);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost/api/user/${id}`);
      setUserData(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='UserForm'>
      <h1>User Registration</h1>
      <div>
        <label>Name : {userData.name}</label>

      </div>
      <div>
        <label>Email : {userData.email}</label>
      </div>
      <div>
        <label>Phone Number: {userData.phone}</label>
      </div>
      <div>
        <label>Image</label>
        <img src={userData.image} alt='Preview' style={{ maxWidth: '100%' }} />
      </div>
      <div>
        <label>Document: {userData.document}</label>
      </div>
      <div>
        <label>Subject's Name</label>
        <ul>
          {JSON.parse(userData.subjects).map((value, index) => (
            <li key={index}>{value}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default ShowUserInfo