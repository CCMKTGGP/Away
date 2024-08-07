"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

type UserType = {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  isPaidUser: boolean;
  __v: number;
};

type UserContextType = {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

export function UserContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const fetchUserData = async (email: string) => {
      try {
        const response = await axios.post("/api/get-user", { email });
        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (status === "authenticated" && session?.user?.email) {
      fetchUserData(session.user.email);
    }
  }, [session, status]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}