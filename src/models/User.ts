import mongoose, { Document } from 'mongoose'

export type UserDocument = Document & {
  firstName: string
  lastName: string
  email: string
  password: string
  isAdmin: boolean
  bookings: Bookings[]
}

export type Bookings = {
  startDate: Date
  endDate: Date
  books: string
}

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  bookings: [
    {
      book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
      startDate: { type: Date, required: true },
      endDate: { type: Date, required: true },
    },
  ],
})

export default mongoose.model<UserDocument>('User', userSchema)
