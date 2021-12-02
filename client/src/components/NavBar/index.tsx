import React from 'react'
import { GoogleLogin } from 'react-google-login'
import { Navbar, Container, Nav, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'

import { getUser, logOut } from '../../redux/actions/user'
import { AppState } from '../../types/types'
import Search from '../SearchBar/index'
import './NavBar.scss'

export default function NavBar() {
  const dispatch = useDispatch()
  const user = useSelector((state: AppState) => state.user.user)

  const responseGoogle = async (response: any) => {
    let res = await axios.post(
      'http://localhost:5000/api/v1/users/google-authenticate',
      { id_token: response.tokenObj.id_token }
    )
    console.log(res.data.id)
    dispatch(getUser(res.data.id))
  }

  let button
  let link
  if (user) {
    console.log(user)
    button = <Button onClick={() => dispatch(logOut())}>Logout</Button>
    let url = `localhost:3000/dashboard/${user._id}`
    link = (
      <Nav.Link href={url} className="navbar__link">
        Dashboard
      </Nav.Link>
    )
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
    <Navbar expand="lg" variant="dark" sticky="top" className="navbar--blue">
      <Container fluid>
        <Navbar.Brand href="/">
          <FontAwesomeIcon icon={faBookOpen} className="navbar__icon" />
          The Little Local Library
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="navbarScroll">
          <Search />
        </Navbar.Collapse>
        {link}
        {button}
      </Container>
    </Navbar>
  )
}
