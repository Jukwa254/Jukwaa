import { useEffect, useRef, useState } from "react";
import {
  ClockIcons,
  HomeIcons,
  ProfileIcons,
  SearchIcon,
} from "../components/Icons";
import HomePageComponent from "./pageComponents/HomePageComponent";
import PostPageComponent from "./pageComponents/PostPageComponent";
import ProfilePageComponent, {
  PostItem,
} from "./pageComponents/ProfilePageComponent";
import RightPanel from "../components/RightPanel";
import SearchPageComponent from "./pageComponents/SearchPageComponent";

type MenuItem = {
  id: number;
  name: string;
  image: JSX.Element;
  component: JSX.Element;
};

export type LeftPanelProps = {
  onCardClick: (card: PostItem) => void;
  selectedCardType: PostItem | null;
};

const HomePage = ({}) => {
  const leftPanelRef = useRef<HTMLDivElement>(null);

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<PostItem | null>(null);

  const getSavedScrollPosition = (key: string) => {
    return parseInt(localStorage.getItem(key) || "0", 10);
  };

  useEffect(() => {
    const restoreScrollPosition = (
      ref: React.RefObject<HTMLDivElement>,
      key: string
    ) => {
      const savedScrollPosition = getSavedScrollPosition(key);
      if (ref.current) {
        ref.current.scrollTop = savedScrollPosition;
      }
    };

    restoreScrollPosition(leftPanelRef, "leftPanelScroll");
  }, []);

  const handleCardClick = (card: PostItem) => {
    setSelectedCard(card);
    setIsPanelOpen(true); // Open the right panel

    // setIsPanelOpen(true); // Open the right panel
  };

  const closePanel = () => {
    setIsPanelOpen(false); // Close the right panel
  };

  const menuItems: MenuItem[] = [
    {
      id: 1,
      name: "Home",
      image: (
        <div>
          <HomeIcons />
        </div>
      ),
      component: (
        <HomePageComponent
          onCardClick={handleCardClick}
          selectedCard={selectedCard}
        />
      ),
    },
    {
      id: 2,
      name: "New",
      image: (
        <div>
          <ClockIcons />
        </div>
      ),
      component: (
        <PostPageComponent
          onCardClick={handleCardClick}
          selectedCard={selectedCard}
        />
      ),
    },
    {
      id: 3,
      name: "Search",
      image: (
        <div>
          <SearchIcon />
        </div>
      ),
      component: (
        <SearchPageComponent
          onCardClick={handleCardClick}
          selectedCard={selectedCard}
        />
      ),
    },
    {
      id: 4,
      name: "Profile",
      image: (
        <div>
          <ProfileIcons />
        </div>
      ),
      component: <ProfilePageComponent />,
    },
    {
      id: 5,
      name: "See All",
      image: <></>,
      component: (
        <PostPageComponent
          onCardClick={handleCardClick}
          selectedCard={selectedCard}
        />
      ),
    },
  ];

  const renderActiveComponent = () => {
    const activeItem = menuItems.find((item) => item.name === activeMenu);
    return activeItem ? activeItem.component : <div>Component not found</div>;
  };

  const getSavedMenuItem = () => {
    const savedMenu = localStorage.getItem("activeMenu");
    return savedMenu || menuItems[0].name;
  };

  const [activeMenu, setActiveMenu] = useState<string>(getSavedMenuItem());

  const handleMenuClick = (name: string) => {
    setActiveMenu(name);
    localStorage.setItem("activeMenu", name);
  };

  useEffect(() => {
    const savedMenu = localStorage.getItem("activeMenu");
    if (savedMenu) {
      setActiveMenu(savedMenu);
    }
  }, []);

  return (
    <div>
      <div className="bg-BackgroundOne text-textOne">
        <div className="lg:px-48">
          <div className="lg:grid grid-cols-12">
            <div className="col-span-3 hidden lg:block">
              <div className="h-screen py-4 overflow-y-auto no-scrollbar">
                <div className="flex flex-col h-full">
                  <div className="bg-BackgroundTwo p-6 rounded-xl">
                    <div className="flex justify-between mb-12">
                      <div className="flex items-center gap-2">
                        <div></div>
                        <h1 className="text-[20px] font-bold text-textOne">
                          Jukwaa
                        </h1>
                      </div>
                    </div>
                    <div>
                      {menuItems.slice(0, 4).map((item) => (
                        <div
                          key={item.id}
                          className={`w-full lg:w-1/2 py-3 px-6 hover:bg-accentBackground hover:bg-BackgroundAccent rounded-full my-1 cursor-pointer duration-200 ${
                            activeMenu === item.name
                              ? "bg-BackgroundAccent hover:bg-none dark:hover:bg-none"
                              : ""
                          }`}
                          onClick={() => handleMenuClick(item.name)}
                        >
                          <div className="flex gap-2 items-center font-semibold text-base">
                            <p
                              className={`${
                                activeMenu === item.name
                                  ? "text-accent"
                                  : "text-strokeLight"
                              }`}
                            >
                              {item.image}
                            </p>
                            <p
                              className={`${
                                activeMenu === item.name
                                  ? "text-accent"
                                  : "text-strokeLight"
                              }`}
                            >
                              {item.name}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-BackgroundTwo p-6 rounded-xl mt-3 flex flex-col flex-1">
                    <div className="flex-1">
                      <div className=""></div>
                      {/* <div>
                        <div className="flex justify-between ">
                          <h1 className="font-bold mb-2">Trending Posts</h1>
                          <div>
                            {menuItems.slice(4, 5).map((item) => (
                              <div
                                key={item.id}
                                onClick={() => handleMenuClick(item.name)}
                              >
                                <p className="text-sm underline text-textTwo cursor-pointer hover:text-accent">
                                  {item.name}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                        {postCards?.slice(0, 3).map((card) => (
                          <TrendingPostsComponent
                            key={card.id}
                            card={card}
                            onCardClick={handleCardClick}
                            selectedCard={selectedCard}
                          />
                        ))}
                      </div> */}
                      {/* <div className="mt-8">
                        <div>
                          <div className="flex justify-between ">
                            <h1 className="font-bold mb-2">Trending Posts</h1>
                            <div>
                              {menuItems.slice(4, 5).map((item) => (
                                <div
                                  key={item.id}
                                  onClick={() => handleMenuClick(item.name)}
                                >
                                  <p className="text-sm underline text-textTwo cursor-pointer hover:text-accent">
                                    {item.name}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        {postCards?.slice(3, 5).map((card) => (
                          <TrendingPostsComponent
                            key={card.id}
                            card={card}
                            onCardClick={handleCardClick}
                            selectedCard={selectedCard}
                          />
                        ))}
                      </div> */}
                    </div>
                    <div>
                      <div className=" pt-4 flex justify-between items-center">
                        <p className="text-xs text-textTwo font-semibold">
                          ©️ Jukwaa 2024
                        </p>
                        <a
                          href="#"
                          className="text-textTwo font-semibold hover:text-accent text-xs underline"
                        >
                          Contact Us
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-5 h-screen">
              <div className="">{renderActiveComponent()}</div>
              <div className="fixed bottom-0 w-screen lg:hidden">
                <div className="grid grid-cols-4 bg-BackgroundOne">
                  {menuItems.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className={`text-strokeLight p-2 ${
                        activeMenu === item.name
                          ? "hover:bg-none dark:hover:bg-none font-bold"
                          : "bg-darkBackgroundTwo"
                      }`}
                      onClick={() => handleMenuClick(item.name)}
                    >
                      <div className="flex flex-col items-center gap-1">
                        <p
                          className={`${
                            activeMenu === item.name
                              ? "text-accent"
                              : "text-strokeLight"
                          }`}
                        >
                          {item.image}
                        </p>
                        <p
                          className={`${
                            activeMenu === item.name
                              ? "text-accent"
                              : "text-strokeLight"
                          }`}
                        >
                          {item.name}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-4 hidden lg:block">
              <RightPanel
                postId={selectedCard?.id}
                isOpen={isPanelOpen}
                onClose={closePanel}
                selectedCard={selectedCard}
              />
            </div>
            <div className="md:hidden z-50">
              <RightPanel
                postId={selectedCard?.id}
                isOpen={isPanelOpen}
                onClose={closePanel}
                selectedCard={selectedCard}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
