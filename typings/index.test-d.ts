import { expectError, expectType } from 'tsd';
import Loopback from '.';
import {
  UserModel,
  VehicleModel,
  VehicleInstance,
  UserInstance,
  VehicleEntity,
  BookingEntity,
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

  // Accurate relations - get only relations that were specified
  expectError(user.vehicles[0].licencePlate);

  // Multiple relations
  expectType<VehicleEntity>(
    (
      await app.models.User.findOne({
        include: ['vehicles'],
      })
    ).vehicles[0]
  );
  const userWithVehiclesAndBookings = await app.models.User.findOne({
    include: ['vehicles', 'bookings'],
  });
  expectType<BookingEntity>(userWithVehiclesAndBookings.bookings[0]);
  expectType<string>(userWithVehiclesAndBookings.bookings[0].id);

  expectError(userWithVehicles.bookings[0].id);

  // Declaring remote methods
  app.models.User.addVehicle = (licencePlate: string, age: number) => {};
  app.models.User.remoteMethod('addVehicle', {
    http: { verb: 'post', status: 200 },
    accepts: [
      { arg: 'licencePlate', type: 'string' },
      { arg: 'age', type: 'number' },
    ],
    returns: { root: true, type: 'number' },
  });

  expectError(
    app.models.User.remoteMethod('addVehicle', {
      http: { verb: 'post', status: 200 },
      accepts: [
        { arg: 'licencePlate', type: 'number' },
        { arg: 'age', type: 'number' },
      ],
      returns: { root: true, type: 'number' },
    })
  );

  expectError(
    app.models.User.remoteMethod('addVehicleWithTypo', {
      http: { verb: 'post', status: 200 },
      accepts: [
        { arg: 'licencePlate', type: 'string' },
        { arg: 'age', type: 'number' },
      ],
      returns: { root: true, type: 'number' },
    })
  );
};

export default tests;
