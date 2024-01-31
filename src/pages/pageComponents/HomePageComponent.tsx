import { useEffect, useRef, useState } from "react";
import ProjectCard from "../../components/ProjectCard";
import CenterPanelNavBar from "../../components/CenterPanelNavBar";
import supabase from "../../config/superbaseClient";
import { PostItem } from "../../components/dataComponent";
import { User } from "@supabase/auth-helpers-react";
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
  const [postCards, setPostCards] = useState<PostItem[]>([]);
  const [fetchError, setFetchError] = useState<string>("");
  const [currentUserId, setCurrentUserId] = useState<string>(String);

  useEffect(() => {
    const storedUser = sessionStorage.getItem("token");
    if (!storedUser) {
      throw new Error("No user data found in session storage.");
    }

    const user = JSON.parse(storedUser) as User;
    // const userId = user.id;
    setCurrentUserId(user?.id);
  }, []);



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

  const fetchPostData = async () => {
    const { data, error } = await supabase
      .from("posts")
      .select(
        `
        *,
        profiles(*),
        comments!comments_post_id_fkey(*,
          user_id (
            *
          )
      )
      `
      )
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching data:", error);
      setFetchError(error.message);
    } else {
      setPostCards(data);
    }
  };

  useEffect(() => {
    fetchPostData();

    const postSubscription = supabase
      .channel('custom-posts-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, (payload) => {
        console.log('Post change received!', payload);
        fetchPostData();
      })
      .subscribe();

    const commentsSubscription = supabase
      .channel('custom-comments-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'comments' }, (payload) => {
        console.log('Comment change received!', payload);
        fetchPostData();
      })
      .subscribe();
    return () => {
      supabase.removeChannel(postSubscription);
      supabase.removeChannel(commentsSubscription);
    };
  }, []);


  return (
    <div
      className="h-screen text-strokeLight overflow-y-auto no-scrollbar lg:py-4 pb-10"
      ref={centerPanelRef}
    >
      <div className="lg:mx-3">
        <CenterPanelNavBar title={"Explore"} />
      </div>
      <div className="bg-BackgroundTwo p-4 lg:px-6 lg:rounded-b-xl lg:mx-3">
        {fetchError && <p>{fetchError}</p>}
        {isLoading ? (
          <div className="flex flex-col">
            <Skeleton height={200} />
            <Skeleton height={200} />
            <Skeleton height={200} />
          </div>
        ) : postCards && postCards.length > 0 ? (
          <div>
            {postCards?.map((card) => (
              <ProjectCard
                key={card.id}
                card={card}
                onCardClick={onCardClick}
                selectedCard={selectedCard}
                currentUserId={currentUserId}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col">
            {/* <p>Fetching Posts ...</p> */}
            <Skeleton height={300} />
            <Skeleton height={300} />
            <Skeleton height={300} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePageComponent;
