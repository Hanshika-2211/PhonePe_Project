import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  enum TransactionStatus {
    pending
    sent
    failed
  }

  type Transaction {
    _id: ID!
    to: String!
    from: String!
    amount: Float!
    status: TransactionStatus!
    timestamp: String!
  }

  type Query {
    getMerchantTransactions(merchantId: String!): [Transaction]
  }
`);
