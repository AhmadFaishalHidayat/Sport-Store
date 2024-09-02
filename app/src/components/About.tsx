export default function About() {
  return (
    <>
      <div className="hero bg-base-200 min-h-screen">
        <div className="hero-content flex-col lg:flex-row">
          <img
            src="/assets/SPORT.png"
            alt=""
            // src={logo}
            className="max-w-sm rounded-lg shadow-2xl"
          />
          <div className="flex-row ml-10">
            <div>
              <h1 className="text-5xl font-bold">Tentang SPORTS STORE!</h1>
              <p className="py-6">
                Selamat datang di SPORTS STORE, destinasi utama Anda untuk
                segala kebutuhan olahraga! Apakah Anda seorang atlet
                profesional, penggemar kebugaran, atau seseorang yang hanya suka
                tetap aktif, kami siap membantu Anda.
              </p>
            </div>
            <div>
              <h1 className="text-5xl font-bold">Misi Kami!</h1>
              <p className="py-6">
                Di SPORTS STORE, misi kami adalah menyediakan perlengkapan dan
                pakaian olahraga berkualitas tinggi yang memberdayakan Anda
                untuk mencapai performa terbaik. Kami percaya bahwa peralatan
                yang tepat dapat membuat perbedaan besar, dan kami berdedikasi
                untuk menghadirkan produk terbaik dari merek-merek terkemuka di
                seluruh dunia.
              </p>
            </div>
            <div>
              <h1 className="text-5xl font-bold">Hubungi Kami!</h1>
              <p className="py-6">
                Kami senang mendengar dari Anda! Jika Anda memiliki pertanyaan,
                masukan, atau membutuhkan bantuan, jangan ragu untuk menghubungi
                tim dukungan pelanggan kami. Kami di sini untuk membantu Anda
                mencapai tujuan kebugaran Anda dan menikmati pengalaman
                berbelanja di SPORTS STORE.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
