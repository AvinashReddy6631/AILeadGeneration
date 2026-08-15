import mongoose, { Schema, type Model } from 'mongoose'

export interface UserDocument extends mongoose.Document {
  name: string
  email: string
  passwordHash: string
  createdAt: Date
  updatedAt: Date
}

const userSchema = new Schema<UserDocument>({
  name: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
  passwordHash: { type: String, required: true, select: false },
}, { timestamps: true })

export const User = (mongoose.models.User as Model<UserDocument>) || mongoose.model<UserDocument>('User', userSchema)
