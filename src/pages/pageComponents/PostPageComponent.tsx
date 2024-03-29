import { useEffect, useRef, useState } from "react";
import CenterPanelNavBar from "../../components/CenterPanelNavBar";
import { formatDistanceToNow } from "date-fns";
import supabase from "../../config/superbaseClient";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { PostItem } from "../../components/dataComponent";

export type NewProjectCardProps = {
  onCardClick: (card: PostItem) => void;
  selectedCard: PostItem | null;
};

const PostPageComponent: React.FC<NewProjectCardProps> = ({
  onCardClick,
  selectedCard,
}) => {
  const centerPanelRef = useRef<HTMLDivElement>(null);
  const [postCards, setPostCards] = useState<PostItem[] | null>(null);

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

  useEffect(() => {
    const centerPanel = centerPanelRef.current;
    centerPanel?.addEventListener("scroll", saveScrollPosition);
    return () => {
      centerPanel?.removeEventListener("scroll", saveScrollPosition);
    };
  }, []);

  useEffect(() => {
    const fetchPostData = async () => {
      const { data, error } = await supabase.from("posts").select(`
      *,
      profiles(*),
      comments!comments_post_id_fkey(*,
        user_id (
          *
        )
    )
    `);
      if (error) {
        console.error("Error fetching data:", error);
      } else {
        console.log(data);
        setPostCards(data); // Cast the data to the correct type
      }
    };
    fetchPostData();
  }, [supabase]);

  return (
    <div>
      <div
        className="h-screen text-strokeLight overflow-y-auto no-scrollbar pb-10 lg:mx-4 mt-4 "
        ref={centerPanelRef}
      >
        <CenterPanelNavBar title={"New Posts"} />
        <div className="bg-BackgroundTwo  p-2 lg:px-4 lg:rounded-b-xl">
          {isLoading ? (
            <div>
              <Skeleton height={120} />
              <Skeleton height={120} />
              <Skeleton height={120} />
              <Skeleton height={120} />
            </div>
          ) : postCards && postCards.length > 0 ? (
            <div className="">
              {postCards?.map((card) => (
                <NewPostsComponent
                  key={card.id}
                  card={card}
                  onCardClick={onCardClick}
                  selectedCard={selectedCard}
                />
              ))}
            </div>
          ) : (
            <div>
              {/* <p>Fetching Posts...</p> */}
              <Skeleton height={120} />
              <Skeleton height={120} />
              <Skeleton height={120} />
              <Skeleton height={120} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostPageComponent;

export type ProjectCardPropsProps = {
  card: PostItem;
  onCardClick: (card: PostItem) => void;
  selectedCard: PostItem | null;
};

export const NewPostsComponent: React.FC<ProjectCardPropsProps> = ({
  card,
  onCardClick,
  selectedCard,
}) => {
  const subDescription = card.post_description.substring(0, 120);
  return (
    <div
      key={card.id}
      onClick={() => {
        onCardClick(card);
      }}
      className={`hover:-translate-y-1 transform duration-200 cursor-pointer px-4 py-4 lg:pb-3 rounded-xl hover:bg-BackgroundOne ${selectedCard && selectedCard.id === card.id
        ? "bg-BackgroundOne "
        : "border-strokeOne"
        }`}
    >
      <div className="flex gap-2 items-start">
        <img
          src={card.profiles.avatar}
          alt=""
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="w-full">
          <div className="lg:flex justify-between">
            <h1 className="font-bold ">{card.post_title}</h1>
            <p className="text-xs text-[#796552]">
              {formatDistanceToNow(new Date(card.created_at), {
                // addSuffix: true,
              })}{" "}
              ago
            </p>
          </div>
          <p className="text-textThree">{subDescription}...</p>
          <div className="text-sm font-bold flex justify-between mt-2">
            <div className="flex gap-4">
              <p>{card.dislikes} Likes</p>
              <p>{card.likes} Dislikes</p>
            </div>
            <p>{card.comments.length} Comments</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TrendingPostsComponent: React.FC<ProjectCardPropsProps> = ({
  card,
  onCardClick,
  selectedCard,
}) => {
  return (
    <div
      key={card.id}
      onClick={() => {
        onCardClick(card);
      }}
      className={`hover:-translate-y-1 transform duration-200 cursor-pointer px-4 py-4 lg:pb-3 rounded-xl hover:bg-BackgroundOne ${selectedCard && selectedCard.id === card.id
        ? "bg-BackgroundOne "
        : "border-strokeOne"
        }`}
    >
      <div className="flex gap-2 items-start">
        <img src={card.post_image} alt="" className="w-10 h-10 rounded-full" />
        <div>
          <h1 className="font-semibold leading-none mb-2">{card.post_title}</h1>
          <p className="text-sm text-textTwo">2002 Comments</p>
        </div>
      </div>
    </div>
  );
};
