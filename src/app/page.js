import BestHotels from "@/components/best-hotels/BestHotels";
import Hero from "@/components/hero/Hero";
import PopularLoctions from "@/components/popular-locatins/PopularLoctions";
import sea from "../../public/assets/sea.jpg";
import hotel_image from "../../public/assets/hr_10.jpg";

export default function Home() {
  return (
    <>
      {/* First Hero with Search Bar */}
      <Hero
        image={sea}
        mainHeader="你准备好旅行了吗？"
        secondaryHeader="浏览热门地点"
        showSearch={true} // Enables search bar
      />
      <PopularLoctions />

      {/* Second Hero without Search Bar */}
      <Hero
        image={hotel_image}
        mainHeader="为您的酒店获取最佳优惠！"
        secondaryHeader="选择您想要的地方"
        showSearch={false} // No search bar
      />
      <BestHotels />
    </>
  );
}
