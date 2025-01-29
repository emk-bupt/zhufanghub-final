import BestHotels from "@/components/best-hotels/BestHotels";
import Hero from "@/components/hero/Hero";
import PopularLoctions from "@/components/popular-locatins/PopularLoctions";
import sea from '../../public/assets/sea.jpg'
import hotel_image from '../../public/assets/hr_10.jpg'

export default function Home() {
  return (
    <>
      <Hero
        image={sea}
        mainHeader="你准备好旅行了吗？"
        secondaryHeader="浏览热门地点 "
      />
      <PopularLoctions />
      <Hero 
      image={hotel_image}
      mainHeader="为您的酒店获取最佳优惠！"
      secondaryHeader="选择您想要的地方"
      />
      <BestHotels />
    </>
  );
}
