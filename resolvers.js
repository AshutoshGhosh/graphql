import { quotes, users } from "./fakedb.js";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const User = mongoose.model("User");

const resolvers = {
  Query: {
    users: () => users,
    user: (_, args) => users.find((user) => user._id === args._id),
    quotes: () => quotes,
    quote: (_, args) => quotes.filter((q) => q.by === args.by),
  },
  Mutation: {
    createUser: async (_, { userNew }) => {
      const user = await User.findOne({ email: userNew.email });
      if (user) {
        throw new Error(`User ${user.email} already exists`);
      }
      const hashedPassword = await bcrypt.hash(userNew.password, 12);

      const newUser = new User({
        ...userNew,
        password: hashedPassword,
      });

      return await newUser.save();
    },
  },
  User: {
    quotes: (us) => quotes.filter((q) => q.by == us._id),
  },
};

export default resolvers;
