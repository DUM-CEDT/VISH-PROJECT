"use client";
import MerchandiseChoice from "@/components/button/MerchandiseChoice";
import NavButton from "@/components/button/NavButton";
import MerchBanner from "@/components/MerchBanner";
import MerchGrid from "@/components/MerchGrid";
import GreaterSign from "@/components/svg/GreaterSign";
import LessSign from "@/components/svg/LessSign";
import { useState, useEffect } from "react";
import getAllMerch from "@/app/libs/getAllMerch";

interface Pagination {
  total_items: number;
  total_pages: number;
  last_page: number;
  current_page: number;
  limit: number;
}

interface MerchItem {
    name: string;
    price: number;
    image?: string;
    id: string;
}

export default function MerchandisePage() {
  const [selectedItem, setSelectedItem] = useState("all");
  const [sliderPos, setSliderPos] = useState(0);
  const [loading, setLoading] = useState(true);
  const [merch, setMerch] = useState<MerchItem[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [page, setPage] = useState(1);

  const [cache, setCache] = useState<Record<string, { items: MerchItem[]; pagination: Pagination }>>({});

  const fetchMerchandise = async () => {
    const cacheKey = `${page}-${selectedItem}`;
    setLoading(true);

    if (cache[cacheKey]) {
        setMerch(cache[cacheKey].items);
        setPagination(cache[cacheKey].pagination);
        setLoading(false);
        return;
      }

    try {
        const typeFilter = selectedItem === "all" ? undefined : selectedItem;
        const data = await getAllMerch(page, 9, typeFilter);
  
        const mappedItems = data.items.map((item: any) => ({
          id: item._id,
          name: item.name,
          price: item.price,
          image: item.image,
        }));
  
        setMerch(mappedItems || []);
        setPagination(data.pagination || null);

        setCache((prevCache) => ({
            ...prevCache,
            [cacheKey]: { items: mappedItems, pagination: data.pagination },
          }));
    } catch (error) {
      console.error("Error fetching merchandise:", error);
      setMerch([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMerchandise();
  }, [selectedItem, page]);

  const handleSelection = (selected: string) => {
    console.log("Selected merchandise type:", selected);
    setSelectedItem(selected);
    setPage(1); // Reset to first page when changing type
  };

  const handlePrev = () => {
    setSliderPos((prev) => (prev - 1 + merchArray.length) % merchArray.length);
  };

  const handleNext = () => {
    setSliderPos((prev) => (prev + 1) % merchArray.length);
  };

  const merchArray = [
    {
      head: "YanTra",
      desc: undefined,
      image: "/Yan.png",
    },
    {
      head: "Gear",
      desc: undefined,
      image: "/Gear.png",
    },
    {
      head: "Cap",
      desc: "Stylish cap for sunny days.",
      image: undefined,
    },
    {
      head: "Mug",
      desc: "Ceramic mug for your favorite beverages.",
      image: undefined,
    },
  ];

  const currentMerch = merchArray[sliderPos];

  const handlePageChange = (newPage: number) => {
    if (
      newPage > 0 &&
      (pagination?.last_page ? newPage <= pagination.last_page : true)
    ) {
      setPage(newPage);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="w-full bg-subsecondary h-[76vh] text-white mt-[8vh] p-16">
        <div className=" w-full h-full border-white border-3 rounded-3xl flex items-center justify-center p-12">
          <div className="w-full h-full flex items-center">
            <div className="w-[7.5%]">
              <NavButton next={false} size={24} onClick={handlePrev} />
            </div>
            <div className="w-[85%] h-full">
              <MerchBanner
                head={currentMerch.head}
                desc={currentMerch.desc}
                image={currentMerch.image}
              />
            </div>
            <div className="w-[7.5%] flex justify-end">
              <NavButton next={true} size={24} onClick={handleNext} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[16vh] flex items-center justify-center">
        <MerchandiseChoice onSelect={handleSelection} />
      </div>
      <div className="w-full px-16">
        <MerchGrid
          items={merch} // Limit to 9 items for 3x3 grid
          loading={loading}
        />
      </div>
      <div className="w-full p-16 flex justify-center items-center gap-8">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          <LessSign width={"20px"} height={"20px"} className="fill-white" />
        </button>
        <div className="font-regular text-[20px] text-white">
          หน้าที่ {pagination?.current_page || 1} / {pagination?.last_page || 1}
        </div>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={
            pagination?.last_page ? page >= pagination.last_page : false
          }
        >
          <GreaterSign width={20} height={20} className="fill-white" />
        </button>
      </div>
      {/* <div className="text-white">
        <p>Selected: {selectedItem || "None"}</p>
      </div> */}
    </div>
  );
}
