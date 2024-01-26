import { useEffect, useRef, useState } from "react";
import ProjectCard from "../../components/ProjectCard";
import CenterPanelNavBar from "../../components/CenterPanelNavBar";
import supabase from "../../config/superbaseClient";
import Skeleton from "react-loading-skeleton";
import { PostItem } from "../../components/dataComponent";

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
  const [fetchError] = useState<string>("");

  const [isLoading] = useState(false);

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

  // useEffect(() => {
  //   const fetchPostData = async () => {
  //     const { data, error } = await supabase.from("posts").select("*");
  //     // .eq("user_id", user?.id);

  //     if (error) {
  //       console.error("Error fetching data:", error);
  //     } else {
  //       setPostCards(data);
  //     }
  //   };

  //   fetchPostData();
  // }, [supabase]);
  useEffect(() => {
    const fetchPostData = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select(
          `
      *,
      profiles(*),
      comments!comments_post_id_fkey(*,
        user_id (
          user_name
        )
    )
    `
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching data:", error);
      } else {
        console.log(data);
        setPostCards(data as unknown as PostItem[]); // Cast the data to the correct type
      }
    };
    fetchPostData();
  }, [supabase]);

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

            <div></div>
          </div>
        ) : (
          <p>Fetching Posts ...</p>
        )}
      </div>
    </div>
  );
};

export default HomePageComponent;
