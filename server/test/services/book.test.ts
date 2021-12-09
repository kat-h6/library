import Book from '../../src/models/Book'
import BookService from '../../src/services/book'
import connect, { MongodHelper } from '../db-helper'

const nonExistingBookId = '61adf15c3c6095fa0a67f699'

async function createBook() {
  const book = new Book({
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
  return await BookService.create(book)
}

describe('book service', () => {
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
    const book = await createBook()
    expect(book).toHaveProperty('_id')
    expect(book).toHaveProperty('title', 'Oryx and Crake')
    expect(book).toHaveProperty('ISBN', 9780770429355)
  })

  it('should get a movie with id', async () => {
    const book = await createBook()
    const found = await BookService.findById(book._id)
    expect(found.title).toEqual(book.title)
    expect(found._id).toEqual(book._id)
  })

  // Check https://jestjs.io/docs/en/asynchronous for more info about
  // how to test async code, especially with error
  it('should not get a non-existing book', async () => {
    expect.assertions(1)
    return BookService.findById(nonExistingBookId).catch((e) => {
      expect(e.message).toMatch(`Book ${nonExistingBookId} not found`)
    })
  })

  it('should update an existing book', async () => {
    const book = await createBook()
    const update = {
      title: 'Oryx',
    }
    const updated = await BookService.update(book._id, update)
    expect(updated).toHaveProperty('_id', book._id)
    expect(updated).toHaveProperty('title', 'Oryx')
  })

  it('should not update a non-existing book', async () => {
    expect.assertions(1)
    const update = {
      isAvailable: false,
    }

    return BookService.update(nonExistingBookId, update).catch((e) => {
      expect(e.message).toMatch(`Book ${nonExistingBookId} not found`)
    })
  })

  it('should delete an existing book', async () => {
    expect.assertions(1)
    const book = await createBook()
    await BookService.deleteBook(book._id)
    return BookService.findById(book._id).catch((e) => {
      expect(e.message).toBe(`Book ${book._id} not found`)
    })
  })
})
