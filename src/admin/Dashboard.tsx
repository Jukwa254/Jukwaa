import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const navigate = useNavigate();

    function handleLogout() {
        sessionStorage.removeItem("token");
        navigate("/");
    }
    return (
        <div className='text-center'>
            <p>Dashboard</p>

            <button
                onClick={handleLogout}
                className="border px-4 py-2 border-strokeOne rounded-lg hover:bg-BackgroundAccent"
            >
                Logout
            </button>
        </div>
    )
}

export default Dashboard