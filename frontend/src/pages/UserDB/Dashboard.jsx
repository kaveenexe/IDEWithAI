import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import UserForm from "../../components/Dashboard/UserForm";
import "./styles.css";

function UserDashboard() {
  return (
    <div className="db_container">
      <div className="background ">
        <div className="dashbord_background justify-content-center container align-items-center">
          <h1> </h1>
        </div>
      </div>
      <div className="justify-content-center container align-items-center mt-5 db_alltabs">
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column dashboard_tabs">
                <Nav.Item>
                  <Nav.Link eventKey="first">Profile</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Notifications</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="third">Invitaions</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first" className="dbtab_details">
                  <UserForm />
                </Tab.Pane>
                <Tab.Pane eventKey="second" className="dbtab_details">
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Ratione exercitationem, temporibus sequi consequuntur adipisci
                  recusandae molestias officiis doloribus dicta praesentium fuga
                  aut, minus doloremque. Quidem odit quia iusto est voluptatem.
                </Tab.Pane>
                <Tab.Pane eventKey="third" className="dbtab_details">
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
