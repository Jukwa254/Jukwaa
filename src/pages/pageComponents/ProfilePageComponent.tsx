import React, { useEffect, useRef, useState } from "react";
import CenterPanelNavBar from "../../components/CenterPanelNavBar";
import { useNavigate } from "react-router-dom";
import supabase from "../../config/superbaseClient";

import { EditIcon } from "../../components/Icons";
import { User } from "@supabase/auth-helpers-react";
import Skeleton from "react-loading-skeleton";
import { SignupFormData } from "../../Auth/RegisterAuth";
import { Profile } from "../../components/dataComponent";
import { ProjectFormModal } from "../../components/PostFormComponent";
import { EditFormComponent } from "../../components/EditFormComponent";
import AddPostComponent from "../../components/AddPostComponent";

export interface Post {
  post_title: string;
  post_description: string;
  post_category: string;
  post_image: string;
  likes: number;
  dislikes: number;
  user_id: string | undefined;
  profiles: Profile[],
  // comments: Comments[];
}


const ProfilePageComponent = () => {
  function handleLogout() {
    sessionStorage.removeItem("token");
    navigate("/");
  }

  const centerPanelRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [postCard, setPosts] = useState<Post[]>([]);
  const [userDetails, setUserDetails] = useState<SignupFormData | null>(null);
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

  // const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const closeModalEdit = () => setIsModalOpenEdit(false);
  const openModalEdit = () => setIsModalOpenEdit(true);

  useEffect(() => {
    const fetchPostsData = async () => {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.log("User not logged in");
        return;
      }

      // Parse the token to get the user object
      const user = JSON.parse(token) as User;

      if (user) {
        const { data, error } = await supabase
          .from("posts")
          .select(
            `
                    post_title,
                    post_description,
                    post_category,
                    post_image,
                    likes,
                    dislikes,
                    user_id,
                    profiles (*)
                    

                `
          )
          .eq("user_id", user.id);

        if (error) {
          console.error("Error fetching posts:", error);
        } else if (data) {
          setPosts(data);
          console.log("Fetch Successful");
        }
        setIsLoading(false);
      }
    };

    fetchPostsData();
  }, []);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setIsLoading(true);

        // Retrieve user data from session storage
        const storedUser = sessionStorage.getItem("token");
        if (!storedUser) {
          throw new Error("No user data found in session storage.");
        }

        const user = JSON.parse(storedUser) as User;
        const userId = user.id;

        // Fetch user profile from Supabase
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("user_id", userId)
          .single();

        if (error) throw error;
        setUserDetails(data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  // const subDescription = postCard.post_description.;

  return (
    <div>
      <div>
        <div
          className="h-screen text-strokeLight overflow-y-auto no-scrollbar lg:py-4"
          ref={centerPanelRef}
        >
          <div className="lg:mx-3">
            <CenterPanelNavBar title={"Profile"} />
          </div>
          <div className="bg-BackgroundTwo p-4 lg:px-6 lg:rounded-b-xl lg:mx-3 h-full">
            <div className="flex justify-end">
              <ProjectFormModal isOpen={isModalOpen} onClose={closeModal} />
              <EditFormComponent isOpen={isModalOpenEdit} onClose={closeModalEdit} />
            </div>
            <div className="flex flex-col h-full">
              <div className="flex justify-between">
                <p className="text-lg font-bold pb-4">User Details</p>
                <button
                  onClick={openModalEdit}
                  className=" rounded flex items-center gap-2 cursor-pointer hover:text-accent"
                >
                  <EditIcon />
                  <p className="text-sm">Edit Profile</p>
                </button>
              </div>
              {isLoading ? (
                <div>
                  <div className="">
                    <Skeleton height={50} />
                    <Skeleton height={50} />
                    <Skeleton height={50} />
                  </div>
                </div>
              ) : (
                <div className="">
                  <div className="bg-BackgroundOne p-4 rounded-lg ">


                    <div>
                      <img src={userDetails?.avatar} alt="" className="w-16 h-16 mb-2 object-cover border border-BackgroundAccent rounded-full" />
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <p className="">User Name</p>
                      <p className="text-textTwo">{userDetails?.user_name}</p>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <p className="">Email</p>
                      <p className="text-textTwo">{userDetails?.email}</p>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <p className="">Phone</p>
                      <p className="text-textTwo">{userDetails?.phone}</p>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <p className="">County</p>
                      <p className="text-textTwo">{userDetails?.location}</p>
                    </div>
                    <div className="flex justify-between items-center mt-10">
                      <p>Logout</p>
                      <button
                        onClick={handleLogout}
                        className="border px-4 py-2 border-strokeOne rounded-lg hover:bg-BackgroundAccent"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              )}


              <div className="my-4  bg-BackgroundOne p-4 rounded-lg">
                <AddPostComponent />

                <div>
                  {isLoading ? (
                    <div>
                      <div className="">
                        <Skeleton height={100} />
                        <Skeleton height={100} />
                        <Skeleton height={100} />
                        <Skeleton height={100} />
                        <Skeleton height={100} />
                      </div>
                    </div>
                  ) : postCard && postCard.length > 0 ? (
                    <div className="">
                      {postCard.map((post, index) => (
                        <div
                          key={index}
                          className="border-b-4 pb-4 border-BackgroundTwo"
                        >
                          <p className="mt-4 font-bold mb-2 uppercase">
                            {post.post_title}
                          </p>
                          <div className="lg:flex gap-4 items-start justify-between">
                            <div>
                              <div>
                                <p>{post.post_description.substring(0, 109)} ...</p>
                                <div className="flex gap-10 mt-4 text-sm">
                                  <p>{post.likes} Likes</p>
                                  <p>{post.dislikes} Dislikes</p>
                                </div>

                              </div>
                            </div>
                            <img
                              src={post.post_image}
                              alt=""
                              className="w-full lg:w-40 object-cover rounded my-2"
                            />
                          </div>

                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>

                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageComponent;

