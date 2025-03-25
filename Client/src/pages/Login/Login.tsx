import React, { useState } from 'react';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FBF3DF]">
      <div className="flex justify-between items-start mt-0">
        <img
          src="/assets/images/signup-hippo.svg"
          alt="Hippo"
          className="w-28 transform rotate-90 ml-0 mt-6"
        />
        <img
          src="/assets/images/signup-hippo.svg"
          alt="Hippo"
          className="w-20 -scale-y-100 mr-6 pop-off-top"
        />
      </div>
      <div className="flex flex-col flex-grow justify-center items-center w-full">
        <div className="w-full max-w-md px-8 flex flex-col">
          <h2 className="text-7xl font-bold text-[#808080] text-center mb-6">
            Milim
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-4 items-center text-center"
          >
            <input
              type="username"
              className="w-72 px-4 py-2 mt-1 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              type="password"
              className="w-72 px-4 py-2 mt-1 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-72 text-xl bg-[#808080] text-white py-2 rounded-full font-bold hover:bg-blue-600 transition"
            >
              GO
            </button>
          </form>

          {/* Register Link */}
          <p className="text-center text-gray-600 mt-4">
            Don't have an account yet?{' '}
            <a
              href="/register"
              className="text-black-500 text-sm font-bold hover:underline"
            >
              sign up
            </a>
          </p>
        </div>
      </div>

      <div className="flex justify-center">
        <img
          src="/assets/images/signup-hippo.svg"
          alt="Hippo"
          className="w-44"
        />
      </div>
    </div>
  );
};

export default Login;
