import React, { useState } from "react";

interface LoginFormProps {
  onLogin: (username: string, password: string) => void;
  onRegister: (username: string, email: string, password: string) => void;
  loading: boolean;
  error: string | null;
}

const LoginForm: React.FC<LoginFormProps> = ({
  onLogin,
  onRegister,
  loading,
  error,
}) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoginMode) {
      onLogin(username, password);
    } else {
      onRegister(username, email, password);
    }
  };

  const formStyle: React.CSSProperties = {
    maxWidth: "400px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px",
    margin: "8px 0",
    border: "1px solid #ddd",
    borderRadius: "4px",
    fontSize: "14px",
  };

  const buttonStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#4ecdc4",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    marginTop: "10px",
  };

  const linkStyle: React.CSSProperties = {
    color: "#4ecdc4",
    cursor: "pointer",
    textDecoration: "underline",
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        {isLoginMode ? "Đăng nhập" : "Đăng ký"}
      </h2>

      {error && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#ffebee",
            border: "1px solid #f44336",
            borderRadius: "4px",
            color: "#d32f2f",
            marginBottom: "16px",
          }}
        >
          {error}
        </div>
      )}

      <input
        type="text"
        placeholder="Tên đăng nhập"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={inputStyle}
        required
      />

      {!isLoginMode && (
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
          required
        />
      )}

      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
        required
      />

      <button type="submit" style={buttonStyle} disabled={loading}>
        {loading ? "Đang xử lý..." : isLoginMode ? "Đăng nhập" : "Đăng ký"}
      </button>

      <p style={{ textAlign: "center", marginTop: "16px" }}>
        {isLoginMode ? "Chưa có tài khoản? " : "Đã có tài khoản? "}
        <span style={linkStyle} onClick={() => setIsLoginMode(!isLoginMode)}>
          {isLoginMode ? "Đăng ký ngay" : "Đăng nhập"}
        </span>
      </p>
    </form>
  );
};

export default LoginForm;
