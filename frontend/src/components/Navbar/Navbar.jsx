import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { useLogout } from "../../hooks/useLogout";
import "./Navbar.css";

function ContainerInsideExample() {
  const { logout } = useLogout();

  const handleClick = () => {
    logout();
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="#home" className="navbar_font">
          DevMind
        </Navbar.Brand>
        <Nav className="justify-content-end">
          <div>
            <Button onClick={handleClick}>Log Out</Button>
          </div>
          <div>
            <Nav.Link href="#features" className="navbar_font">
              Register
            </Nav.Link>
            <Nav.Link href="#pricing" className="navbar_font">
              login
            </Nav.Link>
          </div>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default ContainerInsideExample;
