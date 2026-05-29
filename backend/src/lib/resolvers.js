import { Pool } from "pg";
import '@apollo/server';
import User from "../models/User.js";
import Client  from "../models/Client.js";
import Project from "../models/Project.js";
import { GraphQLScalarType, Kind } from 'graphql';


// PostgresSQL connection pool
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "graphql-db",
  password: process.env.DB_PASS || 'quasar',
  port: process.env.DB_PORT || 5432
});

const ALL_USERS_QUERY = `SELECT * FROM findAllUsers();`;
const USER_BY_ID_QUERY = `SELECT * FROM findUserByID($1);`;
const USER_BY_EMAIL_QUERY = `SELECT * FROM findUserByEmail($1);`;
const CREATE_USER_QUERY = `SELECT * FROM create_user($1, $2, $3, $4);`;
const UPDATE_USER_QUERY = `SELECT * FROM update_user_by_id($1,$2);`;
const DELETE_USER_QUERY = `SELECT * FROM delete_user($1);`;


const resolvers = {

  Query: {
    // get all users
    users: async () => {
      try {
        const result = await pool.query(ALL_USERS_QUERY);
        console.log(result.rows);
        return result.rows;
      } catch (error) {
        console.error("Error getting users:", error);
        throw error;
      }
    },

    clients: async () => {
      try {
        const result = await Client.find();
        return result;
      } catch (error) {
        console.error("Error getting clients:", error);
        throw error;
      }
    },

    userById: async (_, { id }) => {
      try {
        const result = await pool.query(USER_BY_ID_QUERY, [id]);

        if (result.rows.length === 0) {
          throw new Error("User not found. Try again.");
        }

        console.log(result.rows);
        return result.rows[0];
      } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
      }
    },
    userByEmail: async (_, { email }) => {
      try {
        const result = await pool.query(USER_BY_EMAIL_QUERY, [email]);

        if (result.rows.length === 0) {
          throw new Error("User not found");
        }

        return result.rows[0];
      } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
      }
    },

    projects: async () => {
      try {
        const result = await Project.find();
        return result;
      } catch (error) {
        console.error("Error getting projects:", error);
        throw error;
      }
    }
  },

  Mutation: {
    createUser: async (_, { firstname, lastname, address, email }) => {

      // validate input fields
      if (!firstname || !lastname || !address || !email) {
        throw new Error('Missing required fields : lastName, firstName, address or email');
      }

      // check for exixting user
      const existingUser = await pool.query(USER_BY_EMAIL_QUERY, [email]);
      if (existingUser.rows.length > 0) {
        throw new Error('User already exists');
      }

      try {
        const result = await pool.query(CREATE_USER_QUERY, [firstname, lastname, address, email]);
        console.log(result.rows[0]);
        return result.rows[0];
      } catch (error) {
        console.error('Error creating user:', error);
        throw error;
      }
    },

    updateUser: async (_, { id, address }) => {
      if (!id || !address) {
        throw new Error('Missing required fields : id and address');
      }

      try {
        const result = await pool.query(UPDATE_USER_QUERY, [id, address]);
        console.log(result.rows[0]);
        return result.rows[0] || 'User does not exist';
      } catch (error) {
        console.error('Error updating user:', error);
        throw error;
      }
    },

    deleteUser: async (_, { id }) => {
      if (!id) {
        throw new Error('Missing required fields : id');
      }

      try {
        const result = await pool.query(DELETE_USER_QUERY, [id]);
        return result.rows[0] || 'User does not exist';
      } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
      }
    },

    createZipUser: async (_, { fullName, email, password, bio, profilePic, nativeLanguage, learningLanguage, location, isOnboarded}) => {
      try {
        if(!fullName || !email || !password || !bio || !profilePic || !nativeLanguage || !learningLanguage || !location) {
          throw new Error('Missing required fields : fullName, email, password, bio, profilePic, nativeLanguage, learningLanguage, location');
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error('User already exists');
        }

        const result = await User.create({ fullName, email, password, bio, profilePic, nativeLanguage, learningLanguage, location, isOnboarded});
        
        return result;
      } catch (error) {
        console.error('Error creating user:', error);
        throw error;
      }
    },

    createClient: async (_, { name, email, projects }) => {
      try {
        const result = await Client.create({ name, email, projects });
        return result;
      } catch (error) {
        console.error('Error creating client:', error);
        throw error;
      }
    },

    createProject: async (_, { name, clientId, description }) => {
      try {
        if(!name || !clientId || !description) {
          throw new Error('Missing required fields : name, clientId, description');
        }

        const existingClient = await Client.findOne({ _id: clientId });
        if (!existingClient) {
          throw new Error('Client does not exist');
        }

        const result = await Project.create({ name, clientId, description });
        await existingClient.projects.push(result._id);
        await existingClient.save();
        
        return result;
      } catch (error) {
        console.error('Error creating project:', error);
        throw error;
      }
    }
  }
}

export default resolvers;