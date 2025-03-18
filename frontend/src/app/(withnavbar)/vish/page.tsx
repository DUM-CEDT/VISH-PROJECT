"use client";
import { useState, useEffect } from 'react';
import VishCard from "@/components/VishCard";
import VishFooter from "@/components/VishFooter";
import Star from "@/components/svg/Star"; // ปรับ path
import { Vish } from '../../../../interface';
import getAllVishes from '@/app/libs/getAllVishes';
import getVishCategoryById from '@/app/libs/getVishCategoryById';

interface VishWithColor extends Vish {
  color: string;
}

export default function AllWishesPage() {
  const [vishes, setVishes] = useState<VishWithColor[]>([]);
  const [isVishLoading, setIsVishLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'popular' | 'latest'>('popular');

  useEffect(() => {
    async function fetchVishes() {
      try {
        setIsVishLoading(true);
        const data = await getAllVishes(0, 24, filter);
        const vishesWithColors = await Promise.all(
          data.vishes.map(async (vish: Vish) => {
            let color = '#FFFFFF';
            if (vish.category_list && vish.category_list.length > 0) {
              const categoryData = await getVishCategoryById(vish.category_list[0]);
              color = categoryData.category.color;
            }
            return { ...vish, color };
          })
        );
        setVishes(vishesWithColors);
        setIsVishLoading(false);
      } catch (err) {
        setError("Failed to load vishes or categories");
        setIsVishLoading(false);
      }
    }
    fetchVishes();
  }, [filter]);

  const handleFilterChange = (newFilter: 'popular' | 'latest') => {
    setFilter(newFilter);
  };

  const leftColumn = vishes.filter((_, index) => index % 2 === 0);
  const rightColumn = vishes.filter((_, index) => index % 2 !== 0);

  return (
    <div className="min-h-screen flex flex-col pt-20 px-10 pb-24">
      {isVishLoading ? (
        <div className="flex-1 flex items-center justify-center">
          Loading vishes...
        </div>
      ) : error ? (
        <div className="flex-1 flex items-center justify-center">
          {error}
        </div>
      ) : (
        <div className="flex w-full h-full flex-1">
          <div className="flex flex-col gap-6 flex-1 p-4 min-h-screen">
            {leftColumn.map((vish, index) => (
              <div
                key={vish._id}
                className={`flex items-center gap-4 p-2 rounded-lg ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <Star width={74} height={74} fillColor={vish.color} />
                <VishCard text={vish.text} vish_count={vish.vish_count} />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6 flex-1 p-4 min-h-screen">
            {rightColumn.map((vish, index) => (
              <div
                key={vish._id}
                className={`flex items-center gap-4 p-2 rounded-lg ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <Star width={74} height={74} fillColor={vish.color} />
                <VishCard text={vish.text} vish_count={vish.vish_count} />
              </div>
            ))}
          </div>
        </div>
      )}

      <VishFooter onFilterChange={handleFilterChange} />
    </div>
  );
}