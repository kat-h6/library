import React from 'react'
import { GoogleLogin } from 'react-google-login'
import {
  Navbar,
  Container,
  Nav,
  Button,
  Form,
  FormControl,
} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function NavBar() {
  const responseGoogle = async (response: any) => {
    console.log(response.profileObj)
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">The Little Local Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          ></Nav>
        </Navbar.Collapse>
        <GoogleLogin
          clientId="566595242960-kl4aklq9e7391q0soj2idrb04prftnmb.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </Container>
    </Navbar>
  )
}
