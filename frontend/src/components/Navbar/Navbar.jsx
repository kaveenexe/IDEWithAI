import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './Navbar.css';

function ContainerInsideExample() {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home" className='navbar_font'>DevMind</Navbar.Brand>
          <Nav className="justify-content-end">
            <Nav.Link href="#features" className='navbar_font'>Register</Nav.Link>
            <Nav.Link href="#pricing" className='navbar_font'>login</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
  );
}

export default ContainerInsideExample;