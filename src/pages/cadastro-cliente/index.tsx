import React, { useState } from "react";
import "./style.css";
import NavbarInstitutional from "../../components/navbar-institutional";
import InputDefault from "../../components/input-default/input-default";
import Button from "../../components/Button/Button";
import mobileLogin from "../../assets/mobile-login.png";

const CadastroCliente: React.FC = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [matricula, setMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  return (
    <div className="cadastro-bg">
      <NavbarInstitutional leftTitle="Cadastro de Cliente" />
      <div className="cadastro-container">
        <h1 className="cadastro-title">Cadastro Cliente</h1>
        <div className="cadastro-content">
          <div className="cadastro-img-box">
            <img src={mobileLogin} alt="Cadastro" className="cadastro-img" />
          </div>
          <form className="cadastro-form">
            <label>
              Nome:
              <InputDefault
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Fulano de Tal"
              />
            </label>
            <label>
              Email institucional:
              <InputDefault
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aluno@aluno.uece.br"
              />
            </label>
            <label>
              Telefone:
              <InputDefault
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="+55 85 912345678"
              />
            </label>
            <label>
              Matrícula:
              <InputDefault
                value={matricula}
                onChange={(e) => setMatricula(e.target.value)}
                placeholder="12345678"
              />
            </label>
            <label>
              Senha:
              <InputDefault
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="********"
              />
            </label>
            <label>
              Confirmação de senha::
              <InputDefault
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="********"
              />
            </label>
            <Button label="Cadastrar-se" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastroCliente;
