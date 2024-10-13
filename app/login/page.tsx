"use client";
import Button from "@/lib/ui/components/base/Button";
import Checkbox from "@/lib/ui/components/base/Checkbox";
import Input from "@/lib/ui/components/base/Input";
import NextImage from "@/lib/ui/components/common/nextImage";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

const LoginPage: React.FC = () => {
  const { status } = useSession();
  const { handleSubmit, register } = useForm<
    FieldValues,
    string,
    FieldValues
  >();
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const isAuthenticated: boolean = status === "authenticated"; // eslint-disable-line
  const router = useRouter();

  const submitHandler = handleSubmit(({ email, password }): void => {
    void (async () => {
      try {
        if (isChecked) {
          await signIn("credentials", {
            email,
            password,
            callbackUrl: "http://localhost:3000/dashboard/",
          });
        } else {
          // eslint-disable-next-line no-alert
          alert("Handle me"); // TODO: Add real handler for this
        }
      } catch (error) {
        console.error("Error logging in!", error);
        router.push("/login/");
      }
    })();
  });

  const oAuthHandler = (provider: string): void => {
    void (async () => {
      try {
        await signIn(provider, {
          callbackUrl: "http://localhost:3000/dashboard/",
        });
      } catch (error) {
        console.error("Error signing in!", error);
        router.push("/login/");
      }
    })();
  };
  const checkboxHandler = (): void => {
    setIsChecked(!isChecked);
  };
  return (
    <section className="login">
      <div className="login_wrapper">
        <header className="login_header">
          <h1>Login</h1>
          <div className="login_logo">
            <Link href="/">
              <NextImage
                src="/logos/logo.svg"
                width={100}
                height={85}
                alt="Noted"
              />
            </Link>
          </div>
        </header>
        <form className="login_form" onSubmit={submitHandler}>
          <div className="login_form_row">
            <Input
              type="email"
              className="login_input"
              id="email"
              label_text="Email Address"
              register={register}
              validationSchema={{
                required: "Email address is required",
                minLength: {
                  value: 3,
                  message: "Please enter a valid email address",
                },
              }}
            />
          </div>
          <div className="login_form_row">
            <Input
              type="password"
              className="login_input"
              id="password"
              label_text="Password"
              register={register}
              validationSchema={{
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Please enter a valid password",
                },
              }}
            />
          </div>
          <div className="checkbox_row">
            <Checkbox
              id="remember_me"
              name="remember_me"
              labelText="Remember me"
              changeHandler={checkboxHandler}
              checked={isChecked}
            />
          </div>
          <Button className="login_button" onClick={submitHandler}>
            Log in
          </Button>
        </form>
        <div className="login_oauth_buttons">
          <p className="continue_with">Or continue with</p>
          <div className="oauth_button_group">
            <Button
              className="google_oauth_button"
              btnText="Google"
              onClick={() => oAuthHandler("google")}
              mask
            >
              <NextImage
                src="/icons/google.svg"
                width={20}
                height={20}
                alt="Sign in with Google"
              />
            </Button>
            <Button
              className="github_oauth_button"
              btnText="Github"
              onClick={() => oAuthHandler("github")}
              mask
            >
              <NextImage
                src="/icons/github.svg"
                width={20}
                height={20}
                alt="Sign in with Github"
              />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
