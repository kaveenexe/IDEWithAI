import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(email, password, fname, lname);
  }

  return (
    <>
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

        <label htmlFor="">First Name: </label>
        <input
          type="first name"
          placeholder="Enter your first name"
          onChange={(e) => setFname(e.target.value)}
          value={fname}
        /> <br />

        <label htmlFor="">Last Name: </label>
        <input
          type="last name"
          placeholder="Enter your last name"
          onChange={(e) => setLname(e.target.value)}
          value={lname}
        /><br />


        <label htmlFor="">Email: </label>
        <input
          type="email"
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        /><br />

        <label htmlFor="">Password: </label>
        <input
          type="Password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        /><br />

        <button>Register</button>
      </form>
    </>
  )
}
export default Signup;