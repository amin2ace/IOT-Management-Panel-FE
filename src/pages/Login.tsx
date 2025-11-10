import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import { useAuthStore } from '../store/authStore';

export default function Login() {
  const navigate = useNavigate();
  const setUser = useAuthStore((s) => s.setUser);

  const mutation = useMutation((data: { username: string; password: string }) => authApi.login(data), {
    onSuccess: (res) => {
      setUser(res.data.user);
      navigate('/');
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-8 bg-white/5 rounded-2xl backdrop-blur-sm">
        <h1 className="text-2xl mb-4">Login</h1>
        <form onSubmit={(e) => { e.preventDefault(); const fd = new FormData(e.currentTarget); mutation.mutate({ username: String(fd.get('username')), password: String(fd.get('password')) }); }}>
          <input name="username" placeholder="username" className="w-full p-2 mb-3 rounded bg-black/20" />
          <input name="password" type="password" placeholder="password" className="w-full p-2 mb-3 rounded bg-black/20" />
          <button className="w-full py-2 rounded bg-primary-500">Login</button>
        </form>
      </div>
    </div>
  );
}
