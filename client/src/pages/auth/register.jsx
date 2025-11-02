import CommanForm from "@/components/comman/form";
import { registerFormControls } from "@/components/config";
import { useState } from "react";
import { Link } from "react-router-dom";

const initialState = {
  username: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formdata, setFormdate] = useState(initialState);

    function onSubmit(){

    }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create new Account
        </h1>
        <p className="mt-2">
          Already have an account?{" "}
          <Link
            className="font-medium text-primary hover:underline"
            to="/auth/login"
          >
            Login
          </Link>
        </p>
      </div>
      <CommanForm formControls={registerFormControls}
        butttonText={'Sign up'}
      formData={formdata}
      setFormData={setFormdate}
      onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
