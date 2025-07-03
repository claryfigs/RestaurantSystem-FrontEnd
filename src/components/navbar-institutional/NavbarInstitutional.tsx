import React from "react";
import "./NavbarInstitutional.css";
import { Link } from "react-router-dom";

interface NavbarInstitutionalProps {
  leftTitle?: string;
}

const NavbarInstitutional: React.FC<NavbarInstitutionalProps> = ({
  leftTitle,
}) => {
  return (
    <nav className="navbar-institutional">
      {leftTitle && (
        <div className="navbar-institutional-left-title">{leftTitle}</div>
      )}
      <div className="navbar-institutional-title">Tô Brocado</div>
      <div className="navbar-institutional-links">
        <Link to="/" className="navbar-institutional-link">
          Página Inicial
        </Link>
        <Link to="/login" className="navbar-institutional-link">
          Login
        </Link>
        <Link to="/ajuda" className="navbar-institutional-link">
          Ajuda
        </Link>
      </div>
    </nav>
  );
};

export default NavbarInstitutional;
