import { useEffect, useRef } from "react";
import ProjectCard from "../../components/ProjectCard";
import { CardType } from "../../components/SampleData";
import CenterPanelNavBar from "../../components/CenterPanelNavBar";

export type CenterPanelProps = {
  cards: CardType[];
  onCardClick: (card: CardType) => void;
  selectedCard: CardType | null;
};

const HomePageComponent: React.FC<CenterPanelProps> = ({
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
    <div
      className="h-screen text-strokeLight overflow-y-auto no-scrollbar pb-10 lg:mx-4 mt-4"
      ref={centerPanelRef}
    >
      <div className="bg-BackgroundOne lg:rounded-xl mx-2">
        <div>
          <CenterPanelNavBar title={"Explore"} />
        </div>
        <div className="">
          {cards.map((card) => (
            <ProjectCard
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

export default HomePageComponent;
