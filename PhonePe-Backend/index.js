// index.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { graphqlHTTP } from 'express-graphql';
import authRoutes from './routes/authRoutes.js';
import loanRoutes from './routes/loanRoutes.js';
import transactionRoutes from './routes/transactionRoutes.js';
import accountRoutes from './routes/accountRoutes.js';
import { schema } from './graphql/schema.js';
import { root } from './graphql/resolvers.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// CORS configuration
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization', 'phone-number', 'merchant-id'],
    exposedHeaders: ['Content-Type', 'Authorization', 'phone-number', 'merchant-id'],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
}));

// Add a middleware to handle preflight requests
app.options('*', cors());

// GraphQL endpoint with custom error handling
app.use('/graphql', graphqlHTTP((request, response, graphQLParams) => ({
    schema: schema,
    rootValue: root,
    graphiql: true,
    context: { request, response },
    customFormatErrorFn: (error) => {
        console.error('GraphQL Error:', error);
        return {
            message: error.message,
            locations: error.locations,
            stack: error.stack ? error.stack.split('\n') : [],
            path: error.path,
        };
    }
})));

// Routes
app.use("/auth", authRoutes);
app.use("/loans", loanRoutes);
app.use("/transactions", transactionRoutes);
app.use("/accounts", accountRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

const port = process.env.PORT || 5021;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
