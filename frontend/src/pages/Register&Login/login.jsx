import { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email, password);
  }

  return (
    <>
      <form className="login" onSubmit={handleSubmit}>
        <h3>Login</h3>

        <label htmlFor="">Email: </label>
        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />

        <label htmlFor="">Password: </label>
        <input
          type="Password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button>Log in</button>
      </form>
    </>
  )
}
export default Login;