import About from "@/components/About";
import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import LatestProduct from "@/components/LatestProduct";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Banner />
      <div className="mx-20">
        <h1 className="text-2xl font-bold py-5">Shop Our Category</h1>
        <button>
        <img src="/assets/shopcategori.png" alt="" />
        </button>
      </div>
      <div className="mx-20 my-10">
        <h1 className="text-2xl font-bold pt-5">Latest Product</h1>
        <LatestProduct />
      </div>

      <div className="mx-20 my-10">
        <h1 className="text-2xl font-bold py-5">Shop By Size</h1>
        <button>
        <img src="/assets/shopsize.png" alt="" />
        </button>
      </div>
      <div className="mx-20 my-10">
        <h1 className="text-2xl font-bold py-5">Explore More</h1>
        <button>
        <img src="/assets/explor1.png" alt="" className="pb-5 w-full" />
        <img src="/assets/explor2.png" alt="" className="w-full" />
        </button>
      </div>
      <About />
      <Footer />
    </div>
  );
}
