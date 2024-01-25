import { useEffect, useRef, useState } from "react";
import ProjectCard from "../../components/ProjectCard";
import CenterPanelNavBar from "../../components/CenterPanelNavBar";
import { PostItem } from "./ProfilePageComponent";
import supabase from "../../config/superbaseClient";
import Skeleton from "react-loading-skeleton";

export type CenterPanelProps = {
  onCardClick: (card: PostItem) => void;
  selectedCard: PostItem | null;
};

const HomePageComponent: React.FC<CenterPanelProps> = ({
  onCardClick,
  selectedCard,
}) => {
  const centerPanelRef = useRef<HTMLDivElement>(null);
  const [postCards, setPostCards] = useState<PostItem[] | null>(null);
  const [fetchError, setFetchError] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const fetchPostData = async () => {
      const { data, error } = await supabase.from("posts").select("*");
      // .eq("user_id", user?.id);

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        setPostCards(data);
      }
    };

    fetchPostData();
  }, [supabase]);

  useEffect(() => {
    const fetchPostCards = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from("posts").select();

      if (error) {
        setFetchError(error.message);
        setPostCards(null);
        console.log(error);
        setIsLoading(false);
      } else if (data) {
        setPostCards(data);
        setFetchError("");
        setIsLoading(false);

        localStorage.setItem("postCards", JSON.stringify(data));
        console.log(data);
      }
    };

    fetchPostCards();
  }, []);

  return (
    <div
      className="h-screen text-strokeLight overflow-y-auto no-scrollbar lg:py-4 pb-10"
      ref={centerPanelRef}
    >
      <div className="bg-BackgroundTwo p-4 lg:p-6 lg:rounded-xl lg:mx-3">
        <div>
          <CenterPanelNavBar title={"Explore"} />
        </div>
        {fetchError && <p>{fetchError}</p>}
        {isLoading ? (
          <div className="">
            <Skeleton height={320} />
            <Skeleton height={320} />
            <Skeleton height={320} />
          </div>
        ) : postCards && postCards.length > 0 ? (
          <div className="">
            {postCards?.map((card) => (
              <ProjectCard
                key={card.id}
                card={card}
                onCardClick={onCardClick}
                selectedCard={selectedCard}
              />
            ))}
          </div>
        ) : (
          <p>Fetching Posts ...</p>
        )}
      </div>
    </div>
  );
};

export default HomePageComponent;
