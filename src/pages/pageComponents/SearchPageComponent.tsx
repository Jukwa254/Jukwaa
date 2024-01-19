import { useEffect, useRef, useState } from "react";
import CenterPanelNavBar from "../../components/CenterPanelNavBar";
import { SearchIcon } from "../../components/Icons";
import { PostItem } from "./ProfilePageComponent";
import Skeleton from "react-loading-skeleton";
import { NewPostsComponent } from "./PostPageComponent";
import { CenterPanelProps } from "./HomePageComponent";
import supabase from "../../config/superbaseClient";

const SearchPageComponent: React.FC<CenterPanelProps> = ({
  onCardClick,
  selectedCard,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<PostItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  let debounceTimeout: string | number | NodeJS.Timeout | undefined;

  const debounceSearch = (term: any) => {
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      performSearch(term);
    }, 300);
  };

  const performSearch = async (term: any) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("posts")
      .select()
      .ilike("projectTitle", `%${term}%`);

    if (error) {
      console.error("Search error:", error);
      setIsLoading(false);
    } else {
      setSearchResults(data);
      setIsLoading(false);
    }
  };

  const handleSearchChange = async (event: { target: { value: any } }) => {
    const term = event.target.value;
    setSearchTerm(term);

    if (term.length > 0) {
      debounceSearch(term);
    } else {
      setSearchResults([]);
    }
  };

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

  return (
    <div>
      {" "}
      <div
        className="h-screen text-strokeLight overflow-y-auto no-scrollbar pb-10 lg:mx-4 mt-4 bg-BackgroundTwo lg:rounded-xl p-2 lg:p-4"
        ref={centerPanelRef}
      >
        <CenterPanelNavBar title={"Search"} />
        <div>
          <div>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <SearchIcon />
              </div>
              <input
                onChange={handleSearchChange}
                type="text"
                value={searchTerm}
                className="block w-full px-4 py-2 ps-10 rounded-lg bg-darkBackgroundOne border focus:border-accent border-strokeDark placeholder:text-textOne focus:outline-none focus:ring focus:ring-accent"
                placeholder="Search any Post..."
                required
              />
            </div>
          </div>
          {isLoading ? (
            <div className="mt-4">
              <Skeleton height={100} />
              <Skeleton height={100} />
              <Skeleton height={100} />
              <Skeleton height={100} />
              <Skeleton height={100} />
            </div>
          ) : (
            searchTerm.length > 0 && (
              <div className="mt-8">
                {searchResults.map((result) => (
                  <div className="mt-4">
                    <NewPostsComponent
                      key={result.id}
                      card={result}
                      onCardClick={onCardClick}
                      selectedCard={selectedCard}
                    />
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPageComponent;

export const Spinner = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
    </div>
  );
};
