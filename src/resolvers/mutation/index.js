const { hash, compare } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

import User from '../../models';
import { APP_SECRET } from "../../utils";

export const mutation = {
  async signup({ email, password, name }, ctx) {
    const hashedPassword = await hash(password, 10);
    const user = await User.create({
      email,
      name,
      password: hashedPassword
    });
    return {
      token: sign({ userId: user.id }, APP_SECRET),
      email: user.email
    };
  },

  async login({ email, password }, ctx) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error(`No user found for email: ${email}`);
    }
    const passwordValid = await compare(password, user.password);
    if (!passwordValid) {
      throw new Error("Invalid password");
    }
    return {
      token: sign({ userId: user.id }, APP_SECRET),
      email: user.email
    };
  }
};
