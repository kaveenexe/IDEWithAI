import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useLogout } from "../../hooks/useLogout";
import "./Navbar.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { PersonCircle } from "react-bootstrap-icons";


function ContainerInsideExample() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const userData = JSON.parse(localStorage.getItem('userData'));

  // IF USER LOGOUT NAVBAR WILL SHOW THIS
  if(!userData) {
    return (
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/" className="navbar_font">
            DevMind
          </Navbar.Brand>
          <Nav className="justify-content-end">
            <div className="d-flex">
              <Nav.Link href="/register" className="navbar_font">
                Register
              </Nav.Link>
              <Nav.Link href="/login" className="navbar_font">
                login
              </Nav.Link>
            </div>
          </Nav>
        </Container>
      </Navbar>
    )
  }

  const handleClick = () => {
    logout();
  };
  console.log("user", user);
  return (

    // IF USER LOGIN NAVBAR WILL SHOW THIS
    <Navbar bg="primary" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/" className="navbar_font_logo">
          DevMind
        </Navbar.Brand>
        <Nav className="justify-content-end">
          {user && (
            <div className="navbar_font d-flex justify-content-end">
              <Nav.Link href="/dashboard" className="navbar_font to_dashboard">
                <PersonCircle className="dashboard_icon" />
              
              <span className="login_name btn btn-primary">Hi {userData.fname}</span>
              <Button onClick={handleClick}>Log Out</Button>
              </Nav.Link>
            </div>
            
          )}
          {!user && (
            <div className="d-flex">
              <Nav.Link href="/register" className="navbar_font">
                Register
              </Nav.Link>
              <Nav.Link href="/login" className="navbar_font">
                login
              </Nav.Link>
            </div>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default ContainerInsideExample;
