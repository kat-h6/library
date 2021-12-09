import request from 'supertest'

import { BookDocument } from '../../src/models/Book'
import app from '../../src/app'
import connect, { MongodHelper } from '../db-helper'

const nonExistingBookId = '61adf15c3c6095fa0a67f699'

async function createBook(override?: Partial<BookDocument>) {
  let book = {
    title: 'Oryx and Crake',
    authors: [{ name: 'Margaret Atwood' }],
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9780770429355-M.jpg',
    description:
      'Oryx and Crake is at once an unforgettable love story and a compelling vision of the future. Snowman, known as Jimmy before mankind was overwhelmed by a plague, is struggling to survive in a world where he may be the last human, and mourning the loss of his best friend, Crake, and the beautiful and elusive Oryx whom they both loved. In search of answers, Snowman embarks on a journey–with the help of the green-eyed Children of Crake–through the lush wilderness that was so recently a great city, until powerful corporations took mankind on an uncontrolled genetic engineering ride. Margaret Atwood projects us into a near future that is both all too familiar and beyond our imagining.',
    ISBN: 9780770429355,
    publisher: 'Seal',
    publishedYear: 2004,
    genres: ['science fiction', 'tragedy', 'romance', 'dystopia'],
    isAvailable: true,
  }

  if (override) {
    book = { ...book, ...override }
  }

  return await request(app).post('/api/v1/books').send(book)
}
// @ts-ignore
describe('book controller', () => {
  let mongodHelper: MongodHelper

  beforeAll(async () => {
    mongodHelper = await connect()
  })

  afterEach(async () => {
    await mongodHelper.clearDatabase()
  })

  afterAll(async () => {
    await mongodHelper.closeDatabase()
  })

  it('should create a book', async () => {
    const res = await createBook()
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('_id')
    expect(res.body.title).toBe('Oryx and Crake')
  })

  it('should not create a book with wrong data', async () => {
    const res = await request(app).post('/api/v1/books').send({
      description: 'Something something',
    })
    expect(res.status).toBe(400)
  })

  it('should get back an existing book', async () => {
    let res = await createBook()
    expect(res.status).toBe(200)

    const bookId = res.body._id
    res = await request(app).get(`/api/v1/books/${bookId}`)

    expect(res.body._id).toEqual(bookId)
  })

  it('should not get back a non-existing book', async () => {
    const res = await request(app).get(`/api/v1/books/${nonExistingBookId}`)
    expect(res.status).toBe(404)
  })

  it('should get back all books', async () => {
    const res1 = await createBook({
      title: 'Oryx and Crake',
      authors: [{ name: 'Margaret Atwood' }],
      imageUrl: 'https://covers.openlibrary.org/b/isbn/9780770429355-M.jpg',
      description:
        'Oryx and Crake is at once an unforgettable love story and a compelling vision of the future. Snowman, known as Jimmy before mankind was overwhelmed by a plague, is struggling to survive in a world where he may be the last human, and mourning the loss of his best friend, Crake, and the beautiful and elusive Oryx whom they both loved. In search of answers, Snowman embarks on a journey–with the help of the green-eyed Children of Crake–through the lush wilderness that was so recently a great city, until powerful corporations took mankind on an uncontrolled genetic engineering ride. Margaret Atwood projects us into a near future that is both all too familiar and beyond our imagining.',
      ISBN: 9780770429355,
      publisher: 'Seal',
      publishedYear: 2004,
      genres: ['science fiction', 'tragedy', 'romance', 'dystopia'],
      isAvailable: true,
      ratings: [],
    })
    const res2 = await createBook({
      title: 'Oryx and Crake',
      authors: [{ name: 'Margaret Atwood' }],
      imageUrl: 'https://covers.openlibrary.org/b/isbn/9780770429355-M.jpg',
      description:
        'Oryx and Crake is at once an unforgettable love story and a compelling vision of the future. Snowman, known as Jimmy before mankind was overwhelmed by a plague, is struggling to survive in a world where he may be the last human, and mourning the loss of his best friend, Crake, and the beautiful and elusive Oryx whom they both loved. In search of answers, Snowman embarks on a journey–with the help of the green-eyed Children of Crake–through the lush wilderness that was so recently a great city, until powerful corporations took mankind on an uncontrolled genetic engineering ride. Margaret Atwood projects us into a near future that is both all too familiar and beyond our imagining.',
      ISBN: 9780770429355,
      publisher: 'Seal',
      publishedYear: 2004,
      genres: ['science fiction', 'tragedy', 'romance', 'dystopia'],
      isAvailable: true,
      ratings: [],
    })

    const res3 = await request(app).get('/api/v1/books')

    expect(res3.body.length).toEqual(2)
    expect(res3.body[0]._id).toEqual(res1.body._id)
    expect(res3.body[1]._id).toEqual(res2.body._id)
  })

  it('should update an existing book', async () => {
    let res = await createBook()
    expect(res.status).toBe(200)

    const bookId = res.body._id
    const update = {
      isAvailable: false,
    }

    res = await request(app).patch(`/api/v1/books/${bookId}`).send(update)

    expect(res.status).toEqual(200)
    expect(res.body.isAvailable).toEqual(false)
  })

  it('should delete an existing book', async () => {
    let res = await createBook()
    expect(res.status).toBe(200)
    const bookId = res.body._id

    res = await request(app).delete(`/api/v1/books/${bookId}`)

    expect(res.status).toEqual(204)

    res = await request(app).get(`/api/v1/books/${bookId}`)
    expect(res.status).toBe(404)
  })
})
