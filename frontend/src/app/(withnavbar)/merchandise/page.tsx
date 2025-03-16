"use client";
import MerchandiseChoice from "@/components/button/MerchandiseChoice";

export default function MerchandisePage() {
    const handleSelection = (selected: string) => {
        console.log("Selected merchandise type:", selected);
        // Add logic here (e.g., fetch merchandise data for the selected type)
      };

      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-3xl font-semibold text-white mb-6">Choose Merchandise</h1>
          <MerchandiseChoice onSelect={handleSelection} />
          <div className="mt-6 text-white">
            {/* Display merchandise based on selection */}
            <p>Selected: {typeof handleSelection === "function" ? "None" : "N/A"}</p>
          </div>
        </div>
      );
}