import Input from "../components/input.jsx";
import Button from "../components/Button.jsx";
import "../styles/logincard.css";
import "../styles/Input.css";
import { useState } from "react";

const Login = () => {
  // username 상태 선언: 초기값은 빈 문자열
  const [username, setUsername] = useState("");
  // password 상태 선언: 초기값은 빈 문자열
  const [password, setPassword] = useState("");

  // 폼 제출 또는 버튼 클릭 시 호출되는 함수
  const handleLogin = (e) => {
    e.preventDefault(); // 기본 폼 제출 동작(페이지 새로고침)을 막음
    // 실제로는 여기서 API 호출(예: axios.post('/api/login', { username, password })) 수행
    console.log("로그인 시도:", username, password); // 개발 중 로그 출력
  };

  return (
    <div className="login">
      <h2 className="login-title">Sign In</h2>

      <form onSubmit={handleLogin} className="login-form">
        {/* 사용자명 입력: Input 컴포넌트에 value와 onChange 전달 */}
        ID
        <Input
          placeholder="Username or Email" // 플레이스홀더
          value={username} // 현재 상태값 바인딩
          onChange={(e) => setUsername(e.target.value)} // 입력 변경 시 상태 업데이트
        />
        {/* 비밀번호 입력: type="password"로 마스킹 처리 */}
        PW
        <Input
          type="password" // 비밀번호 입력 타입
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // 입력 변경 시 상태 업데이트
        />
        {/* 제출 버튼: type="submit"으로 폼 제출 트리거 */}
        <Button text="Sign In" type="submit" />
      </form>
    </div>
  );
};

export default Login;
