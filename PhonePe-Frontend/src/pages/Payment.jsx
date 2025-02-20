import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import TransactionList from "../components/home/TransactionList";

function Payment() {
    const { state } = useLocation();
    const { fromMerchantId, toMerchantId, user } = state || {};
    const [amount, setAmount] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [transactions, setTransactions] = useState([]); // State to store transactions

    const API_BASE_URL = 'http://localhost:5021';

    useEffect(() => {
        // Validate required data
        if (!fromMerchantId || !toMerchantId || !user) {
            console.error("Missing payment information:", { fromMerchantId, toMerchantId, user });
            setError("Missing required payment information. Please try searching for the user again.");
            return;
        }
        console.log("Payment initialized with:", { fromMerchantId, toMerchantId, user });
        fetchTransactions();
    }, [fromMerchantId, toMerchantId, user]);

    // Function to fetch transactions
    const fetchTransactions = async () => {
        if (!fromMerchantId || !toMerchantId) return;

        try {
            const response = await fetch(
                `${API_BASE_URL}/transactions/ourTransactions?fromMerchantId=${fromMerchantId}&toMerchantId=${toMerchantId}`
            );

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to fetch transactions");
            }

            const data = await response.json();
            console.log("Fetched transactions:", data);
            setTransactions(data.transactions || []); // Store fetched transactions
        } catch (error) {
            console.error("Error fetching transactions:", error);
            setError(error.message || "Error fetching transactions");
        }
    };

    const handlePayment = async () => {
        try {
            if (!fromMerchantId || !toMerchantId) {
                console.error("Missing merchant IDs:", { fromMerchantId, toMerchantId });
                setError("Missing merchant information. Please try searching for the user again.");
                return;
            }

            if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
                setError("Please enter a valid amount");
                return;
            }

            const paymentData = {
                fromMerchantId,
                toMerchantId,
                amount: parseFloat(amount)
            };
            console.log("Sending payment:", paymentData);

            const response = await fetch(
                `${API_BASE_URL}/transactions/send`,
                {
                    method: "POST",
                    headers: { 
                        "Content-Type": "application/json",
                        "phone-number": localStorage.getItem('phoneNumber'),
                        "merchant-id": fromMerchantId
                    },
                    body: JSON.stringify(paymentData),
                }
            );

            const data = await response.json();
            console.log("Payment response:", data);

            if (!response.ok) {
                throw new Error(data.message || "Transaction failed");
            }

            console.log("Transaction successful:", data);
            setSuccess("Transaction successful!");
            setError("");
            setAmount("");  // Clear amount after successful transaction

            // Refresh transactions after successful payment
            fetchTransactions();
        } catch (error) {
            console.error("Error processing transaction:", error);
            setError(error.message || "Error processing transaction");
            setSuccess("");
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold">
                Payment to {user?.name || "Unknown User"}
            </h2>
            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Enter amount"
                className="border p-2 rounded w-full"
            />
            <button
                onClick={handlePayment}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Send Payment
            </button>
            {error && <p className="text-red-500">{error}</p>}
            {success && <p className="text-green-500">{success}</p>}

            {/* Transaction List */}
            <TransactionList transactions={transactions} />
        </div>
    );
}

export default Payment;
