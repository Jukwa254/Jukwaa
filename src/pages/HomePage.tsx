import { useEffect, useRef, useState } from "react";
import { ClockIcons, HomeIcons, ProfileIcons } from "../components/Icons";
import HomePageComponent from "./pageComponents/HomePageComponent";
import PostPageComponent from "./pageComponents/PostPageComponent";
import ProfilePageComponent from "./pageComponents/ProfilePageComponent";
import RightPanel from "../components/RightPanel";
import { CardType, cards } from "../components/SampleData";

type MenuItem = {
  id: number;
  name: string;
  image: JSX.Element;
  component: JSX.Element;
};

function HomePage() {
  const leftPanelRef = useRef<HTMLDivElement>(null);

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null);

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

  const handleCardClick = (card: CardType) => {
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
          cards={cards}
          onCardClick={handleCardClick}
          selectedCard={selectedCard}
        />
      ),
    },
    {
      id: 2,
      name: "New Posts",
      image: (
        <div>
          <ClockIcons />
        </div>
      ),
      component: <PostPageComponent />,
    },
    {
      id: 3,
      name: "Profile",
      image: (
        <div>
          <ProfileIcons />
        </div>
      ),
      component: <ProfilePageComponent />,
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
        <div className="lg:px-32">
          <div className="lg:grid grid-cols-12">
            <div className="col-span-3 hidden lg:block" ref={leftPanelRef}>
              <div className="h-screen py-4">
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
                      {menuItems.map((item) => (
                        <div
                          key={item.id}
                          className={`w-full py-3 px-6 hover:bg-accentBackground hover:bg-BackgroundAccent rounded-lg my-1 cursor-pointer duration-200 ${
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

                  <div className="bg-darkBackgroundOne p-6 rounded-xl mt-3 flex flex-col flex-1">
                    <div className="flex-1"></div>
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

            <div className="col-span-6">
              <div className="">{renderActiveComponent()}</div>
              <div className=" fixed bottom-0 w-full lg:hidden">
                <div className="grid grid-cols-3 bg-BackgroundOne ">
                  {/* Mobile Bottom navidation Bar */}
                  {menuItems.map((item) => (
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

            <div className="col-span-3 hidden lg:block">
              <RightPanel isOpen={isPanelOpen} onClose={closePanel} />
            </div>
            <div className="md:hidden z-50">
              <RightPanel isOpen={isPanelOpen} onClose={closePanel} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
