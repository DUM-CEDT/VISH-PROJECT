import GreaterSign from "../svg/GreaterSign";
import LessSign from "../svg/LessSign";
import Share from "../svg/Share";
import Buy from "../svg/Buy";
import Download from "../svg/Download";
import Google from "../svg/Google";

export default function Button3({
  size = 16,
  text = "ตัวหนังสือ",
  icon = "",
  front = false,
  onClick,
}: {
  size?: number;
  text?: string;
  icon?: string;
  front?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      className="
        bg-white hover:bg-secondary active:bg-primary
        text-secondary hover:text-white active:text-white
        font-regular 
        py-2 px-8 
        rounded-full
        border-2
        border-[#86AFD3] hover:border-white active:border-white
        transition-all duration-300 ease-in-out
        group
        flex
        flex-row
        items-center
        justify-center
        gap-2
        
      "
      style={{ fontSize: `${size}px` }}
      onClick={onClick}>

      {front === false ? text : null}

      {icon === 'GreaterSign' ? <GreaterSign width={size} height={size} className="fill-black group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}
      {icon === 'LessSign' ? <LessSign width={size} height={size} className="fill-black group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}
      {icon === 'Share' ? <Share width={size} height={size} className="fill-black group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}
      {icon === 'Download' ? <Download width={size} height={size} className="fill-black group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}
      {icon === 'Buy' ? <Buy width={size} height={size} className="fill-black group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}
      {icon === 'Google' ? <Google width={size} height={size} className="group-hover:fill-white transition-all duration-300 ease-in-out"/> : null}

      {front === true ? text : null}
      
    </button>
  );
}
