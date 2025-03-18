"use client";
import { useEffect, useState } from 'react';
import Star from './svg/Star';
import CheckCircleSelected from './svg/CheckCircleSelected';
import CheckCircleUnselected from './svg/CheckCircleUnselected';
import getAllVishCategories from '@/app/libs/getAllVishCategories';

export default function VishFooter() {
  const [filter, setFilter] = useState<'popular' | 'latest' | null>(null);
  const [starCategories, setStarCategories] = useState<{ color: string; label: string }[]>([]);

  const toggleFilter = (selectedFilter: 'popular' | 'latest') => {
    if (filter === selectedFilter) {
      setFilter(null);
    } else {
      setFilter(selectedFilter);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllVishCategories();
        const categories = data.categories.map((item: any) => ({
          color: item.color,
          label: item.category_name,
        }));
        setStarCategories(categories);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 text-white py-1 px-6 bg-gray-900">
      <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4 p-2">
        <div className="flex flex-wrap gap-4 p-1 border border-white rounded-xl">
          {starCategories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-1 p-1 rounded"
            >
              <Star width={52} height={52} fillColor={category.color} />
              <span className="text-[12px] font-light">{category.label}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-12 p-2 rounded-md">
          <div
            className="flex gap-1 items-center mb-0 cursor-pointer"
            onClick={() => toggleFilter('popular')}
          >
            {filter === 'popular' ? (
              <CheckCircleSelected width={24} height={24} />
            ) : (
              <CheckCircleUnselected width={24} height={24} />
            )}
            <span className="ms-2 text-[16px] font-normal">ความนิยม</span>
          </div>

          <div
            className="flex gap-1 items-center mb-0 cursor-pointer"
            onClick={() => toggleFilter('latest')}
          >
            {filter === 'latest' ? (
              <CheckCircleSelected width={24} height={24} />
            ) : (
              <CheckCircleUnselected width={24} height={24} />
            )}
            <span className="ms-2 text-[16px] font-normal">ล่าสุด</span>
          </div>
        </div>

        <div className="flex items-center gap-4 px-4 py-2">
          <button className="flex items-center justify-center w-12 h-12 bg-[#4C5F79] rounded-md hover:bg-gray-400 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#B3D4E6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
          <span className="text-[24px] font-normal">สร้างดวงดาวแห่งคำขอของคุณ</span>
        </div>
      </div>
    </div>
  );
}
