// import { MyResponse, Product } from "@/app/type";
// import productsModel from "@/db/models/product";
import { z } from "zod"
import { NextResponse } from "next/server";
import Product from "@/db/models/Product";
export const dynamic = "force-dynamic"

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")
    const page = searchParams.get("page")
    const products = await Product.getAll(search, page);
    console.log(products);
    
    return Response.json({ data: products });

}

// export async function POST(request: Request) {
//     try {
//         const body = await request.json();
//         const result = await Product.create(body);
//         return Response.json({ data: result, body });
//     } catch (error) {
//         if (error instanceof z.ZodError) {
//             return Response.json(
//                 {error: error.issues.map((el) => el.path[0] + " " + el.message )},
//                 {status: 400}
//             );
//         }
//         return Response.json({error}, { status: 500 });
//     }
// }

