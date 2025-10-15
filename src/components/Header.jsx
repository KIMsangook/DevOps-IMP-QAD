import "../styles/Header.css";
import logo from "../assets/QadLogo.png";

export default function Header() {
  return (
    <header className="header">
      <div className="header-logo">
        <img src={logo} alt="logo" className="header-img" />
      </div>
    </header>
  );
}
