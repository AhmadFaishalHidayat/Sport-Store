import { ObjectId } from "mongodb";

export interface UserType {
  _id: ObjectId
  name: string
  username: string
  email: string
  password: string
}

export interface ProductType {
  _id: ObjectId
  name: string
  slug: string
  description: string
  excerpt: string
  price: Number
  tags: string[]
  thumbnail: string
  images: string[]
  createdAt: Date
  updatedAt: Date
}

export interface WishlistType {
  _id: ObjectId
  userId: ObjectId
  productId: ObjectId
  cretatedAt: Date
  updatedAt: Date
  products: ProductType[]
}


export interface MyResponse<T> {
  error? : string
  messsage? : string
  data? : T | null
}