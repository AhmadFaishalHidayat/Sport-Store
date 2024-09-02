import Product from "@/db/models/Product";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: Request, { params }: { params: { slug: string } }) {
    try {
        const { slug } = params;
        const data = await Product.getBySlug(slug);        
        // console.log(data);
        
        return Response.json({data});

    } catch (error) {
        console.log(error);
        
    }
}