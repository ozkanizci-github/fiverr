import React from "react";

const Input = ({ label, name, placeholder, disabled, type = "text", isReq = false }) => {
  return (
    <div className="mb-5">
      <label className="mb:2 text-sm font-medium text-gray-900">{label}</label>
      <input
        className="bg-grau-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 placeholder-gray-400 text-dark disabled:bg-gray-200 focus:border-blue500"
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        name={name}
        required={isReq}
      ></input>
    </div>
  );
};

export default Input;
