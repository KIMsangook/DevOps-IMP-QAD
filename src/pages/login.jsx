 
import Input from '../components/input.jsx'
import Button from '../components/Button.jsx'
import '../styles/login.css'
import '../styles/Input.css'
import '../styles/Button.css'
import logo from '../assets/Qadlogo.png'

const Login = () => {
  return (
    <div className="login">
 <div className="login-container">  

    <div className="logo-box">
        <img src={logo} alt="logo" />
    </div> 


     <div className="form-box">
     <h4>ID</h4>
      <Input
        type="text"
        placeholder="아이디"
        className="id"
       />


    <h4>Password</h4>
   <Input
      type="password"
      placeholder="비밀번호"
      className="pw"
    />

    <Button 
      className="login-button"
    />
    </div>
    </div>
    </div>
    )
}

export default Login