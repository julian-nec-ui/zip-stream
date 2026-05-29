import express from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoutes from "./routes/chat.route.js";
import { connectDb } from "./lib/db.js";
import typeDefs from "./lib/schema.js";
import resolvers from "./lib/resolvers.js";
import cookieParser from "cookie-parser";
import colors from "@colors/colors";
import cors from "cors";
import { Pool } from "pg";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express4";
import http from "http";
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

const PORT = process.env.PORT;

const app = express();
const httpServer = http.createServer(app);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  introspection: true,
  playground: true,
  context: ({ req, res }) => {
      // Add authentication context if needed
      return {
        // Add user from auth middleware here
        // user: req.user
      };
    },
});

await apolloServer.start();

// Parse URL-encoded bodies (for standard HTML forms)
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Place this before your GraphQL or other routes
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use(
  "/graphql",
  expressMiddleware(apolloServer, {
    context: async ({ req, res }) => ({ req, res }),
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);

// Database connection
// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS,
//   port: process.env.DB_PORT
// });

// app.get("/api/users/:lastName", async (req, res) => {
//   try {
//     const {lastName} = req.params;
//     const result = await pool.query(`SELECT * FROM findUsersLastName('${lastName}')`);
//     res.json(result.rows);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// });

// app.get("/api/users", async (req, res) => {
//   try {
//     const result = await pool.query(`SELECT * FROM findAllUsers()`);
//     res.json(result.rows);
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// })

httpServer.listen({ port: PORT }, () => {
  console.log(`server running on port ${PORT} : At http://localhost:${PORT}/graphql`.magenta.bold);
  connectDb();
});

