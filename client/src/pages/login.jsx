import React from "react";
import { Link } from "react-router-dom";
import Input from "../components/input";
import Button from "../components/button";

const Login = () => {
  const handleSubmit = (e) =>{
    e.preventDefault();

    const formData  = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());
    console.log(user)
  };
  return (
    <div className="pt-24 max-w-[700px]  max-auto sm:min-w-[400px] max-sm:w-full">
      <h1 className="text-xl md:text-2xl font-bold mb-10 text-gray-500">
        Hesabınıza Giriş Yapın
      </h1>

      <form onSubmit={handleSubmit}>
        <Input label="İsim" name="username" isReq={true} />
        <Input label="Şifre" name="password" isReq={true} />

        <Button text="Giriş Yap" />
      </form>
      <p className="mt-5 text-gray-500">
        Hesabınız yok mı?{" "}
        <Link className="ms-3 text-blue-500" to="/register">
          Kaydol
        </Link>
      </p>
    </div>
  );
};

export default Login;
