'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import Button from "../Button";

const Form = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async (email: string) => {
      try {
        const response = await fetch('/api/get-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        const data = await response.json();
        if (response.ok) {
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setEmail(data.email);
          setError('');
        } else {
          setError(data.error);
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load user data.');
      }
    };

    if (status === 'authenticated' && session?.user?.email) {
      fetchUser(session.user.email);
    }
  }, [status, session]);

  return (
    <form className="bg-white p-14 rounded-xl shadow-xl w-full max-w-xl">
      {error && <div className="text-red-700 mb-4">{error}</div>}
      <div className="mb-4 flex space-x-10">
        <div className="w-1/2">
          <label className="block mb-2">First Name</label>
          <input
            type="text"
            value={firstName}
            readOnly
            className="w-full px-3 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-gradientColor1 text-black font-medium"
          />
        </div>
        <div className="w-1/2">
          <label className="block mb-2">Last Name</label>
          <input
            type="text"
            value={lastName}
            readOnly
            className="w-full px-3 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-gradientColor1 text-black font-medium"
          />
        </div>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={email}
          readOnly
          className="w-full px-3 py-2 mb-8 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-gradientColor1 text-black font-medium"
        />
      </div>
    </form>
  );
};

export default Form;
