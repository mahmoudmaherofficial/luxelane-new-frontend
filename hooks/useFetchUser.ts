"use client"
import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import api from '@/lib/axiosInterseptor';

// Define the shape of the user data (adjust based on your API response)
interface User {
  id: string;
  username: string;
  email: string;
  imageUrl?: string; // Optional, assuming the user might have an uploaded image
}

// Define the hook's return type
interface FetchUserResult {
  user: User | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

const useFetchUser = (): FetchUserResult => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user data
  const fetchUser = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get<User>('/account',{
        headers:{
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Cookies.get('accessToken')}`,
        }
      });
      setUser(response.data);
    } catch (err) {
      const error = err as AxiosError;
      setError('Failed to fetch user data');
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch data on mount
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return { user, loading, error, refetch: fetchUser };
};

export default useFetchUser;