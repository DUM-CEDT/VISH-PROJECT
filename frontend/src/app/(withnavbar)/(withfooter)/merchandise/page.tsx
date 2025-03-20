"use client";
import MerchandiseChoice from "@/components/button/MerchandiseChoice";
import NavButton from "@/components/button/NavButton";
import MerchBanner from "@/components/MerchBanner";
import MerchGrid from "@/components/MerchGrid";
import GreaterSign from "@/components/svg/GreaterSign";
import LessSign from "@/components/svg/LessSign";
import { useState, useEffect } from "react";
import getAllMerch from "@/app/libs/getAllMerch";
import { useRouter } from "next/navigation";
import Image from "next/image";
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
    description? :string;
}

export default function MerchandisePage() {
    const router = useRouter();
  const [selectedItem, setSelectedItem] = useState("all");
  const [sliderPos, setSliderPos] = useState(0);
  const [loading, setLoading] = useState(true);
  const [merch, setMerch] = useState<MerchItem[]>([]);
  const [merchInitial , setMerchInitial] = useState<MerchItem[]>([]);
  const [merchInitialSet, setMerchInitialSet] = useState(false);
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
          description: item.description
        }));
  
        setMerch(mappedItems || []);
        setPagination(data.pagination || null);

        if (!merchInitialSet) { // Only set if not already set
            setMerchInitial(mappedItems);
            setMerchInitialSet(true);
          }

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
    setSliderPos((prev) => (prev - 1 + merchInitial.length) % merchInitial.length);
  };

  const handleNext = () => {
    setSliderPos((prev) => (prev + 1) % merchInitial.length);
  };

  const currentMerch = merchInitial[sliderPos];


  const handlePageChange = (newPage: number) => {
    if (
      newPage > 0 &&
      (pagination?.last_page ? newPage <= pagination.last_page : true)
    ) {
      setPage(newPage);
    }
  };

  const handleBannerClick = () => {
    if (currentMerch.id) {
      router.push(`/merchandise/${currentMerch.id}`);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Image
                    src="/star_5.png"
                    alt="star"
                    width={2000}
                    height={2000}
                    className='absolute z-0 opacity-[100%] pointer-events-none'
      />
      <div className=" z-1 w-full bg-subsecondary h-[76vh] text-white mt-[8vh] p-16">
        <div className=" w-full h-full border-white border-3 rounded-3xl flex items-center justify-center p-12">
          <div className="w-full h-full flex items-center">
            <div className="w-[7.5%]">
              <NavButton next={false} size={24} onClick={handlePrev} />
            </div>
            <div className="w-[85%] h-full">
                {merch.length > 0 ? (
                    <MerchBanner 
                    head={currentMerch.name}
                    desc={currentMerch.description}
                    image={currentMerch.image || "/Yan.png"}
                    id={currentMerch.id}
                    onClick={handleBannerClick}
                    />
                ) : (
                    <div className="text-white flex justify-center items-center h-full">
                    Loading...
                    </div>
                )}
            </div>
            <div className="w-[7.5%] flex justify-end">
              <NavButton next={true} size={24} onClick={handleNext} />
            </div>
          </div>
        </div>
      </div>
      <div className="z-1 w-full h-[16vh] flex items-center justify-center">
        <MerchandiseChoice onSelect={handleSelection} />
      </div>
      <div className="z-1 w-full px-16">
      <Image
                    src="/star_5.png"
                    alt="star"
                    width={2000}
                    height={2000}
                    className='absolute z-0 opacity-[100%] pointer-events-none'
      />
        <MerchGrid
          items={merch} // Limit to 9 items for 3x3 grid
          loading={loading}
        />
      </div>
      <div className="z-2 overflow-hidden relative  w-full p-16 flex justify-center items-center gap-8">
         
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
        >
          <LessSign width={"20px"} height={"20px"} className="fill-white" />
        </button>
        <div className="z-1 font-regular text-[20px] text-white">
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
