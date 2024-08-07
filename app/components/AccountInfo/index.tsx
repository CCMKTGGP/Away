'use client';

import React, { useState } from 'react';
import Button from '../Button/index';


const Form = () => {
  const [firstName, setFirstName] = useState('Jhon');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('jhondoe@gmail.com');

  const handleUpdate = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    alert('Form submitted');
  };

  const handleCancel = () => {
    // Reset form or perform cancel action
  };

  return (
    <form className="bg-white p-14 rounded-xl shadow-xl w-full max-w-xl" onSubmit={handleUpdate}>
      <div className="mb-4 flex space-x-10">
        <div className="w-1/2">
          <label className="block mb-2">First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="w-full px-3 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-gradientColor1 text-black font-medium"
          />
        </div>
        <div className="w-1/2">
          <label className="block mb-2">Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full px-3 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-gradientColor1 text-black font-medium"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 mb-8 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-gradientColor1 text-black font-medium"
        />
      </div>
      <div className="flex justify-start">
        <Button buttonText={'Cancel'} buttonClassName={'bg-gradientColor1 text-accent py-2 px-4 rounded mr-2 drop-shadow-lg'} onClick={handleCancel} />
        <Button buttonText={'Update'} buttonClassName={'bg-accent text-white py-2 px-4 rounded mr-2 drop-shadow-lg'} onClick={function (): void {
          throw new Error('Function not implemented.');
        }} />
      </div>
    </form>
  );
};

export default Form;
