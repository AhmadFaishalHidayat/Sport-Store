import Link from "next/link";
import { ProductType } from "@/app/type";


export default async function LatestProduct() {
  const res = await fetch(process.env.NEXT_PUBLIC_BASE_URL + "api/products?_limit=5", {
    cache: "no-store",
  });
  const data: { data: ProductType[] } = await res.json();
  console.log();

  return (
    <div>
      <Link
        href="/products"
        className="grid justify-items-end underline mb-9 mr-7"
      >
        See-All
      </Link>

      <div className="lg:flex flex-wrap gap-9 sm:grid grid-cols-3 min-h-36">
        {data.data.slice(0, 5).map((el) => (
          <div
            className="card card-compact bg-base-100 w-60 h-72 shadow-xl"
            key={el.slug}
          >
            <figure>
              <img src={el.thumbnail} alt="Shoes" />
            </figure>
            <div className="card-body h-44">
              <h2 className="">{el.name}</h2>
              <p>${el.price.toLocaleString("id-ID")}</p>
              <div className="card-actions justify-end">
                <Link className="btn btn-primary" href={`/products/${el.slug}`}>
                  Show Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
