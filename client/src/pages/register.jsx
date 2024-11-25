import React, { useState } from "react";
import Input from "../components/input";
import Toggler from "../components/toggler";
import Button from "../components/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import api from "../utils/api";
import { toast } from "react-toastify";

/*********************************************** */
const Register = () => {
  const [isSeller, setIsSeller] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // bir formdata örneği oluştur
    const formData = new FormData(e.target);

    // bütün inputlardaki verileri nesne haline getir
    const newUser = Object.fromEntries(formData.entries());

    // satıcı hesabı ise nesne içerisine bunu kaydet
    newUser.isSeller = isSeller;

    // context'den gelen kaydolma methodu
    api
      .post("/auth/register", newUser)
      .then((res) => {
        toast.success("Hesabınız başarıyla oluşturuuldu. Giriş yapabilirsinz.");
        navigate("/login");
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="max-w-[900px] mx-auto">
      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 md:gap-10 md:pt-24"
      >
        <div>
          <h1 className="text-xl md:text-2xl text-gray-500 font-bold mb-5">
            Yeni Hesap Oluştur
          </h1>
          <Input label="İsim" isReq={true} name="username" />
          <Input label="Email" isReq={true} name="email" />
          <Input label="Fotoğraf" isReq={true} name="photo" type="file" />
          <Input label="Ülke" isReq={true} name="country" />
          <Input label="Şifre" isReq={true} name="password" type="password" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl text-gray-500 font-bold mb-5">
            Satıcı Olmak İatiyorum
          </h1>
          <Toggler setIsSeller={setIsSeller} />
          <Input
            disabled={!isSeller}
            isReq={isSeller}
            label="Telefon"
            type="number"
            name="phone"
          />
          <Input
            disabled={!isSeller}
            isReq={isSeller}
            label="Açıklama"
            name="desc"
          />

          <Button text="Kaydol" />
          <p className="mt-5 text-gray-500">
            Hesabınız varmı mı?
            <Link className="ms-3 text-blue-500" to="/login">
              Giriş Yap
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
