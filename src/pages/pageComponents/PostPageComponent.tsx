import { useEffect, useRef } from "react";
import CenterPanelNavBar from "../../components/CenterPanelNavBar";
import { CardType } from "../../components/SampleData";
import { formatDistanceToNow } from "date-fns";

export type NewProjectCardProps = {
  cards: CardType[];
  onCardClick: (card: CardType) => void;
  selectedCard: CardType | null;
};

const PostPageComponent: React.FC<NewProjectCardProps> = ({
  cards,
  onCardClick,
  selectedCard,
}) => {
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
      <div
        className="h-screen text-strokeLight overflow-y-auto no-scrollbar pb-10 lg:mx-4 mt-4 bg-BackgroundTwo lg:rounded-xl p-2 lg:p-4"
        ref={centerPanelRef}
      >
        <CenterPanelNavBar title={"New Posts"} />
        <div>
          {cards.map((card) => (
            <NewPostsComponent
              key={card.id}
              card={card}
              onCardClick={onCardClick}
              selectedCard={selectedCard}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostPageComponent;

export type ProjectCardPropsProps = {
  card: CardType;
  onCardClick: (card: CardType) => void;
  selectedCard: CardType | null;
};

export const NewPostsComponent: React.FC<ProjectCardPropsProps> = ({
  card,
  onCardClick,
  selectedCard,
}) => {
  const subDescription = card.projectDescription.substring(0, 120);
  return (
    <div
      key={card.id}
      onClick={() => {
        onCardClick(card);
      }}
      className={`hover:-translate-y-1 transform duration-200 cursor-pointer px-4 py-4 lg:pb-3 rounded-xl hover:bg-BackgroundOne ${
        selectedCard && selectedCard.id === card.id
          ? "bg-BackgroundOne "
          : "border-strokeOne"
      }`}
    >
      <div className="flex gap-2 items-start">
        <img
          src={card.organizationLogo}
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <div>
          <div className="lg:flex justify-between">
            <h1 className="font-bold ">{card.projectTitle}</h1>
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
            <p>{card.projectComments} Comments</p>
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
      className={`hover:-translate-y-1 transform duration-200 cursor-pointer px-4 py-4 lg:pb-3 rounded-xl hover:bg-BackgroundOne ${
        selectedCard && selectedCard.id === card.id
          ? "bg-BackgroundOne "
          : "border-strokeOne"
      }`}
    >
      <div className="flex gap-2 items-center">
        <img
          src={card.organizationLogo}
          alt=""
          className="w-10 h-10 rounded-full"
        />
        <div>
          <h1 className="font-semibold ">{card.projectTitle}</h1>
          <p className="text-sm text-textTwo">
            {card.projectComments} Comments
          </p>
        </div>
      </div>
    </div>
  );
};
