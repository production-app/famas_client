"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button, Input } from "antd";
import work from "../images/work.jpg";
import LoginLayout from "@/components/Layouts/LoginLayout/LoginLayout";
import { useRouter } from "next/navigation";
import Link from "next/link";

import "./_login.scss";

const Login: React.FC = () => {
  //const [displayPassword, setDisplayPassword] = useState(false);
  // const navigate = useNavigate();
  const router = useRouter();

  return (
    <LoginLayout>
      <div className="login">
        <div className="login-image-wrapper">
          {/* <Logo className="login-logo" /> */}
          <div className="login-image-container">
            <Image src={work} alt="sign-in illustration" />
          </div>
        </div>
        <div className="login-form">
          <div className="login-form-caption">
            <h1>Welcome to FAMAS APP.</h1>
            <p>Enter details to login.</p>
          </div>
          <div className="login-form-container">
            <form>
              <div>
                <Input
                  placeholder="Email"
                  //  border="lg"
                  type="email"
                />
              </div>
              <div style={{ margin: "1.5rem 0" }}>
                {/* <Input
                  placeholder="Password"
                 // border="lg"
                 // type={displayPassword ? "text" : "password"}
                  icon={
                    <Button
                    //  variant="naked"
                      className="password-input-icon"
                     // onClick={() => setDisplayPassword(!displayPassword)}
                    >
                      show
                    </Button>
                  }
                /> */}
              </div>
              {/* <Button
                // variant="naked"
                className="forgot-password-button"
                onClick={(e) => {
                  return router.push("/");
                }}
              >
                FORGOT PASSWORD?
              </Button> */}
              <Button
                type="primary"
                //  size="lg"
                // onClick={() => navigate("/dashboard")}
                onClick={(e) => {
                  return router.push("/dashboard");
                }}
              >
                log in
              </Button>
            </form>
          </div>
        </div>
      </div>
    </LoginLayout>
  );
};

export default Login;
