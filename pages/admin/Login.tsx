import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock } from 'lucide-react';

const Login = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(password)) {
      navigate('/admin');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-neutral-200/50 p-10 border border-neutral-100">
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-neutral-900 rounded-xl flex items-center justify-center mx-auto mb-6 text-white">
            <Lock size={20} />
          </div>
          <h1 className="text-2xl font-semibold text-neutral-900 mb-2">Admin Access</h1>
          <p className="text-neutral-500">Enter your secure key to continue.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-900 uppercase tracking-widest">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-3 focus:border-neutral-900 focus:ring-0 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <button 
            type="submit" 
            className="w-full bg-neutral-900 text-white font-medium py-3 rounded-xl hover:bg-neutral-800 transition-all shadow-lg shadow-neutral-900/10 active:scale-[0.98]"
          >
            Authenticate
          </button>
        </form>
        
        <div className="mt-8 text-center">
            <p className="text-xs text-neutral-400">Restricted Area. Unauthorized access is prohibited.</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
