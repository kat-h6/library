import mongoose from 'mongoose'

import User from '../models/User'
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

const users = [
  new User({
    firstName: 'Kathy',
    lastName: 'H',
    email: 'kathy123@email.com',
    password: 'kathy123',
    isAdmin: true,
  }),
  new User({
    firstName: 'Liam',
    lastName: 'Brown',
    email: 'liam123@email.com',
    password: 'liam123',
    isAdmin: false,
  }),
  new User({
    firstName: 'Lana',
    lastName: 'Morgan',
    email: 'lana123@email.com',
    password: 'lana123',
    isAdmin: false,
  }),
]

users.map(async (u, index) => {
  await u.save(async () => {
    if (index === users.length - 1) {
      console.log('Done!')
      mongoose.disconnect()
    }
  })
})
