import { useEffect, useState } from "react";
import supabase from "../config/superbaseClient";
import Skeleton from "react-loading-skeleton";
import { AddIcon } from "./Icons";
import { User } from "@supabase/auth-helpers-react";
import { ProjectFormModal } from "./PostFormComponent";

const AddPostComponent = () => {
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

    if (role !== 'admin') {
        return null; // Or any other appropriate JSX for non-admin users
    }
    return (
        <div>
            <div className=" bg-BackgroundOne rounded-lg">
                <ProjectFormModal isOpen={isModalOpen} onClose={closeModal} />
                <button
                    onClick={openModal}
                    className="bg-accent text-BackgroundOne p-2 rounded flex"
                >
                    <AddIcon />
                    <p>Add a Post</p>
                </button>
                <div className="mt-4"></div>
                <p className="text-lg font-bold">My Posts</p>
            </div>
        </div>
    )
}

export default AddPostComponent




