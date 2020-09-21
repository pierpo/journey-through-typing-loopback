import { expectType } from 'tsd';
import Loopback, { UserEntity, UserModel } from '.';

const app = new Loopback();

const tests = async () => {
  const users = await app.models.User.find();
  expectType<UserModel>(app.models.User);
  expectType<UserEntity[]>(users);
};

export default tests;
