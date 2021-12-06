import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faInstagram,
  faGithub,
  faFacebook,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons'
import { Button } from 'react-bootstrap'

import './Footer.scss'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className="footer">
      <div className="footer__icons-list">
        <Button className="footer__icons-item">
          <FontAwesomeIcon icon={faGithub} className="navbar__icon" />
        </Button>
        <Button className="footer__icons-item">
          <FontAwesomeIcon icon={faInstagram} className="navbar__icon" />
        </Button>
        <Button className="footer__icons-item">
          <FontAwesomeIcon icon={faFacebook} className="navbar__icon" />
        </Button>
        <Button className="footer__icons-item">
          <FontAwesomeIcon icon={faTwitter} className="navbar__icon" />
        </Button>
      </div>
      <div className="footer__links-list">
        <Link to="/" className="footer__links-item">
          About us
        </Link>
        <Link to="/" className="footer__links-item">
          Contact
        </Link>
      </div>
    </div>
  )
}
