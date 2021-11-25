import React from 'react'
import { GoogleLogin } from 'react-google-login'
import {
  Navbar,
  Container,
  Nav,
  Button,
  DropdownButton,
  Form,
  FormControl,
  Dropdown,
} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'

import { logIn, logOut } from '../../redux/actions/user'
import { AppState } from '../../types/types'
import './NavBar.scss'

export default function NavBar() {
  const dispatch = useDispatch()
  const user = useSelector((state: AppState) => state.user.user)

  const responseGoogle = async (response: any) => {
    let res = await axios.post(
      'http://localhost:5000/api/v1/users/google-authenticate',
      { id_token: response.tokenObj.id_token }
    )
    dispatch(logIn(res.data))
  }

  let button
  if (user) {
    button = <Button onClick={() => dispatch(logOut())}>Logout</Button>
  } else {
    button = (
      <GoogleLogin
        clientId="566595242960-kl4aklq9e7391q0soj2idrb04prftnmb.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={'single_host_origin'}
      />
    )
  }

  return (
    <Navbar expand="lg" variant="dark" className="navbar--blue">
      <Container fluid>
        <FontAwesomeIcon icon={faBookOpen} className="navbar__icon" />
        <Navbar.Brand href="#">The Little Local Library</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Form className="d-flex">
            <DropdownButton
              id="dropdown-basic-button"
              title="All"
              variant="success"
            >
              <Dropdown.Item href="#/action-1">Title</Dropdown.Item>
              <Dropdown.Item href="#/action-2">ISBN</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
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
        {button}
      </Container>
    </Navbar>
  )
}
