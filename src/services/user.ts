import User, { UserDocument } from '../models/User'
import { NotFoundError } from '../helpers/apiError'

const create = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const findById = async (userId: string): Promise<UserDocument> => {
  const foundUser = await User.findById(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const findUserByEmail = async (userEmail: string): Promise<UserDocument> => {
  const foundUser = await User.findOne({ email: userEmail })

  if (!foundUser) {
    throw new NotFoundError(`User with email ${userEmail} not found`)
  }
  return foundUser
}

const findOrCreate = async (userPayload: Partial<UserDocument>) => {
  return User.findOne({ email: userPayload.email })
    .exec()
    .then((user) => {
      if (!user) {
        const newUser = new User({
          email: userPayload.email,
          firstName: userPayload.firstName,
          lastName: userPayload.lastName,
        })
        newUser.save()
        console.log(newUser)
        return newUser
      }
      return user
    })
}

const findAll = async (): Promise<UserDocument[]> => {
  return User.find().sort({ title: 1, publishedYear: -1 })
}

const update = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
  })

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

const deleteUser = async (userId: string): Promise<UserDocument | null> => {
  const foundUser = User.findByIdAndDelete(userId)

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

export default {
  create,
  findById,
  findAll,
  update,
  deleteUser,
  findOrCreate,
  findUserByEmail,
}
