import "./_loginLayout.scss";

const LoginLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="login-layout">{children}</div>;
};

export default LoginLayout;
