import { useState } from "react";
import { Link } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";

function Verify() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);

    setOtp(newOtp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("OTP:", otp.join(""));
  };

  return (
    <AuthLayout
      title="Verify your account"
      subtitle="Enter the verification code sent to your email or phone."
    >

      <form onSubmit={handleSubmit}>

        <div className="flex justify-between gap-2 mb-7">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="
                w-12
                h-14
                text-center
                text-xl
                font-semibold
                bg-slate-950
                border
                border-slate-700
                rounded-lg
                text-white
                outline-none
                focus:border-cyan-400
              "
            />
          ))}
        </div>

        <button
          type="submit"
          className="
            w-full
            py-3
            rounded-lg
            bg-cyan-500
            hover:bg-cyan-400
            text-slate-950
            font-semibold
            transition
          "
        >
          Verify Account
        </button>

      </form>

      <div className="text-center mt-6">

        <button className="text-sm text-cyan-400 hover:text-cyan-300">
          Resend code
        </button>

        <p className="text-sm text-slate-500 mt-4">
          <Link to="/login" className="hover:text-slate-300">
            Back to Login
          </Link>
        </p>

      </div>

    </AuthLayout>
  );
}

export default Verify;