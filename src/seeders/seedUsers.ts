import mongoose from 'mongoose'

import User from '../models/User'

mongoose.connect('localhost:3000/api/v1/users')

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
  await u.save(() => {
    if (index === users.length - 1) {
      console.log('Done!')
      mongoose.disconnect()
    }
  })
})
