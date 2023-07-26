import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import { useState } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

function App() {
  const [filtersVisible, setFiltersVisible] = useState(true);

  return (
    <>
      <Navbar expand="md" className="border-bottom px-3">
        {/* TODO: careful here, I'm setting the state wrongly probably (need callback?) */}
        <Navbar.Toggle onClick={() => setFiltersVisible(!filtersVisible)} />

        <Navbar.Brand href="#">
          <i id="logo" className="bi bi-film" />
          <span className="ms-2">Film Library</span>
        </Navbar.Brand>

        <Form className="mx-auto d-none d-md-block" action="#" role="search">
          <Form.Control className="border p-1" type="search" placeholder="Search" />
        </Form>

        <Nav>
          <Nav.Link href="#">
            <i id="user" className="bi bi-person-circle" />
          </Nav.Link>
        </Nav>
      </Navbar>

      <Container fluid className="py-2">
        <Row className="min-vh-100">
          <Col id="filters" xs="12" md="4" className="d-md-block border-end">
            <Collapse in={filtersVisible}>
              <ListGroup variant="flush" className="d-md-block">
                <ListGroup.Item action active>All</ListGroup.Item>
                <ListGroup.Item action>Favorite</ListGroup.Item>
                <ListGroup.Item action>Best rated</ListGroup.Item>
                <ListGroup.Item action>Seen last month</ListGroup.Item>
                <ListGroup.Item action>Unseen</ListGroup.Item>
              </ListGroup>
            </Collapse>
          </Col>

          <Col>
            <h2 id="filter-heading" className="text-center">All</h2>

            <Table responsive id="films">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Favorite</th>
                  <th>Watch date</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>21 Grams</td>
                  <td><Form.Check type="checkbox" checked readOnly /></td>
                  <td>March 11, 2022</td>
                  <td>
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star-fill" />
                    <i className="bi bi-star" />
                  </td>
                </tr>
              </tbody>
            </Table>

            <Container className="d-flex justify-content-end">
              <Button size="lg" className="rounded-circle" type="button">+</Button>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;