import { expectError, expectType } from 'tsd';
import Loopback from '.';
import { UserModel, VehicleModel, VehicleInstance, UserInstance } from './entities';

const app = new Loopback();

const tests = async () => {
  // Users
  const users = await app.models.User.find();
  expectType<UserModel>(app.models.User);
  expectType<UserInstance[]>(users);

  // Vehicles
  const vehicles = await app.models.Vehicle.find();
  expectType<VehicleModel>(app.models.Vehicle);
  expectType<VehicleInstance[]>(vehicles);

  // Simple filters
  expectError(
    await app.models.User.find({
      where: {
        age: 'oops not a number',
      },
    })
  );
  expectType<UserInstance[]>(
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
  expectType<UserInstance[]>(
    await app.models.User.find({
      where: {
        age: {
          neq: 20,
        },
      },
    })
  );

  expectError(
    await app.models.User.find({
      where: {
        age: {
          inq: 'hello',
        },
      },
    })
  );
  expectType<UserInstance[]>(
    await app.models.User.find({
      where: {
        age: {
          inq: [20, 10],
        },
      },
    })
  );

  // Instance methods
  const user = await app.models.User.findOne();
  expectType<UserInstance>(user);

  // Update instance method
  user.update({ age: 33 });
  user.update({ age: 33, name: 'hello' });
  expectError(user.update({ age: 'oh no', name: 'hello' }));
};

export default tests;
