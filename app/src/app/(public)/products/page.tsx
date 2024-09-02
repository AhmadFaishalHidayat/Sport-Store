"use client";
import { ProductType } from "@/app/type";
import AddWithlist from "@/components/AddWishlists";
import ListProducts from "@/components/ListProducts";
import Search from "@/components/Search";
import Product from "@/db/models/Product";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiFillHeart } from "react-icons/ai";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Products() {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  async function getProducts() {
    let url = `${process.env.NEXT_PUBLIC_BASE_URL}api/products?page=${page}`;
    if (search) {
      url = `${process.env.NEXT_PUBLIC_BASE_URL}api/products?search=${search}`;
      setPage(1);
    }

    const res = await fetch(url);
    const data: { data: ProductType[] } = await res.json();
    console.log(data);
    if (search) {
      setProducts(data.data);
      setHasMore(false);
    } else {
      setProducts((prev) => {
        return [...prev, ...data.data];
      }); // menambahkan data ke data products, dengan tidak menghapus data sebelumnya
      setPage(page + 1);
      if (data.data.length === 0) {
        setHasMore(false);
      }
    }
  }

  console.log(products);

  useEffect(() => {
    getProducts();
  }, [search]);

  return (
    <>
      <div className="mx-14 my-10 min-h-screen">
        <Search search={search || ""} setSearch={setSearch} />
        <InfiniteScroll
        dataLength={products.length}
        next={getProducts}
        hasMore={hasMore}
        loader={<div>Loading...</div>}
        >
          <div className="grid md: grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 justify-start mt-10">
            {products.map((products, index) => (
              <ListProducts key={index} el={products} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </>
  );
}
