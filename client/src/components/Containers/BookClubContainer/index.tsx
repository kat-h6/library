import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import image from '../../../assets/images/aaron-burden-book.jpg'
import './BookClubContainer.scss'

export default function BookClubContainer() {
  return (
    <Container className="book-club">
      <Row>
        <Col md className="book-club__left">
          <img
            src={image}
            alt="young girl surrounded by books"
            className="book-club__img"
          />
        </Col>
        <Col md className="book-club__right">
          <div>
            <h4 className="book-club__right__header">
              Join Our Virtual Book Club!
            </h4>
            <p>
              Little Local Library's book club was formed a year ago during the
              pandemic. We currently have 38 members from 8 countries. All are
              welcome!
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
