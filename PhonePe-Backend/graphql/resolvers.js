import Transaction from '../models/transaction.js';

export const root = {
    getMerchantTransactions: async ({ merchantId }) => {
        try {
            // Find all transactions where the merchant is either sender or receiver
            const transactions = await Transaction.find({
                $or: [
                    { from: merchantId },
                    { to: merchantId }
                ]
            }).sort({ timestamp: 1 }); // Sort by timestamp in ascending order

            return transactions.map(transaction => ({
                _id: transaction._id.toString(),
                to: transaction.to,
                from: transaction.from,
                amount: transaction.amount,
                status: transaction.status,
                timestamp: transaction.timestamp.toISOString()
            }));s
        } catch (error) {
            console.error('GraphQL Error:', error);
            throw new Error('Error fetching transactions: ' + error.message);
        }
    }
};
