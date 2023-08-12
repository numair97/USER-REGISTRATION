import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UpdateUserInfo from './UpdateUserInfo';
import UserForm from './UserForm';
import ShowUserInfo from './ShowUserInfo';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={'/'} element={<UserForm />} />
        <Route path={'/updateUserInfo/:id'} element={<UpdateUserInfo />} />
        <Route path={'/userInfo/:id'} element={<ShowUserInfo />} />
      </Routes>
    </Router>
  );
};

export default App;
