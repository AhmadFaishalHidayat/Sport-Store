import { ObjectId } from "mongodb";
import db from "../config/MongoDB";
import { z } from "zod";
import { hashPassword } from "../helpers/bcrypt";

const UserSchema = z.object({
    name: z.string(),
    username: z.string().min(1),
    password: z.string().min(6),
    email: z.string().email().min(1),
});

type UserType = z.infer<typeof UserSchema>;

class User {
    static collection() {
        return db.collection<UserType>("users");
    }

    static async getAll(){
        const users = await this.collection().find().toArray();
        return users;
    }

    static async getById(id: string){
        const product = await this.collection().findOne({
            _id: new ObjectId(String(id))
        });

        if (!product) {
            let error = new Error("Product Not Found");
            error.name = "NotFound";
            throw error;
        }

        return product;
    }

    static async getUserByEmail(email: string) {
        const user = await this.collection().findOne({
            email
        })
        return user
    }

    static async create(payload: UserType) {
        const parsedData = UserSchema.safeParse(payload);
        if (!parsedData.success) {
            throw parsedData.error;
        }
        payload.password = hashPassword(payload.password);

        await this.collection().insertOne(payload);
        return "success register"
    }
}

export default User;