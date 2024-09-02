import { ProductType } from "@/app/type";
import AddWithlist from "@/components/AddWishlists";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function DetailProduct({
  params,
}: {
  params: { slug: string };
}) {
  console.log(params.slug, "SLUGGGGGG");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/products/${params.slug}`,
    {
      cache: "no-store",
    }
  );
  const data: { data: ProductType } = await res.json();
  console.log(data);

  return (
    <div>
      <div className="min-h-screen mx-16 mt-8">
        <p>home-products-{params.slug}</p>
        <div className="card card-side bg-base-100 shadow-xl">
          <div className="flex flex-col">
            <figure>
              <img src={data.data.thumbnail} alt="" />
            </figure>
            <div className="flex gap-3 my-2">
              {data.data.images.map((el, idx) => (
                <img key={idx} className="w-20 h-20" src={el} alt="" />
              ))}
            </div>
          </div>
          <div className="card-body">
            <h2 className="card-title">{data.data.name}</h2>
            <div className="space-y-2 mb-10">
              <p>Deskripsi:</p>
              <p>{data.data.description}</p>
              <p>{data.data.excerpt}</p>
            </div>
            <p>Rp. {data.data.price.toLocaleString("id-ID")},-</p>

            <div className="card-actions justify-end">
              <AddWithlist productId={data.data._id} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const product = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}api/products/${slug}`
  ).then((res) => res.json());

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  console.log(product.data.image);

  return {
    title: product.data.name,
    description: product.data.description,
    openGraph: {
      images: [product.data.thumbnail, ...previousImages],
    },
  };
}
