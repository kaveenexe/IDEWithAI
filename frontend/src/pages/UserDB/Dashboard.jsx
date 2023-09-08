import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

function UserDashboard() {
  return (
    <div className="db_container">
        <div className="dbtitle_container bg-dark w-100 h-50 p-5">
            <h1 className="dbtitle text-white d-flex justify-content-center pt-5 pb-5">User Dashboard</h1>
        </div>
      <div className="justify-content-center container align-items-center mt-5">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Notifications</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Necessitatibus non ipsam magnam neque cum nemo labore rerum
                  architecto saepe quidem!
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Ratione exercitationem, temporibus sequi consequuntur adipisci
                  recusandae molestias officiis doloribus dicta praesentium fuga
                  aut, minus doloremque. Quidem odit quia iusto est voluptatem.
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  );
}

export default UserDashboard;
