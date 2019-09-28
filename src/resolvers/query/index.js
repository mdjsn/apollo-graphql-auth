import { getUserId } from "../../utils";

export const query = {
    async me(ctx) {
        const userId = getUserId(ctx);
        return await User.findOne({id: userId});
      }
  }