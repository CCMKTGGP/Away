"use client";

// Import necessary modules and hooks
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

// Define the UserType interface to specify the structure of user data
type UserType = {
  _id: string;          // Unique identifier for the user
  email: string;        // User's email address
  first_name: string;   // User's first name
  last_name: string;    // User's last name
  isPaidUser: boolean;  // Flag indicating if the user is a paid user
  __v: number;          // Version key for the user document (used by MongoDB)
};

// Define the UserContextType interface to specify the structure of the context
type UserContextType = {
  user: UserType | null;  // The current user object or null if not logged in
  setUser: (user: UserType | null) => void;  // Function to update the user object
};

// Create a context with an initial default value
const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

// Define the UserContextProvider component to provide user data to the component tree
export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();  // Get session data and status from next-auth
  const [user, setUser] = useState<UserType | null>(null);  // Initialize user state

  // useEffect hook to fetch user data from the API when the session is authenticated
  useEffect(() => {
    const fetchUserData = async (email: string) => {
      try {
        const response = await axios.post("/api/get-user", { email });
        if (response.status === 200) {
          setUser(response.data);  // Set the user data in the state
        }
      } catch (error) {
        console.error("Error fetching user data:", error);  // Log any errors encountered
      }
    };

    // If the user is authenticated and has an email, fetch the user data
    if (status === "authenticated" && session?.user?.email) {
      fetchUserData(session.user.email);
    }
  }, [session, status]);

  // Provide the user data and setter function to the rest of the app via context
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the UserContext in any component
export function useUserContext() {
  return useContext(UserContext);
}
