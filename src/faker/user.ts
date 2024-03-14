import User from "../model/userModel";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const createUser = async (limit : number) => {
  try {
    let data = [];
    for (let i = 0; i < limit; i++) {
      data.push({
        fullname: faker.person.fullName(),
        email: faker.internet.email(),
        password: await bcrypt.hash(faker.internet.password(), 10),
      });
    }

    const fakeUserData = await User.insertMany(data);
    if (fakeUserData) {
      console.log(fakeUserData);
      process.exit();
    }
  } catch (error) {
    console.log(error);
    process.exit();
  }
};
// createUser();

export { createUser };
