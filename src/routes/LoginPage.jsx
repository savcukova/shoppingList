import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    const success = login(email, password);
    if (success) {
      navigate("/");
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-md mx-auto">
      <p className="text-xl sm:text-2xl font-bold">Login</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="form-control w-full">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full text-sm sm:text-base"
            placeholder="Email"
            autoFocus
          />
        </div>

        <div className="form-control w-full">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full text-sm sm:text-base"
            placeholder="Password"
          />
        </div>

        <div className="pt-2 space-y-2">
          <button
            type="submit"
            className="btn btn-primary btn-sm sm:btn-md w-full"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
