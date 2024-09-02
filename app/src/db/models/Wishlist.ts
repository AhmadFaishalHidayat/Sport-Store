import { ObjectId } from "mongodb"
import db from "../config/MongoDB"
import { z } from "zod"

const WishlistSchema = z.object({
    productId: z.instanceof(ObjectId),
    userId: z.instanceof(ObjectId),
    createdAt : z.string(),
    updatedAt : z.string(),
});

type WishlistType = {
    productId: ObjectId;
    userId: ObjectId;
    createdAt?: string;
    updatedAt?: string;
}



export default class Wishlist {
    static collection() {
        return db.collection<WishlistType>("wishlists");
    }

    static async getAll(userId: string){
        
        // const wishlist = await this.collection().find({
        //     _id: new ObjectId(String(userId)),
        // }).toArray()
        const wishlist = this.collection().aggregate(
            [
              {
                $match: {
                  userId: new ObjectId(String(userId))
                }
              },
              {
                $lookup: {
                  from: 'products',
                  localField: 'productId',
                  foreignField: '_id',
                  as: 'products'
                }
              },
              {
                $unwind: {
                  path: '$users',
                  preserveNullAndEmptyArrays: true
                }
              },
              { $sort: { _id: -1 } }
            ],
            { maxTimeMS: 60000, allowDiskUse: true }
          ).toArray()

        return wishlist;
    };
    
    static async getById(id: string) {
        const wishlist = await this.collection().findOne({
            _id: new ObjectId(String(id)),
        });

        if (!wishlist) {
            let error = new Error("Wishlist Not Found")
            error.name = "NotFound";
            throw error;
        }
        return wishlist
    }

    static async create(payload: WishlistType) {
        const parsedData = WishlistSchema.safeParse(payload);
        console.log(parsedData, "MODEEELLLL");
        
        if (!parsedData.success) {
            throw parsedData.error;
        }
        const checkWishlist = await this.collection().findOne({
          userId: payload.userId, productId: payload.productId
        })
        console.log(checkWishlist);
        if (checkWishlist) {
          let error = new Error("This product is already on My Wishlists List")
          error.name = "BadRequest";
          console.log(error);
          
          throw error;
        }
        await this.collection().insertOne(payload);
        return "Success Add Wishlist"
    }

    static async delete(id : string){
      console.log(id, "MODEELLLL");
      
        // return await this.collection.deleteOne({productId: new ObjectId(productId)})
        // return await this.collection().deleteOne({productId: new ObjectId(productId)})
        return await this.collection().deleteOne({_id: new ObjectId(String(id))})
    }
}