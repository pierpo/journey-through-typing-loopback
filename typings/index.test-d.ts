import { expectError, expectType } from 'tsd';
import Loopback from '.';
import {
  UserModel,
  VehicleModel,
  VehicleInstance,
  UserInstance,
  VehicleEntity,
} from './entities';

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
  expectType<string>(user.name);

  // Update instance method
  user.update({ age: 33 });
  user.update({ age: 33, name: 'hello' });
  expectError(user.update({ age: 'oh no', name: 'hello' }));

  // Relations
  const userWithVehicles = await app.models.User.findOne({
    include: 'vehicles',
  });
  expectType<VehicleEntity>(userWithVehicles.vehicles[0]);
  expectType<string>(userWithVehicles.vehicles[0].licencePlate);

  expectError(
    await app.models.User.findOne({
      include: 'blablabla',
    })
  );

  expectError(
    await app.models.User.findOne({
      include: 'name',
    })
  );
};

export default tests;
