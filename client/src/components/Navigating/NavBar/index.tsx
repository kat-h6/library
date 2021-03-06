import React from 'react'
import { GoogleLogin } from 'react-google-login'
import { Navbar, Container, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

import { getUser, logOut, setToken } from '../../../redux/actions/user'
import { AppState } from '../../../types/types'
import Search from '../../Search/SearchBar/index'
import './NavBar.scss'

export default function NavBar() {
  const dispatch = useDispatch()
  const user = useSelector((state: AppState) => state.user.user)

  const responseGoogle = async (response: any) => {
    let res = await axios.post(
      'https://kat-h6-library.herokuapp.com/api/v1/users/google-authenticate',
      { id_token: response.tokenObj.id_token }
    )
    dispatch(getUser(res.data.id))
    dispatch(setToken(res.data.token))
  }

  let button
  let link
  let createBook
  if (user) {
    button = (
      <Button onClick={() => dispatch(logOut())} variant="outline-warning">
        Logout
      </Button>
    )
    link = (
      <Link to="/dashboard/{user._id}" className="navbar__link">
        Dashboard
      </Link>
    )
    if (user.isAdmin) {
      createBook = (
        <Link to="/books/new" className="navbar__link">
          New Book
        </Link>
      )
    }
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
        <Navbar.Toggle aria-controls="responsive-navbar-nav">
          <FontAwesomeIcon icon={faSearch} className="navbar__icon" />
        </Navbar.Toggle>
        <Navbar.Collapse id="navbarScroll">
          <Search />
        </Navbar.Collapse>
        <Link to="/books" className="navbar__link">
          Browse
        </Link>
        {createBook}
        {link}
        {button}
      </Container>
    </Navbar>
  )
}
