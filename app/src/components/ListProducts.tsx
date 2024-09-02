"use client";
import React from "react";
import { AiFillHeart } from "react-icons/ai";
import AddWithlist from "./AddWishlists";
import Link from "next/link";

import { ProductType } from "@/app/type";

export default function ListProducts({ el }: { el: ProductType }) {
  return (
    // <div className="mx-14 my-10 min-h-screen">
    // <div className="flex flex-wrap gap-10 justify-start mt-10">
    <div className="card bg-base-100 w-80 shadow-xl">
      <figure>
        <img
          src={el.thumbnail}
          alt="Shoes"
          className="h-60 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {el.name}
          <div className="card-actions justify-end">
            <button>
              <AiFillHeart />
            </button>
          </div>
        </h2>
        <p>Rp.{el.price?.toLocaleString("id-ID")}</p>

        <div className="card-actions justify-end">
          <Link href={`/products/${el.slug}`} className="btn btn-primary">
            Show Details
          </Link>
          <AddWithlist productId={el._id} />
        </div>
      </div>
    </div>
    // </div>
    // </div>
  );
}
