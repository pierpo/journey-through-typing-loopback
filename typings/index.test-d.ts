import { expectType } from 'tsd';
import Loopback, {
  UserEntity,
  UserModel,
  VehicleEntity,
  VehicleModel,
} from '.';

const app = new Loopback();

const tests = async () => {
  // Users
  const users = await app.models.User.find();
  expectType<UserModel>(app.models.User);
  expectType<UserEntity[]>(users);

  // Vehicles
  const vehicles = await app.models.Vehicle.find();
  expectType<VehicleModel>(app.models.Vehicle);
  expectType<VehicleEntity[]>(vehicles);
};

export default tests;
