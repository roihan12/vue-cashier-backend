import config from "../../config/default";
import dbConnection from "../application/database";

const MONGODB_URL = config.dbUri;

dbConnection.connect(MONGODB_URL as string);

const args = process.argv;

console.log(args);
const fakerFile = args[2];
const limit = Number(args[3]);
const loadFaker = async () => {
  const faker = await import(`../faker/${fakerFile}`);
  faker.createUser(limit)
};

loadFaker();