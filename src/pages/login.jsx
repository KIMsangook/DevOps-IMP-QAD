import Header from "../components/Header";
import LoginCard from "../components/LoginCard";
import "../styles/login.css";

const Login = () => {
  return (
    // 전체 페이지 컨테이너
    <div className="login-page">
      <Header />
      <div className="login-container">
        <LoginCard />
      </div>
    </div>
  );
};

export default Login;
