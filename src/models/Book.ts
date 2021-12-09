import mongoose, { Document } from 'mongoose'

export type Authors = {
  name: string
  author?: string
}

export type Rating = {
  title: string
  content: string
  author: string
  rating: number
  date: Date
}

export type BookDocument = Document & {
  title: string
  authors: Authors[]
  description: string
  ISBN: number
  publisher: string
  publishedYear: number
  genres: string[]
  isAvailable: boolean
  imageUrl: string
  ratings?: Rating[]
}

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  authors: [
    {
      author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author' },
      name: { type: String, required: true },
    },
  ],
  ratings: [
    {
      title: { type: String, required: true },
      content: { type: String, required: true },
      rating: { type: Number, required: true },
      date: { type: Date, required: true },
      author: { type: String, required: true },
    },
  ],
  description: { type: String },
  ISBN: { type: Number },
  publisher: { type: String },
  publishedYear: { type: Number },
  genres: [String],
  isAvailable: {
    type: Boolean,
    default: true,
  },
  imageUrl: { type: String },
})

export default mongoose.model<BookDocument>('Book', bookSchema)
