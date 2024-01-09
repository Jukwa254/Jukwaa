import { useEffect, useState } from "react";
import { MoonIcon, NotificationIcon, SunIcon } from "./Icons";

interface CenterPanelNavBarProps {
  title: string;
}

const CenterPanelNavBar = (props: CenterPanelNavBarProps) => {
  const [theme, setTheme] = useState<"dark" | "light" | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div>
      <div className="lg:flex justify-between items-center w-full bg-BackgroundOne py-4">
        <div className="lg:hidden flex justify-between mb-8">
          <div className="flex gap-2">
            <h1 className="text-[20px] font-bold text-textOne">Jukwaa</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleThemeSwitch}
              className="lg:hover:-translate-y-1 lg:transform duration-300"
            >
              {theme === "light" ? (
                <div>
                  <MoonIcon />
                </div>
              ) : (
                <div>
                  <SunIcon />
                </div>
              )}
            </button>
            <div>
              <NotificationIcon />
            </div>
          </div>
        </div>

        <p className="uppercase text-[20px] font-bold text-accent">
          {props.title}
        </p>
        <div className="flex gap-4  items-center mt-4 lg:mt-0">
          {/* <div className="w-full">
            <SearchComponent />
          </div> */}
          <div className="hidden lg:block">
            <NotificationIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenterPanelNavBar;
