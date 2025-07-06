import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Função para converter arquivo em base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (senha !== confirmarSenha) {
      setError("As senhas não coincidem.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", senha);
      formData.append("password2", confirmarSenha);
      formData.append("first_name", nome.split(" ")[0] || nome);
      formData.append("last_name", nome.split(" ").slice(1).join(" ") || "");
      formData.append("phone_number", telefone);
      formData.append("enrollment_id", matricula);
      if (profileImageFile) {
        formData.append("profile_image", profileImageFile);
      }
      const response = await fetch("http://localhost:8000/api/v1/customers/", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        let data;
        try {
          data = await response.json();
        } catch (jsonError) {
          throw new Error(
            `Erro HTTP ${response.status}: resposta não é JSON válido`
          );
        }
        // Se vier detail ou error, prioriza, senão monta lista de erros por campo
        let message = data.detail || data.error;
        if (!message && typeof data === "object" && data !== null) {
          // Junta todas as mensagens de erro dos campos
          message = Object.entries(data)
            .map(([campo, msgs]) => {
              if (Array.isArray(msgs)) {
                return `${campo}: ${msgs.join("; ")}`;
              } else if (typeof msgs === "string") {
                return `${campo}: ${msgs}`;
              } else {
                return `${campo}: erro desconhecido`;
              }
            })
            .join(" | ");
        }
        if (!message) message = `Erro HTTP ${response.status}`;
        throw new Error(message);
      }
      navigate("/login-cliente");
      window.alert(
        "Usuário registrado com sucesso! Faça login para continuar."
      );
    } catch (err: any) {
      setError(err.message || "Erro desconhecido ao cadastrar.");
    }
  };

  return (
    <div className="cadastro-bg">
      <NavbarInstitutional leftTitle="Cadastro de Cliente" />
      <div className="cadastro-container">
        <h1 className="cadastro-title">Cadastro Cliente</h1>
        <div className="cadastro-content">
          <div className="cadastro-img-box">
            <img src={mobileLogin} alt="Cadastro" className="cadastro-img" />
          </div>
          <form className="cadastro-form" onSubmit={handleSubmit}>
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
                placeholder="+5585912345678"
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
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="********"
              />
            </label>
            <label>
              Confirmação de senha::
              <InputDefault
                type="password"
                value={confirmarSenha}
                onChange={(e) => setConfirmarSenha(e.target.value)}
                placeholder="********"
              />
            </label>
            <label>
              Foto de perfil (opcional):
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setProfileImageFile(e.target.files[0]);
                  } else {
                    setProfileImageFile(null);
                  }
                }}
                style={{ marginTop: 4, marginBottom: 8 }}
              />
            </label>
            {error && <p className="login-error">{error}</p>}
            <Button label="Cadastrar-se" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default CadastroCliente;
