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
    title: 'The Handmaid\'s Tale',
    authors: [{name: 'Margaret Atwood'}],
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9780449212608-M.jpg',
    description:
      'Offred is a Handmaid in the Republic of Gilead. She may leave the home of the Commander and his wife once a day to walk to food markets whose signs are now pictures instead of words because women are no longer allowed to read. She must lie on her back once a month and pray that the Commander makes her pregnant, because in an age of declining births, Offred and the other Handmaids are valued only if their ovaries are viable. Offred can remember the years before, when she lived and made love with her husband Luke; when she played with and protected her daughter; when she had a job, money of her own, and access to knowledge. But all of that is gone now... everything has changed.',
    ISBN: 9780449212608,
    publisher: 'Fawcett Crest',
    publishedYear: 1991,
    genres: ['science fiction', 'tragedy', 'dystopia'],
    isAvailable: true,
  }),
  new Book({
    title: 'Oryx and Crake',
    authors: [{name: 'Margaret Atwood'}],
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9780770429355-M.jpg',
    description:
      'Oryx and Crake is at once an unforgettable love story and a compelling vision of the future. Snowman, known as Jimmy before mankind was overwhelmed by a plague, is struggling to survive in a world where he may be the last human, and mourning the loss of his best friend, Crake, and the beautiful and elusive Oryx whom they both loved. In search of answers, Snowman embarks on a journey–with the help of the green-eyed Children of Crake–through the lush wilderness that was so recently a great city, until powerful corporations took mankind on an uncontrolled genetic engineering ride. Margaret Atwood projects us into a near future that is both all too familiar and beyond our imagining.',
    ISBN: 9780770429355,
    publisher: 'Seal',
    publishedYear: 2004,
    genres: ['science fiction', 'tragedy', 'romance', 'dystopia'],
    isAvailable: true,
  }),
  new Book({
    title: 'Harry Potter and the Philosopher\'s Stone',
    authors: [{name: 'J.K. Rowling'}],
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9781408810545-M.jpg',
    description:
      'Harry Potter thinks he is an ordinary boy. He lives with his Uncle Vernon, Aunt Petunia and cousin Dudley, who are mean to him and make him sleep in a cupboard under the stairs. (Dudley, however, has two bedrooms, one to sleep in and one for all his toys and games.) Then Harry starts receiving mysterious letters and his life is changed for ever. He is whisked aways by a beetled-eyed giant of a man and enrolled in Hogwarts School of Witchcraft and Wizardry. The reason: Harry Potter is a wizard!',
    ISBN: 9781408810545,
    publisher: 'Bloomsbury',
    publishedYear: 2010,
    genres: ['fantasy fiction', 'fantasy', 'fiction'],
    isAvailable: true,
  }),
  new Book({
    title: 'Alice\'s Adventures in Wonderland',
    genres: ['children\'s fiction', 'fantasy'],
    description: 'One of the most popular and most quoted books in English, Alice\'s Adventures in Wonderland was the creation of Charles Lutwidge Dodgson (1832–1898), a distinguished scholar, mathematician and author who wrote under the pseudonym of Lewis Carroll. Written for young readers but enjoyed equally by adults, the fantastic tale transformed children\'s literature, liberating it from didactic constraints. The story is deeply but gently satiric, enlivened with an imaginative plot and brilliant use of nonsense, as it relates Alice\'s adventures in a bizarre, topsy-turvey land underground. There she encounters a cast of strange characters and fanciful beasts, including the White Rabbit, March Hare, and Mad Hatter, the sleepy Dormouse and grinning Cheshire Cat,the Mock Turtle, the dreadful Queen of Hearts, and unusual creatures.',
    authors: [{name: 'Lewis Caroll'}],
    isAvailable: true,
    publishedYear: 1931,
    publisher: 'Collins\' Clear-Type Press',
    ISBN: 8533609159,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/8533609159-M.jpg'
  }), 
  new Book({
    title: 'The Hobbit',
    genres: ['epic', 'fantasy fiction', 'children\'s literature'],
    description: 'The Hobbit is a tale of high adventure, undertaken by a colony of dwarves, in search of dragon-guarded gold. A reluctant partner in this perilous quest is Bilbo Baggins, a comfort-loving, unambitious hobbit. Encounters with trolls, goblins, dwarves, elves and giant spiders, conversations with the dragon, Smaug the Magnificent and a rather unwilling presence at the Battle of the Five Armies are some of the adventures that befall Bilbo. But there are lighter moments as well, good fellowship, laughter and song. Bilbo has taken his place among the immortals of children \'s fiction. The Hobbit is a complete and marvellous tale in itself, but it also forms a prelude to J. R.R. Tolkien\'s The Lord of the Rings.',
    authors: [{name: 'J.R.R. Tolkien'}],
    isAvailable: true,
    publishedYear: 1984,
    publisher: 'Unwin Paperbacks',
    ISBN: 9780048231888,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9780048231888-M.jpg'
  }),
  new Book({
    title: 'Nineteen Eighty-Four',
    authors: [{name: 'George Orwell'}],
    description: '1984 is a dystopian social science fiction novel by the English novelist George Orwell (the pen name of Eric Arthur Blair). It was published on 8 June 1949 by Secker & Warburg as Orwell\'s ninth and final book completed in his lifetime. Thematically, Nineteen Eighty-Four centres on the consequences of totalitarianism, mass surveillance, and repressive regimentation of persons and behaviours within society. Orwell, himself a democratic socialist, modelled the authoritarian government in the novel after Stalinist Russia. More broadly, the novel examines the role of truth and facts within politics and the ways in which they are manipulated.',
    genres: ['science fiction', 'dystopian fiction', 'political fiction'],
    publishedYear: 1949,
    publisher: 'Secker & Warburg',
    ISBN: 9780241436523,
    imageUrl: 'https://covers.openlibrary.org/b/id/9267242-M.jpg',
  }),
  new Book({
    title: 'Le Petit Prince',
    authors: [{name: 'Antoine de Saint-Exupéry'}],
    genres: ['fable', 'children\'s literature'],
    imageUrl: 'https://covers.openlibrary.org/b/isbn/0772551022-M.jpg',
    ISBN: 978314964079,
    publishedYear: 1943,
    publisher: 'Gallimard',
    description: 'Le Petit Prince est une œuvre de langue française, la plus connue d\'Antoine de Saint-Exupéry. Publié en 1943 à New York simultanément à sa traduction anglaise, c\'est une œuvre poétique et philosophique sous l\'apparence d\'un conte pour enfants. \bTraduit en quatre cent cinquante-sept langues et dialectes, Le Petit Prince est le deuxième ouvrage le plus traduit au monde après la Bible. \bLe langage, simple et dépouillé, parce qu\'il est destiné à être compris par des enfants, est en réalité pour le narrateur le véhicule privilégié d\'une conception symbolique de la vie. Chaque chapitre relate une rencontre du petit prince qui laisse celui-ci perplexe, par rapport aux comportements absurdes des « grandes personnes ». Ces différentes rencontres peuvent être lues comme une allégorie.'
  }),
  new Book({
    title: 'The Three-Body Problem',
    authors: [{name: 'Cixin Liu'}],
    description: 'Cixin Liu\'s trilogy-opening novel about first contact with aliens and the clandestine struggle with them over Earth\'s future, and its scientific progress in particular.',
    publishedYear: 2014,
    publisher: 'Tor Books',
    genres: ['science fiction'],
    ISBN: 9780765377067,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9780765377067-M.jpg'
  }),
  new Book({
    title: 'The Witches',
    authors: [{name: 'Roald Dahl'}],
    publishedYear: 1983,
    publisher: 'Jonathan Cape',
    ISBN: 9780590032490,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9780590032490-M.jpg',
    description: 'A young boy and his Norwegian grandmother, who is an expert on witches, together foil a witches\' plot to destroy the world\'s children by turning them into mice.',
    genres: ['children\'s literature', 'fiction', 'fantasy']
  }),
  new Book({
    title: 'Things Fall Apart',
    authors: [{name: 'Chinua Achebe'}],
    description: 'Things Fall Apart is the debut novel by Nigerian author Chinua Achebe, first published in 1958. It depicts pre-colonial life in the southeastern part of Nigeria and the arrival of Europeans during the late 19th century. It is seen as the archetypal modern African novel in English, and one of the first to receive global critical acclaim. The novel follows the life of Okonkwo, an Igbo man and local wrestling champion in the fictional Nigerian clan of Umuofia. The work is split into three parts, with the first describing his family, personal history, and the customs and society of the Igbo, and the second and third sections introducing the influence of European colonialism and Christian missionaries on Okonkwo, his family, and the wider Igbo community.',
    ISBN: 9780385474542,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9780385474542-M.jpg',
    publishedYear: 1958,
    publisher: 'Anchor Books',
    genres: ['historical fiction']
  }),
  new Book({
    title: 'Who Wants a Cheap Rhinoceros?',
    authors: [{name: 'Shel Silverstein'}],
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9781481415934-M.jpg',
    ISBN: 9781481415934,
    publisher: 'Simon & Schuster Books for Young Readers',
    publishYear: 2009,
    description: 'Looking ofr a new pet? Bored with cats, dogs, goldfish, gerbils, and hamsters? How about a cheap rhinoceros?',
    genres: ['children\'s literature', 'fiction', 'humour']
  }),
  new Book({
    title: 'Pigs',
    authors: [{name: 'Robert N. Munsch'}],
    ISBN: 9781550370393,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9781550370393-M.jpg',
    publisher: 'Annick Press',
    publishedYear: 1992,
    genres: ['children\'s literature', 'humour', 'fiction']
  }),
  new Book({
    title: 'Catch-22',
    authors: [{name: 'Joseph Heller'}],
    description: 'Catch-22 is like no other novel. It has its own rationale, its own extraordinary character. It moves back and forth from hilarity to horror. It is outrageously funny and strangely affecting. It is totally original. Set in the closing months of World War II in an American bomber squadron off Italy, Catch-22 is the story of a bombardier named Yossarian, who is frantic and furious because thousands of people he hasn\'t even met keep trying to kill him. Catch-22 is a microcosm of the twentieth-century world as it might look to someone dangerously sane. It is a novel that lives and moves and grows with astonishing power and vitality -- a masterpiece of our time.',
    publisher: 'Simon & Schuster',
    publishedYear: 2011,
    ISBN: 9781451626650,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9781451626650-M.jpg',
    genres: ['novel', 'war story', 'dark comedy', 'historical fiction', 'satire', 'absurdist fiction']
  }),
  new Book({
    title: 'The Lions of Al-Rassan',
    authors: [{name: 'Guy Gavriel Kay'}],
    description: 'The Ruling Asharites of Al-Rassan have come from the desert sands, but over centuries, seduced by the sensuous pleasures of their new land, their stern piety has eroded. The Asharite empire has splintered into decadent city-states led by waring kings. Hauntingly evocative of medieval Spain, The Lions of Al-Rassan is both a brilliant adventure and a deeply compelling story of love, divided loyalties, and what happens to men and women when hardening beliefs begin to remake--or destroy--a world.',
    publisher: 'HarperCollins',
    publishedYear: 2000,
    ISBN: 9780006480303,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9780006480303-M.jpg',
    genres: ['novel', 'fantasy fiction', 'historical fantasy']
  }),
  new Book({
    title: 'Gone Girl',
    authors: [{name: 'Gillian Flynn'}],
    description: 'On a summer morning in North Carthage, Missouri, it is Nick and Amy\'s fifth wedding anniversary. Presents are being wrapped and reservations made when Amy disap- pears from their rented McMansion on the Mississippi River. Under mounting preesure from the police and Amy\'s parents, the town golden boy parades an endless series of lies, deceits, and inappropriate behavior. Nick is oddly evasive, and he\'s definitely bitter — but is he really a killer? As the cops close in, every couple in town is wondering how well they know each other.',
    ISBN: 9781594136054,
    imageUrl: 'https://covers.openlibrary.org/b/isbn/9781594136054-M.jpg',
    publisher: 'Large Print Press',
    publishedYear: 2014,
    genres: ['thriller', 'mystery', 'drama']
  })
]

books.map(async (b, index) => {
  await b.save(async () => {
    if (index === books.length - 1) {
      console.log('Done!')
      mongoose.disconnect()
    }
  })
})
