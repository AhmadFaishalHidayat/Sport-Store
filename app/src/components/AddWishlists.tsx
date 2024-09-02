"use client";

import { ObjectId } from "mongodb";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export default function AddWishlist({ productId }: { productId: ObjectId }) {
  const router = useRouter();
  

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/wishlists`, {
      method: "POST",
      body: JSON.stringify({
        productId,
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await res.json();
    console.log(response);

    if (!res.ok) {
      alert(response.error || response.err)
      if (response.err === "Unauthorized") {
        window.location.href = "/login"
        
      }
      return router.push("/products?errors=" + response.error);
    }

    alert("Success add to Wishlists");
    router.push("/wishlists");
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit" className="btn btn-primary">Add WishList</button>
    </form>
  );
}
