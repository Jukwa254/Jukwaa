import { useEffect, useRef } from "react";
import CenterPanelNavBar from "../../components/CenterPanelNavBar";
import { SearchIcon } from "../../components/Icons";

const SearchPageComponent = () => {
  const centerPanelRef = useRef<HTMLDivElement>(null);

  const saveScrollPosition = () => {
    if (centerPanelRef.current) {
      localStorage.setItem(
        "centerPanelScroll",
        centerPanelRef.current.scrollTop.toString()
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
    restoreScrollPosition(centerPanelRef, "centerPanelScroll");

    window.addEventListener("resize", saveScrollPosition);
    return () => {
      window.removeEventListener("resize", saveScrollPosition);
    };
  }, []);

  useEffect(() => {
    const centerPanel = centerPanelRef.current;
    centerPanel?.addEventListener("scroll", saveScrollPosition);
    return () => {
      centerPanel?.removeEventListener("scroll", saveScrollPosition);
    };
  }, []);

  return (
    <div>
      {" "}
      <div
        className="h-screen text-strokeLight overflow-y-auto no-scrollbar pb-10 lg:mx-4 mt-4 bg-BackgroundTwo lg:rounded-xl p-2 lg:p-4"
        ref={centerPanelRef}
      >
        <CenterPanelNavBar title={"Search"} />
        <div>
          <div className="relative mt-4">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <SearchIcon />
            </div>
            <input
              //   onChange={handleSearchChange}
              type="text"
              //   value={}
              className="block w-full px-4 py-2 ps-10 rounded-lg bg-BackgroundOne border focus:border-accent border-BackgroundAccent placeholder:text-textOne focus:outline-none focus:ring focus:ring-accent"
              placeholder="Search any Post..."
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPageComponent;
