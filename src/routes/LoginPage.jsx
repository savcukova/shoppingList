import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import { useLanguage } from "../contexts/LanguageContext.jsx";

function LoginPage() {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isRegister) {
      if (!email || !password || !name) {
        alert(t("pleaseEnterEmailPasswordName"));
        return;
      }

      const success = await register(email, password, name);
      if (success) {
        navigate("/");
      }
    } else {
      if (!email || !password) {
        alert(t("pleaseEnterEmailPassword"));
        return;
      }

      const success = await login(email, password);
      if (success) {
        navigate("/");
      }
    }
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 space-y-6 max-w-md mx-auto">
      <p className="text-xl sm:text-2xl font-bold">
        {isRegister ? t("register") : t("login")}
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {isRegister && (
          <div className="form-control w-full">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input input-bordered w-full text-sm sm:text-base"
              placeholder={t("name")}
              autoFocus
            />
          </div>
        )}

        <div className="form-control w-full">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input input-bordered w-full text-sm sm:text-base"
            placeholder={t("email")}
            autoFocus={!isRegister}
          />
        </div>

        <div className="form-control w-full">
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered w-full text-sm sm:text-base"
            placeholder={t("password")}
          />
        </div>

        <div className="pt-2 space-y-2">
          <button
            type="submit"
            className="btn btn-primary btn-sm sm:btn-md w-full"
          >
            {isRegister ? t("register") : t("login")}
          </button>

          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setEmail("");
              setPassword("");
              setName("");
            }}
            className="btn btn-ghost btn-sm sm:btn-md w-full"
          >
            {isRegister
              ? t("alreadyHaveAccount")
              : t("dontHaveAccount")}
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
