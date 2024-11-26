import User from "../schema/user.js";
import crudRepository from "./crudRepository.js";

const userRepository = {
    ...crudRepository(User),
    getByEmail: async function (email) {
        const user = await User.findOne({email});
        return user;
    },

    getByUsername: async function (username){
        const user = await User.findOne({username});
        return user;
    }
};

export default userRepository;