import { ObjectId } from "mongodb"
import db from "../config/MongoDB"
import { z } from "zod"
import { ProductType } from "@/app/type";

// const ProductSchema = z.object({
//     title: z.string().min(5),
//     price: z.number(),
//     description: z.string(),
//     category: z.string(),
//     image: z.string(),
//     rating: z.object({
//         rete: z.number(),
//         count: z.number(),
//     }),
// })

// type ProductTypeZod = z.infer<typeof ProductSchema>;

// type InputProductType = {
//     title: string;
//     description: string;
//     price: number;
// }


class Product {
    static collection(){
        return db.collection<ProductType>("products");
    }

    static async getAll(search: string | null, page: string | null) {
        let limit = 8;
        let currentPage = page || 1;

        const products = await this.collection()
        .find({ name: { $regex: search || "", $options: "i"}})
        .skip((Number(currentPage) -1) * limit)
        .limit(search ? 30 : limit)
        .toArray();
        console.log(products);
        
        return products;
    }

    static async getById(id: string) {
        const product = await this.collection().findOne({
            _id: new ObjectId(String(id)),
        });

        if (!product) {
            let error = new Error("product not found");
            error.name = "NotFound";
            throw error;
        }
        return product;
    }

    static async getBySlug(slug: string) {
        const product = await this.collection().findOne({
            slug
        });
        if (!product) {
            let error = new Error("product not found");
            error.name = "NotFound";
            throw error;
        }
        return product;
    }


    // static async create(payload: ProductType) {
    //     const parsedData = ProductSchema.safeParse(payload);
    //     if (!parsedData.success) {
    //         throw parsedData.error;
    //     }
    //     await this.collection().insertOne(payload);
    //     return "success add";
    // };
}

export default Product;