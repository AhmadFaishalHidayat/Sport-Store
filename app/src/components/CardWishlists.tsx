"use client"
import { WishlistType } from "@/app/type";
import RemoveWishlist from "./RemoveWishlists";



export default function CardWishlists({ el }: { el: WishlistType }) {
  return (
    <div className="mb-5">
      
        <div className="card card-side bg-base-100 shadow-xl">
          <figure>
            <img className="h-72 w-64" src={el.products[0].thumbnail} alt="Movie" />
          </figure>
          <div className="card-body">
            <div className="flex justify-between">
            <h2 className="card-title">{el.products[0].name}</h2>
            <div className="card-actions justify-end">
              <RemoveWishlist id={el._id} />
            </div>
            </div>
            <p>{el.products[0].description}</p>
            <p>{el.products[0].excerpt}</p>
            <p>Rp. {el.products[0].price.toLocaleString('id-ID')},-</p>
          </div>
        </div>
      
    </div>
  );
}
