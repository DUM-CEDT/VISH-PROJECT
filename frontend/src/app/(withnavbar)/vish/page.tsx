"use client";
import VishCard from "@/components/VishCard";
import Footer from "@/components/VishFooter";

const wishes = [
  { message: "ขอให้สุขภาพแข็งแรง ไม่ป่วยง่าย หายปวดหลัง...", wishes: 100 },
  { message: "ขอให้มีแฟนภายในปีนี้ สาธุ เพี้ยง ๆ", wishes: 101 },
  { message: "ขอให้รวย ๆ เงินทองไหลมาเทมา", wishes: 120 },
];

export default function AllWishesPage() {
  return (
    <div className="min-h-screen flex flex-col pt-20 px-10 pb-24">
      <div className="flex w-full h-full flex-1">
        <div className="flex flex-col gap-6 flex-1 p-4 min-h-screen">
          {wishes.map((wish, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-2 rounded-lg ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <div className="bg-yellow-500 w-10 h-10 rounded-full"></div>
              <VishCard message={wish.message} wishes={wish.wishes} />
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-6 flex-1 p-4 min-h-screen">
          {wishes.map((wish, index) => (
            <div
              key={index}
              className={`flex items-center gap-4 p-2 rounded-lg ${
                index % 2 === 0 ? "flex-row" : "flex-row-reverse"
              }`}
            >
              <div className="bg-gray-500 w-10 h-10 rounded-full"></div>
              <VishCard message={wish.message} wishes={wish.wishes} />
            </div>
          ))}
        </div>
      </div>
      
      <Footer />
    </div>
  );
}