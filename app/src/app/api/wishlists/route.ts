import Wishlist from "@/db/models/Wishlist"
import { ObjectId } from "mongodb"
import { NextRequest, NextResponse } from "next/server";
import { string, z } from "zod"

export async function GET(request:Request) {
    const userId = request.headers.get("x-id") as string;
    const wishlist = await Wishlist.getAll(userId);
    console.log(wishlist, "APIIIIII");
    
    return Response.json(
        {
            data: wishlist
        }
    )
}

export async function POST(request:Request) {
    try {
        const userId = request.headers.get("x-id") as string;
        console.log(userId, "APIIIII");
        
        const body: { productId: string } = await request.json();
        const wishlist = await Wishlist.create({
            productId: new ObjectId(String(body.productId)),
            userId: new ObjectId(String(userId)),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        });
        return Response.json({
            data: wishlist,
        });    
    } catch (error:any) {
        console.log(error);
        
        if (error instanceof z.ZodError) {
            return Response.json(
                {
                    error: error.issues.map((el) => el.path[0] + " " + el.message),
                },
                { status: 400 }
            )
        } else if (error.name ==="BadRequest") {
            return Response.json(
                {
                    error: error.message,
                },
                { status: 400 }
            )
        }
        else {
            return Response.json(
                {
                    message: "Internal Server Error"
                },
                {
                    status: 500
                }
            )
        }
    }
}

export async function DELETE(request : NextRequest){
    try {
        const body = await request.json()
        console.log(body, "apiiiiii");
        
        const result = await Wishlist.delete(body.id)
        return NextResponse.json({message : 'Success delete'})
        
    } catch (error) {
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
    
}