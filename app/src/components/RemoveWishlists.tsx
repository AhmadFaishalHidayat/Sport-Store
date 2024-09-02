"use client"

import { ObjectId } from "mongodb";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";


export default function RemoveWishlist({id}:{id:ObjectId}) {
  const router = useRouter()
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}api/wishlists`, {
      method: "DELETE",
      body: JSON.stringify({
        id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    const response = await res.json();
    console.log(response);
  
    if (!res.ok) {
      alert(response.error)
      return router.push("/wishlists?errors=" + response.message);
    }
  
    alert("Success delete Wishlists");
    window.location.href = "/wishlists"
  };
  return (
    <>
    <form onSubmit={handleSubmit}>
      <button type="submit" className="btn btn-ghost btn-sm bg-red-500 rounded-full text-xs">X</button>
    </form>
    </>
  );
}
