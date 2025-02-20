import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Loans from "./pages/Loans";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import Analytics from "./pages/Analytics";
import Payment from "./pages/Payment";
import CreateLoan from "./pages/CreateLoan";
import LoanApprovals from "./pages/LoanApprovals";

const client = new ApolloClient({
    uri: 'http://localhost:5021/graphql',
    cache: new InMemoryCache()
});

function App() {
    return (
        <ApolloProvider client={client}>
            <Router>
                <div className="min-h-screen bg-whitesmoke font-sans">  {/* Light background color */}
                    <Navbar />
                    <div className="container mx-auto px-4 py-6">
                        <Routes>
                            <Route path="/login" element={
                                <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">  {/* White background for cards */}
                                    <Login />
                                </div>
                            } />
                            <Route path="/register" element={
                                <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6">  {/* White background for cards */}
                                    <Register />
                                </div>
                            } />
                            <Route element={<PrivateRoute />}>
                                <Route path="/" element={
                                    <div className="bg-white rounded-xl shadow-lg p-6">  {/* White background for cards */}
                                        <Home />
                                    </div>
                                } />
                                <Route path="/home" element={
                                    <div className="bg-[white] rounded-xl shadow-lg p-6">  {/* White background for cards */}
                                        <Home />
                                    </div>
                                } />
                                <Route path="/loans" element={
                                    <div className="bg-[#581389] rounded-xl shadow-lg p-6">  {/* White background for cards */}
                                        <Loans />
                                    </div>
                                } />
                                <Route path="/create-loan" element={
                                    <div className="bg-white rounded-xl shadow-lg p-6">  {/* White background for cards */}
                                        <CreateLoan />
                                    </div>
                                } />
                                <Route path="/loan-approvals" element={
                                    <div className="bg-white rounded-xl shadow-lg p-6">  {/* White background for cards */}
                                        <LoanApprovals />
                                    </div>
                                } />
                                <Route path="/profile" element={
                                    <div className="bg-[#581389] rounded-xl shadow-lg p-6">  {/* White background for cards */}
                                        <Profile />
                                    </div>
                                } />
                                <Route path="/analytics" element={
                                    <div className="bg-[#581389] rounded-xl shadow-lg p-6">  {/* White background for cards */}
                                        <Analytics />
                                    </div>
                                } />
                                <Route path="/payment" element={
                                    <div className="bg-[#581389] rounded-xl shadow-lg p-6">  {/* White background for cards */}
                                        <Payment />
                                    </div>
                                } />
                            </Route>
                        </Routes>
                    </div>
                </div>
            </Router>
        </ApolloProvider>
    );
}

export default App;
