import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";
import { ArrowRight } from "react-bootstrap-icons";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup({ email, fname, lname, password });
    // console.log("Submitting Submitting:", email, fname, lname, password);
  };

  return (
    <>
      <div className="template d-flex justify-content-center align-items-center vh-100 bg-primary">
        <div className="form_container p-5 rounded bg-white">
          <form className="signup col-12" onSubmit={handleSubmit}>
            <h3 className="text-center">Sign Up</h3>

            <div className="mb-2 pt-4 pb-2">
              <label htmlFor="">First Name: </label>
              <input
                type="text"
                placeholder="Enter your first name"
                onChange={(e) => setFname(e.target.value)}
                value={fname}
                className="form-control"
              />{" "}
            </div>

            <div className="mb-2 pb-2">
              <label htmlFor="">Last Name: </label>
              <input
                type="text"
                placeholder="Enter your last name"
                onChange={(e) => setLname(e.target.value)}
                value={lname}
                className="form-control"
              />
            </div>
            <div className="mb-2 pb-2">
              <label htmlFor="">Email: </label>
              <input
                type="email"
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="form-control"
              />
            </div>
            <div className="mb-2 pb-2">
              <label htmlFor="">Password: </label>
              <input
                type="Password"
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="form-control"
              />
            </div>

            <div className="d-grid">
              <button className="btn btn-primary" disabled={isLoading}>
                Sign up
              </button>
              {error && <div className="register_error bg-danger rounded mt-2 pt-2 pb-2 text-center">{error}</div>}
            </div>

            <p className="text-end mt-2 text-reset pt-3">
              <a href="/login" className="text-reset text-decoration-none">
                Login <ArrowRight />
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};
export default Signup;
