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

    if (!isOpen) return null;


    const [users, setUsers] = useState<Profile[]>([]);
    const [isLoading] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .order("created_at", { ascending: false });

        if (error) {
            console.error('Error fetching users:', error.message);
        } else {
            setUsers(data);
        }
    };

    const handleUpdateRole = async (userId: string, newRole: string) => {
        // Update user role in the database
        const { error } = await supabase
            .from('profiles')
            .update({ roles: newRole })
            .eq('user_id', userId);
        if (error) {
            console.error('Error updating user role:', error.message);
        }
    };

    return (
        <div className="fixed inset-0 bg-textOne bg-opacity-50 overflow-y-auto h-full w-full z-50">
            <div className="relative top-20 lg:mx-auto p-8 border mx-4 lg:w-3/5 shadow-lg rounded-md bg-BackgroundTwo">
                <div className="mt-3 ">
                    <div className="flex justify-between mb-6">
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
                    <div className="lg:grid grid-cols-7 text-base py-2 hidden ">
                        <p className="col-span-2">Name</p>
                        <p>Email</p>
                        <p>Phone</p>
                        <p>Location</p>
                        <p>Roles</p>
                    </div>
                    <div>
                        {isLoading ? (
                            <div></div>
                        ) : users && users.length > 0 ? (
                            <div>
                                {users.map((user) => (
                                    <UserItem key={user.user_id} user={user} onUpdateRole={handleUpdateRole} />
                                ))}
                            </div>
                        ) : (
                            <div>
                                <Skeleton height={40} />
                                <Skeleton height={40} />
                                <Skeleton height={40} />
                                <Skeleton height={40} />
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    )
}


interface UserItemProps {
    user: Profile;
    onUpdateRole: (userId: string, newRole: string) => void;
}

export const UserItem: React.FC<UserItemProps> = ({ user, onUpdateRole }) => {
    const [selectedRole, setSelectedRole] = useState(user.roles);

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newRole = e.target.value;
        setSelectedRole(newRole);
        onUpdateRole(user.user_id, newRole);
    };

    return (
        <div className="">

            <div className="grid lg:grid-cols-7 py-4 gap-2 text-xs lg:text-sm text-textThree border-t border-t-BackgroundAccent">
                <div className="flex items-center gap-2 col-span-2">
                    <img src={user.avatar} alt="" className="w-8 h-8 rounded-full" />
                    <p className="leading-none">{user.user_name}</p>
                </div>
                <p>{user.email.substring(0, 6)}...</p>
                <p>(+254) {user.phone.toString().substring(0, 3)}...</p>
                <p>{user.location.substring(0, 3)}...</p>
                <p>{user.roles}</p>
                <div>
                    <select
                        value={selectedRole}
                        onChange={handleRoleChange}
                        className="px-2 py-1 border border-BackgroundAccent rounded"
                    >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                        <option value="super_admin">Super Admin</option>
                    </select>
                </div>
            </div>

        </div>
    );
};

