import Booking, { BookingDocument } from '../models/Booking'
import { NotFoundError } from '../helpers/apiError'

const create = async (booking: BookingDocument): Promise<BookingDocument> => {
  return booking.save()
}

const findById = async (bookingId: string): Promise<BookingDocument> => {
  const foundBooking = await Booking.findById(bookingId)

  if (!foundBooking) {
    throw new NotFoundError(`Booking ${bookingId} not found`)
  }

  return foundBooking
}

const findAll = async (): Promise<BookingDocument[]> => {
  return Booking.find().sort({ startDate: 1 })
}

const update = async (
  bookingId: string,
  update: Partial<BookingDocument>
): Promise<BookingDocument | null> => {
  const foundBooking = await Booking.findByIdAndUpdate(bookingId, update, {
    new: true,
  })

  if (!foundBooking) {
    throw new NotFoundError(`Booking ${bookingId} not found`)
  }

  return foundBooking
}

const deleteBooking = async (
  bookingId: string
): Promise<BookingDocument | null> => {
  const foundBooking = Booking.findByIdAndDelete(bookingId)

  if (!foundBooking) {
    throw new NotFoundError(`Booking ${bookingId} not found`)
  }

  return foundBooking
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteBooking,
}
