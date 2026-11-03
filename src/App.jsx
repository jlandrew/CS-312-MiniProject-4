import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import './styles.css';

import { useEffect, useState } from 'react';


export default function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/blogs')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch blogs');
        }
        return response.json();
      })
      .then(data => {
        console.log('Blogs received from backend:', data);
        setBlogs(data);
      })
      .catch(error => {
        console.error('Error connecting to backend:', error);
      });
  }, []);


  return (
    <div className="App">
      <Navbar expand="lg" className="justify-content-between">
        <Container>
          <h3>Blog Web Application</h3>
          <h4>Logged in as: John Doe</h4>
        </Container>
      </Navbar>

      <Container>
        <Row className="mt-3">
          <Col lg="8">
            {blogs.map(blogs => (
            <Card className="mb-4" key={blogs.blog_id}>
              <Card.Body>
                <h4 className="mb-2">{blogs.title}</h4>
                <p>{blogs.creator_name} {blogs.date_created}</p>
                <p className="mb-4">{blogs.body}</p>
                <Button className="me-2">Edit Post</Button>
                <Button>Delete Post</Button>
              </Card.Body>
            </Card>
            ))}
          </Col>

          <Col lg="4">
            <Card>
              <Card.Body>
                <Card.Title>Create Post</Card.Title>
                <Card.Text>
                  <Form>
                    <InputGroup className="my-3">
                      <Form.Control id="title" placeholder="Enter title..." />
                    </InputGroup>
                    <InputGroup className="mb-3">
                      <Form.Control
                        as="textarea"
                        id="body"
                        placeholder="Enter text..."
                      />
                    </InputGroup>
                    <Button id="addPost" style={{ height: "40px" }}>
                      Add Post
                    </Button>
                  </Form>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
