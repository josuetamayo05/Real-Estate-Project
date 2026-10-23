import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function AdminLogin() {
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Clave de acceso rápida (puedes cambiarla aquí o usar Firebase Auth)
    if (password === 'marianne2025' || password === 'admin') {
      localStorage.setItem('marianne_admin_auth', 'true');
      navigate('/admin/dashboard');
    } else {
      alert('Contraseña incorrecta');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-2xl space-y-6">
        <div className="text-center">
          <div className="w-12 h-12 border border-[#C9A961] flex items-center justify-center rounded mx-auto mb-3">
            <span className="font-serif text-2xl font-bold text-[#C9A961]">M</span>
          </div>
          <h1 className="font-serif text-xl font-bold text-gray-900">Portal Administrativo</h1>
          <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Marianne Houses</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-700 mb-1">Contraseña de acceso</label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full h-11 px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#C9A961]"
            />
          </div>

          <button
            type="submit"
            className="w-full h-11 bg-gradient-to-r from-[#D4AF37] to-[#C9A961] text-black font-extrabold text-xs uppercase tracking-wider rounded-lg shadow"
          >
            INGRESAR AL PANEL
          </button>
        </form>
      </div>
    </div>
  );
}