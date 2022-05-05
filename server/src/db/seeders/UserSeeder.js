import { User } from "../../models/index.js";

class UserSeeder{
  static async seed(){
    const usersData = [
      {
        email: 'hotmail@hotmail.com',
        cryptedPassword: 'BestIdea'
      },
      {
        email: 'somethingElse@gmail.com',
        cryptedPassword: 'superSupers'
      }
    ];

    for (const singleUserData of usersData) {
      const currentUser = await User.query().findOne(singleUserData);
      if (!currentUser) {
        await User.query().insert(singleUserData);
      }
    }
  }
}

export default UserSeeder;