const bcrypt = require("bcryptjs")
const UserModel = require ("../Models/userMongo")

const createUser = async (
  name,
  email,
  password
)=> {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    await UserModel.create({
      name: name,
      emailId: email,
      password: hashedPassword,
    });

    return true;
  } catch (error) {
    console.error("Error creating user:", error);4
    return false;
  }
};

const verifyUser = async (email) => {
    try {
        const user = await UserModel.findOne({ emailId : email });
    
        return user
      } catch (error) {
        console.error('Error finding user:', error);
      }
};

module.exports ={verifyUser, createUser}
