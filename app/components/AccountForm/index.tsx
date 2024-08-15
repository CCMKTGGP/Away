'use client';

// Import necessary modules and components
import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import Button from "../Button";

const Form = () => {
  // State variables to manage form fields and error messages
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  // Retrieve session information using next-auth's useSession hook
  const { data: session, status } = useSession();
  const router = useRouter();

  // useEffect hook to fetch user data based on session status and email
  useEffect(() => {
    const fetchUser = async (email: string) => {
      try {
        // Make an API request to fetch user data based on the provided email
        const response = await fetch('/api/get-user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });
        
        const data = await response.json();

        // If the request is successful, update state with the user's data
        if (response.ok) {
          setFirstName(data.first_name);
          setLastName(data.last_name);
          setEmail(data.email);
          setError('');
        } else {
          // If the request fails, set an error message
          setError(data.error);
        }
      } catch (err) {
        // Log the error and set a generic error message
        console.error('Error fetching user data:', err);
        setError('Failed to load user data.');
      }
    };

    // Trigger the fetchUser function if the user is authenticated and has an email
    if (status === 'authenticated' && session?.user?.email) {
      fetchUser(session.user.email);
    }
  }, [status, session]);

  return (
    <form className="bg-white p-14 rounded-xl shadow-xl w-full max-w-xl">
      {/* Display error message if it exists */}
      {error && <div className="text-red-700 mb-4">{error}</div>}
      
      <div className="mb-4 flex space-x-10">
        <div className="w-1/2">
          {/* First Name Input Field */}
          <label className="block mb-2">First Name</label>
          <input
            type="text"
            value={firstName}
            readOnly
            className="w-full px-3 py-2 border border-black rounded-xl focus:outline-none focus:ring-2 focus:ring-accent bg-gradientColor1 text-black font-medium"
          />
        </div>
        <div className="w-1/2">
          {/* Last Name Input Field */}
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
        {/* Email Input Field */}
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
