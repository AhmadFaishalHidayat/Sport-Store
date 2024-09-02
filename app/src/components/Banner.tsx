export default function Banner() {
  const banner = [
    "https://niitaka.co.id/wp-content/uploads/2022/09/TOP-banner-asics.jpg",
    "https://swift-thumbor.sirclocdn.com/unsafe/1366x552/filters:format(webp):quality(80)/https://bo.asics.co.id/media/weltpixel/owlcarouselslider/images/2/0/20240723_celebration-of-sport-banner-ecom-running-hompage-banner-1366xx552px.jpg",
    "https://images.tokopedia.net/img/cache/450/VCeHif/2022/11/2/d80fd315-9b77-4717-b425-efc58c22d426.jpg?ect=4g",
    "https://p-id.ipricegroup.com/media/Indah/banner_ASICS.jpg",
    "https://www.planetsports.asia/media/wysiwyg/NB_PLP_747x300.jpg",
    "https://eagle.co.id/wp-content/uploads/2024/07/PNR-PRIME-BANNER-Web-779X302-min.jpg",
  ];

  return (
    <div>
      <div className="carousel w-full h-[580px] rounded-lg pb-10">
        {banner.map((banner, index) => {
          return (
            <div key={index} className="carousel-item relative w-full">
              <img src={banner} alt="" className="w-full" />
              <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                <a href="#slide4" className="btn btn-circle">
                  ❮
                </a>
                <a href="#slide2" className="btn btn-circle">
                  ❯
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
