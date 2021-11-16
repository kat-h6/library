import mongoose from 'mongoose'

import Book from '../models/Book'
import { MONGODB_URI } from '../util/secrets'
import app from '../app'

const mongoUrl = MONGODB_URI

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    // Start Express server
    app.listen(app.get('port'), () => {
      console.log(
        '  App is running at http://localhost:%d in %s mode',
        app.get('port'),
        app.get('env')
      )
      console.log('  Press CTRL-C to stop\n')
    })
  })
  .catch((err) => {
    console.log(
      'MongoDB connection error. Please make sure MongoDB is running. ' + err
    )
    process.exit(1)
  })

// prettier-ignore
const books = [
  new Book({
    title: 'Oryx and Crake',
    authors: 'Margaret Atwood',
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9780449212608-M.jpg',
    description:
      'Offred is a Handmaid in the Republic of Gilead. She may leave the home of the Commander and his wife once a day to walk to food markets whose signs are now pictures instead of words because women are no longer allowed to read. She must lie on her back once a month and pray that the Commander makes her pregnant, because in an age of declining births, Offred and the other Handmaids are valued only if their ovaries are viable. Offred can remember the years before, when she lived and made love with her husband Luke; when she played with and protected her daughter; when she had a job, money of her own, and access to knowledge. But all of that is gone now... everything has changed.',
    ISBN: 9780449212608,
    publisher: 'Fawcett Crest',
    publishedYear: 1991,
    genres: ['science fiction', 'tragedy'],
    isAvailable: true,
  }),
  new Book({
    title: 'Harry Potter and the Philosopher\'s Stone',
    authors: 'J.K. Rowling',
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9781408810545-M.jpg',
    description:
      'Harry Potter thinks he is an ordinary boy. He lives with his Uncle Vernon, Aunt Petunia and cousin Dudley, who are mean to him and make him sleep in a cupboard under the stairs. (Dudley, however, has two bedrooms, one to sleep in and one for all his toys and games.) Then Harry starts receiving mysterious letters and his life is changed for ever. He is whisked aways by a beetled-eyed giant of a man and enrolled in Hogwarts School of Witchcraft and Wizardry. The reason: Harry Potter is a wizard!',
    ISBN: 9781408810545,
    publisher: 'Bloomsbury',
    publishedYear: 2010,
    genres: ['fantasy fiction'],
    isAvailable: true,
  }),
]

books.map(async (b, index) => {
  await b.save(async () => {
    if (index === books.length - 1) {
      console.log('Done!')
      mongoose.disconnect()
    }
  })
})
