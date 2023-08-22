import { useState } from "react";
import { useSignup } from "../../hooks/useSignup";

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
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <label htmlFor="">First Name: </label>
        <input
          type="text"
          placeholder="Enter your first name"
          onChange={(e) => setFname(e.target.value)}
          value={fname}
        />{" "}
        <br />
        <label htmlFor="">Last Name: </label>
        <input
          type="text"
          placeholder="Enter your last name"
          onChange={(e) => setLname(e.target.value)}
          value={lname}
        />
        <br />
        <label htmlFor="">Email: </label>
        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <br />
        <label htmlFor="">Password: </label>
        <input
          type="Password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <br />
        <button disabled={isLoading}>Sign up</button>
        {error && <div className="error">{error}</div>}
      </form>
    </>
  );
};
export default Signup;
