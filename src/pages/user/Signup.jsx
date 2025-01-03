import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SignupService from "@/services/user/SignupService";
import useToastNotification from "@/hooks/useToastNotification";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slice/authSlice";

const SignupSchema = z
  .object({
    username: z.string().min(5, "Username must be at least 5 characters long"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirm_password: z.string(),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords must match",
    path: ["confirm_password"],
  });

export default function SignupPage() {
  const showToast = useToastNotification();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = async (data) => {
    try {
      const SignupData = {
        username: data.username,
        email: data.email,
        password: data.password,
        password2: data.confirm_password,
      };

      const response = await SignupService(SignupData);
      console.log("Signup successful:", response);
      showToast("Signup successful", "success");
      navigate("/user/login");
    } catch (error) {
      console.error("Signup failed:", error);

      const { response } = error;

      if (response) {
        if (response.data.username) {
          showToast(response.data.username[0], "error");
        } else if (response.data.email) {
          showToast(response.data.email[0], "error");
        } else {
          showToast("Signup failed. Please try again.", "error");
        }
      } else {
        showToast("Something went wrong. Please try again.", "error");
      }
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 shadow-md rounded-md">
        <h1 className="text-2xl font-bold text-center mb-6">Signup</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Username Field */}
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Enter your username"
              {...register("username")}
              className={`mt-2 ${errors.username ? "border-red-500" : ""}`}
            />
            {errors.username && (
              <p className="text-sm text-red-500 mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className={`mt-2 ${errors.email ? "border-rup serviceed-500" : ""}`}
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              className={`mt-2 ${errors.password ? "border-red-500" : ""}`}
            />
            {errors.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <Label htmlFor="confirm_password">Confirm Password</Label>
            <Input
              id="confirm_password"
              type="password"
              placeholder="Confirm your password"
              {...register("confirm_password")}
              className={`mt-2 ${errors.confirm_password ? "border-red-500" : ""}`}
            />
            {errors.confirm_password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.confirm_password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Signing up..." : "Signup"}
          </Button>
        </form>


        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <a
              href="/user/login"
              className="text-blue-500 hover:underline font-semibold"
            >
              Log In
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
