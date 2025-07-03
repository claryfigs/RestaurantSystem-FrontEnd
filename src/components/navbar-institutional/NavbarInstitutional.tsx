import React from "react";
import "./NavbarInstitutional.css";

const NavbarInstitutional: React.FC = () => {
  return (
    <nav className="navbar-institutional">
      <div className="navbar-institutional-title">Tô Brocado</div>
      <div className="navbar-institutional-links">
        <a href="#" className="navbar-institutional-link">
          Login
        </a>
        <a href="#" className="navbar-institutional-link">
          Cadastro
        </a>
        <a href="#" className="navbar-institutional-link">
          Ajuda
        </a>
      </div>
    </nav>
  );
};

export default NavbarInstitutional;
