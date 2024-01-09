import { useEffect, useRef } from "react";
import Image from "../assets/images/signup-image.png";

export type RightPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const RightPanel: React.FC<RightPanelProps> = ({ isOpen, onClose }) => {
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const saveScrollPosition = () => {
    if (rightPanelRef.current) {
      localStorage.setItem(
        "rightPanelScroll",
        rightPanelRef.current.scrollTop.toString()
      );
    }
  };
  const restoreScrollPosition = (
    ref: React.RefObject<HTMLDivElement>,
    key: string
  ) => {
    const savedScrollPosition = parseInt(localStorage.getItem(key) || "0", 10);
    if (ref.current) {
      ref.current.scrollTop = savedScrollPosition;
    }
  };

  useEffect(() => {
    restoreScrollPosition(rightPanelRef, "rightPanelScroll");
    window.addEventListener("resize", saveScrollPosition);
    return () => {
      window.removeEventListener("resize", saveScrollPosition);
    };
  }, []);

  useEffect(() => {
    const rightPanel = rightPanelRef.current;
    rightPanel?.addEventListener("scroll", saveScrollPosition);
    return () => {
      rightPanel?.removeEventListener("scroll", saveScrollPosition);
    };
  }, []);

  return (
    <div
      className="lg:h-screen flex flex-col py-4 overflow-y-auto no-scrollbar"
      ref={rightPanelRef}
    >
      <div
        className={`md:relative transform top-0 right-0 w-full h-full transition-transform duration-300 ${
          isOpen
            ? "absolute translate-x-0"
            : "fixed translate-x-full md:translate-x-0"
        }`}
      >
        <div>
          <PostComment />
        </div>
      </div>
    </div>
  );
};

export default RightPanel;

function PostComment() {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleChange = () => {
    adjustTextareaHeight();
  };

  return (
    <div className="">
      <div className="bg-[#F6F6F6] p-4">
        <div className="flex gap-4">
          <img src={Image} alt="" className="w-12 h-12 rounded-full" />
          <textarea
            ref={textareaRef}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#6C2D1B] w-full"
            style={{
              overflow: "hidden", // Hide the scrollbar
            }}
            rows={1} // Initial number of rows
            placeholder="Post your comment..."
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mt-2 flex justify-between items-start">
          <div className="flex gap-2 mt-2">
            {/* <span className="text-2xl text-[#6E7685]">
              <BiImage />
            </span>
            <span className="text-2xl text-[#6E7685]">
              <RiAttachmentLine />
            </span>
            <span className="text-2xl text-[#6E7685]">
              <BiCamera />
            </span> */}
          </div>
          <a
            href=""
            className="bg-[#6C2D1B] hover:bg-[#977268] px-4 py-1.5 text-white rounded-lg"
          >
            Post
          </a>
        </div>
      </div>
    </div>
  );
}