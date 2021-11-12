import mongoose, { Document } from 'mongoose'

export type BookingDocument = Document & {
  startDate: Date
  endDate: Date
  user: mongoose.Schema.Types.ObjectId
  Book: mongoose.Schema.Types.ObjectId
}

const bookingSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  user: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  book: {
    ref: 'Book',
    type: mongoose.Schema.Types.ObjectId,
  },
})

export default mongoose.model<BookingDocument>('Booking', bookingSchema)
