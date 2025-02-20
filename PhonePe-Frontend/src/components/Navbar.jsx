import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../components/Navbar.css";

function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const checkLoginStatus = () => {
            const phoneNumber = localStorage.getItem("phoneNumber");
            setIsLoggedIn(!!phoneNumber);
            setIsAdmin(phoneNumber === "0123456789");
        };

        checkLoginStatus();
        window.addEventListener('storage', checkLoginStatus);
        window.addEventListener('loginStatusChanged', checkLoginStatus);

        return () => {
            window.removeEventListener('storage', checkLoginStatus);
            window.removeEventListener('loginStatusChanged', checkLoginStatus);
        };
    }, []);

    const handleLogout = () => {
        localStorage.clear()
        setIsLoggedIn(false);
        setIsAdmin(false);
        window.dispatchEvent(new Event('loginStatusChanged'));
        navigate("/login");
    };

    const NavLink = ({ to, children }) => (
        <Link
            to={to}
            className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium px-4 py-2 rounded-lg hover:bg-primary/5"
        >
            {children}
        </Link>
    );

    return (
        <nav className="bg-neutral-card shadow-premium sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-8">
                        <Link to={isLoggedIn ? "/" : "/login"} className="flex items-center">
                            <img
                                src="https://cdn.worldvectorlogo.com/logos/phonepe-1.svg"
                                alt="PhonePe Logo"
                                className="h-10 w-auto"
                            />
                        </Link>
                        {isLoggedIn && (
                            <div className="hidden md:flex space-x-2">
                                <NavLink to="/">Home</NavLink>
                                <NavLink to="/loans">Loans</NavLink>
                                {isAdmin && (
                                    <>
                                        <NavLink to="/create-loan">Create Loan</NavLink>
                                        <NavLink to="/loan-approvals">Loan Approvals</NavLink>
                                    </>
                                )}
                                <NavLink to="/analytics">Analytics</NavLink>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center space-x-4">
                        {isLoggedIn ? (
                            <>
                                <Link
                                    to="/profile"
                                    className="flex items-center space-x-2 text-gray-700 hover:text-primary transition-colors duration-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="#581389" viewBox="0 0 24 24" stroke="#581389">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    <span className="text-[#402255] hidden md:inline">Profile</span>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="bg-[#581389] text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-200 shadow-premium hover:shadow-premium-hover"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                        className="bg-[#581389] text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-200 shadow-premium hover:shadow-premium-hover"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                        className="border-2 border-primary text-primary px-6 py-2 rounded-lg hover:bg-primary hover:text-[#581389] transition-colors duration-200"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
