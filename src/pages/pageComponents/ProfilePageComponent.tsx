import { useEffect, useRef } from "react";
import CenterPanelNavBar from "../../components/CenterPanelNavBar";
import { useNavigate } from "react-router-dom";

const ProfilePageComponent = () => {
  function handleLogout() {
    sessionStorage.removeItem("token");
    navigate("/");
  }

  const centerPanelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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

  // async function signOutUser() {
  //   await supabase.auth.signOut();
  //   navigate("/");
  // }
  return (
    <div>
      <div>
        <div
          className="h-screen text-strokeLight overflow-y-auto no-scrollbar pb-10 lg:mx-4 mt-4 bg-BackgroundTwo lg:rounded-xl p-2 lg:p-4"
          ref={centerPanelRef}
        >
          <CenterPanelNavBar title={"User Profile"} />
          <div>
            {/* <button onClick={() => signOutUser()}> SignOut</button> */}
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageComponent;
