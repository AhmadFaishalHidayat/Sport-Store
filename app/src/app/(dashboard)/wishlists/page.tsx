"use client";
import { WishlistType } from "@/app/type";
import CardWishlists from "@/components/CardWishlists";
import { useEffect, useState } from "react";

export default function Wishlists() {
  const [wishlists, setWishlists] = useState<WishlistType[]>([]);

  const getWishlists = async () => {
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}api/wishlists`;
    const res = await fetch(url);
    const data: { data: WishlistType[] } = await res.json();
    console.log(data.data, "dalem function");
    setWishlists(data.data);
  };
  // console.log(wishlists, "<<<<<<<<<<>>>>>>>>>>>>>>>>>");

  useEffect(() => {
    getWishlists();
  }, []);
  return (
    <div className="mx-10 my-10">
      <div className="mb-10 px-3">
        <h1 className="underline text-4xl text-center">My WishLists</h1>
      </div>
      {wishlists.map((el, idx) => (
        <CardWishlists key={idx} el={el}/>
      ))}
    </div>
  );
}
