const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("./userModel");

const createUser = async (userData) => {
  try {
    const signtoken = jwt.sign(
      { userName: userData.userName, userPassword: userData.userPassword },
      process.env.JWT_SECRET
    );

    const salt = await bcrypt.genSalt(8);
    const encryptedPassword = await bcrypt.hash(userData.userPassword, salt);

    const createdUser = await UserModel.create({
      userName: userData.userName,
      userPassword: encryptedPassword,
      mobile: userData.mobile,
      email: userData.email,
      role: userData.role,
      address: userData.address,
      token: signtoken,
    });

    return createdUser;
  } catch (err) {
    throw err;
  }
};
const loginUser = async (userName, userPassword) => {
  // Find user by username
  const loginuser = await UserModel.findOne({
    where: { userName },
    rejectOnEmpty: true,
  });

  if (!loginuser) {
    throw new Error("User not found"); // Throw an error if user not found
  }

  // Compare password
  const isMatch = await bcrypt.compare(userPassword, loginuser.userPassword);

  if (!isMatch) {
    throw new Error("Invalid password"); // Throw an error if password doesn't match
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: loginuser.id, role: loginuser.role },
    process.env.JWT_SECRET,
    { expiresIn: "365d" } // You can set token expiry as needed
  );

  // Return user and token
  return { loginuser, token };
};
const updateUser = async (userId, userData) => {
  // Find user by primary key
  const user = await UserModel.findByPk(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Update user data
  await user.update(userData);

  return user; // Return the updated user
};

// Service to delete a user
const deleteUser = async (userId) => {
  // Find user by primary key
  const user = await UserModel.findByPk(userId);

  if (!user) {
    throw new Error("User not found");
  }

  // Delete user
  await user.destroy();

  return { message: "User deleted successfully" };
};
module.exports = {
  createUser,
  loginUser,
  updateUser,
  deleteUser,
};
