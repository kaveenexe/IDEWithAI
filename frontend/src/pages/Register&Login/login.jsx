import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "react-bootstrap-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);

    if (!error){
      navigate("/")
    }
  };

  return (
    <div className="template d-flex justify-content-center align-items-center vh-100 bg-primary">
      <div className="form_container p-5 rounded bg-white">
        <form className="login" onSubmit={handleSubmit}>
          <h3 className="text-center">Login</h3>

          <div className="mb-2 pt-4 pb-2">
            <label htmlFor="">Email: </label>
            <input
              type="email"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="form-control"
            />
          </div>
          <div className="mb-2 pb-3">
            <label htmlFor="">Password: </label>
            <input
              type="Password"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="form-control"
            />
          </div>
          <div className="d-grid">
            <button className="btn btn-primary" disabled={isLoading}>
              Log in
            </button>
          </div>
          {error && <div>{error}</div>}
          <p className="text-end mt-2 text-reset pt-3">
            <a href="/register" className="text-reset text-decoration-none">
              Register <ArrowRight />
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Login;
