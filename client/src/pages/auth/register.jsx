import CommanForm from "@/components/comman/form";
import { registerFormControls } from "@/components/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const initialState = {
  username: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  /*   function onSubmit(event) {
    event.preventDefault();

    dispatch(registerUser(formData))
      .unwrap() // ✅ makes it return a real promise
      .then((data) => {
        console.log("Registration success:", data);
        if (data?.payload?.success) {
                toast.success(data.message || "Registration successful!", {
        description: "Welcome aboard 🎉",
      });
        } else {
          toast.success({ title: data?.payload?.message });
        }

        navigate("/auth/login");
      })
      .catch((error) => {
        toast.error("Registration failed", {
          description: "Please try again later.",
        });

        console.error("Registration failed:", error);
      });
  } */

  /* function onSubmit(event) {
    event.preventDefault();

    dispatch(registerUser(formData))
      .unwrap()
      .then((data) => {
        console.log("Registration success:", data);

        if (data?.success) {
          // Show success toast
          toast.success(data?.message || "Registration successful!", {
            description: "Welcome aboard 🎉",
          });
          navigate("/auth/login");
        } else {
          // Show error toast
          toast.error(data?.message || "Registration failed", {
            description: "Please try again later.",
            variant: "destructive",
          });
        }
      })
      .catch((error) => {
        console.error("Registration failed:", error);
        toast.error("Registration failed", {
          description: error?.message || "Please try again later.",
        });
      });
  } */
 function onSubmit(event) {
  event.preventDefault();

  dispatch(registerUser(formData))
    .unwrap()
    .then((data) => {
      console.log("Registration success:", data);

      if (data?.success) {
        toast.success(data?.message || "Registration successful!", {
          description: "Welcome aboard 🎉",
        });
        navigate("/auth/login");
      } else if (
        data?.message?.toLowerCase().includes("already exists") ||
        data?.message?.toLowerCase().includes("email")
      ) {
        toast.error("User already exists", {
          description: "Please use a different email or try logging in.",
          variant: "destructive",
        });
      } else {
        toast.error(data?.message || "Registration failed", {
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    })
    .catch((error) => {
      console.error("Registration failed:", error);

      const message =
        error?.message?.toLowerCase().includes("exists") ||
        error?.response?.data?.message?.toLowerCase().includes("exists")
          ? "User already exists"
          : "Registration failed";

      toast.error(message, {
        description:
          error?.response?.data?.message || error?.message || "Please try again later.",
        variant: "destructive",
      });
    });
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
      <CommanForm
        formControls={registerFormControls}
        butttonText={"Sign up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthRegister;
