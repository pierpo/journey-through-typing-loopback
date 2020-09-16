import { expectError, expectType } from 'tsd';
import Loopback from '.';
import { UserModel, UserEntity, VehicleModel, VehicleEntity } from './entities';

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

  // Simple filters
  expectError(
    await app.models.User.find({
      where: {
        blabla: 'oops this key does not exist',
      },
    })
  );
  expectError(
    await app.models.User.find({
      where: {
        age: 'oops key exists but is not a number',
      },
    })
  );
  expectType<UserEntity[]>(
    await app.models.User.find({
      where: {
        age: 20,
      },
    })
  );

  // Nested filters
  expectError(
    await app.models.User.find({
      where: {
        age: {
          neq: 'hello',
        },
      },
    })
  );
  expectType<UserEntity[]>(
    await app.models.User.find({
      where: {
        age: {
          neq: 20,
        },
      },
    })
  );
};

export default tests;
