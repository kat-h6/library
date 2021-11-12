import mongoose, { Document } from 'mongoose'

export type BookDocument = Document & {
  title: string
  authors: string[]
  description: string
  ISBN: number
  publisher: string
  publishedYear: number
  genres: string[]
  isAvailable: boolean
}

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
  },
  authors: {
    type: [String],
    required: true,
    index: true,
  },
  description: {
    type: String,
  },
  ISBN: {
    type: Number,
  },
  publisher: {
    type: String,
  },
  publishedYear: {
    type: Number,
  },
  genres: [String],
  isAvailable: {
    type: Boolean,
    default: true,
  },
})

export default mongoose.model<BookDocument>('Book', bookSchema)
