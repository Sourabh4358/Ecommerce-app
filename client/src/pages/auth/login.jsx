import CommanForm from "@/components/comman/form";
import { loginFormControls } from "@/components/config";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formdata, setFormdate] = useState(initialState);

    function onSubmit(){

    }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Sign in to your account
        </h1>
        <p className="mt-2">
          Don't have an account ? 
          <Link
            className="font-medium text-primary hover:underline"
            to="/auth/register"
          >
            Register
          </Link>
        </p>
      </div>
      <CommanForm formControls={loginFormControls}
        butttonText={'Sign In'}
      formData={formdata}
      setFormData={setFormdate}
      onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
