import { useEffect, useState } from "react";
import supabase from "../config/superbaseClient";
import { User } from "@supabase/auth-helpers-react";
import Skeleton from "react-loading-skeleton";
import { Profile } from "./dataComponent";


export const AdminComponent = () => {
    const [role, setRole] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    useEffect(() => {
        const fetchUserRole = async () => {
            const token = sessionStorage.getItem("token");
            if (!token) {
                console.log("User not logged in");
                return;
            }

            const user = JSON.parse(token) as User;

            if (user) {
                const { data, error } = await supabase
                    .from('profiles')
                    .select("*")
                    .eq('user_id', user.id)
                    .single();

                if (error) {
                    console.error('Error fetching user role', error);
                } else if (data) {
                    setRole(data.roles);
                }
            }
            setIsLoading(false);
        };

        fetchUserRole();
    }, []);

    if (isLoading) {
        return <div>
            <Skeleton height={100} />
            <Skeleton height={50} />
            <Skeleton height={50} />
        </div>;
    }

    if (role !== 'super_admin') {
        return null; // Or any other appropriate JSX for non-admin users
    }

    return (
        <div>
            <AdminPanelModal isOpen={isModalOpen} onClose={closeModal} />
            <div className="flex justify-between items-center">
                <p>Admin Panel</p>
                <button
                    onClick={openModal}
                    className="bg-accent text-BackgroundOne p-2 rounded flex"
                >
                    <p>Admin Panel</p>
                </button>

            </div>
        </div>
    )
}


export interface AdminModalProps {
    isOpen: boolean;
    onClose: () => void;

}

export const AdminPanelModal: React.FC<AdminModalProps> = ({
    isOpen,
    onClose,
}) => {
    const [fetchError, setFetchError] = useState<string>("");
    const [userProfile, setUserProfile] = useState<Profile[]>([]);
    const [isLoading] = useState(false);



    useEffect(() => {
        const fetchPostData = async () => {
            const { data, error } = await supabase
                .from("profiles")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Error fetching data:", error);
                setFetchError(error.message);
            } else {
                setUserProfile(data);
            }
        };
        fetchPostData();
    }, []);




    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-textOne bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 lg:mx-auto p-5 border mx-4 lg:w-3/5 shadow-lg rounded-md bg-BackgroundTwo">
                <div className="mt-3">
                    <div className="flex justify-between">
                        <h3 className="text-xl leading-6 text-accent font-bold">
                            Admin Panel
                        </h3>
                        <button
                            onClick={onClose}
                            className="text-sm underline hover:text-accent"
                        >
                            Close
                        </button>
                    </div>
                    <div className="my-12">
                        <div className="grid grid-cols-6 uppercase text-sm mb-4">
                            <p className="col-span-2">User Name</p>
                            <p>Email</p>
                            <p>Phone</p>
                            <p>County</p>
                            <p>Roles</p>
                        </div>
                        <div>
                            {fetchError && <p>{fetchError}</p>}
                            {isLoading ? (
                                <div></div>
                            ) : userProfile && userProfile.length > 0 ? (
                                <div>
                                    {userProfile?.map((card, index) => (
                                        <div key={index}>
                                            <div className="grid grid-cols-6 py-4 text-sm text-textThree border-t border-t-BackgroundAccent">
                                                <div className="flex items-center gap-2 col-span-2">
                                                    <img src={card.avatar} alt="" className="w-8 h-8 rounded-full" />
                                                    <p className="leading-none">{card.user_name}</p>
                                                </div>
                                                <p>{card.email.substring(0, 6)}...</p>
                                                <p>(+254) {card.phone.toString().substring(0, 6)}...</p>
                                                <p>{card.location.substring(0, 3)}...</p>
                                                <p>{card.roles}</p>
                                            </div>
                                        </div>
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
                </div>
            </div>
        </div>
    )
}
