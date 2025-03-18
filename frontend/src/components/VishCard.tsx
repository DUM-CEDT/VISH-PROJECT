"use client";

export default function VishCard({ 
  text, 
  vish_count 
}: { 
  text: string; 
  vish_count: number 
}) {
  return (
    <div className="relative border-2 border-white rounded-xl bg-primary p-6 text-white w-[320px] text-center">
      <p className="text-lg">{text}</p>
      <div className="flex justify-center items-center mt-4">
        <span className="mr-2">💖 {vish_count} WISHES</span>
      </div>
    </div>
  );
}