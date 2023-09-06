// DriverLocationsMock.js

const { DriverLocations, STATUS, VEHICLE_TYPE } = require("../internal/models/user/driver/driver.dm");
const logger = require("../common/logutil").GetLogger("driver.mock.js");
// Mock data for DriverLocations
const mockDriverLocationsData = [
    {
      user_id: '64d0d37586ad5d4d6d1f5912',
      location: {
        type: 'Point',
        coordinates: [10.0, 20.0]
      },
      vehicle_number: 'ABC123',
      vehicle_name: 'Car1',
      vehicle_type: VEHICLE_TYPE.CAR,
      active: STATUS.ACTIVE
    },
    {
      user_id: '64d0d3be86ad5d4d6d1f5944',
      location: {
        type: 'Point',
        coordinates: [15.0, 25.0]
      },
      vehicle_number: 'XYZ456',
      vehicle_name: 'Car2',
      vehicle_type: VEHICLE_TYPE.CAR,
      active: STATUS.INACTIVE
    },
    {
      user_id: '64d0d3c286ad5d4d6d1f5949',
      location: {
        type: 'Point',
        coordinates: [30.0, 40.0]
      },
      vehicle_number: 'DEF789',
      vehicle_name: 'Car3',
      vehicle_type: VEHICLE_TYPE.CAR,
      active: STATUS.ACTIVE
    },
    {
      user_id: '64d0d3c586ad5d4d6d1f594e',
      location: {
        type: 'Point',
        coordinates: [5.0, 10.0]
      },
      vehicle_number: 'GHI101',
      vehicle_name: 'MOTOBIKE3',
      vehicle_type: VEHICLE_TYPE.MOTOBIKE,
      active: STATUS.INACTIVE
    },
    {
      user_id: '64d0d3c786ad5d4d6d1f5953',
      location: {
        type: 'Point',
        coordinates: [40.0, 50.0]
      },
      vehicle_number: 'JKL202',
      vehicle_name: 'MOTOBIKE2',
      vehicle_type: VEHICLE_TYPE.MOTOBIKE,
      active: STATUS.ACTIVE
    },
    {
      user_id: '64d0d3cc86ad5d4d6d1f5958',
      location: {
        type: 'Point',
        coordinates: [20.0, 30.0]
      },
      vehicle_number: 'MNO303',
      vehicle_name: 'MOTOBIKE1',
      vehicle_type: VEHICLE_TYPE.MOTOBIKE,
      active: STATUS.INACTIVE
    }
  ];

// Function to seed the mock data
async function seedMockDriverLocations(mockData) {
  try {
    
    if (mockData === true) {
      await DriverLocations.deleteMany({}); // Clear existing data
      // Use mock data if MOCK_DATA_ENABLED is set to true
      await DriverLocations.insertMany(mockDriverLocationsData);
      logger.info('Mock data for DriverLocations seeded successfully.');
    } else {
      // Use real data or perform other actions
      logger.info('Mock data seeding is disabled.');
    }
  } catch (error) {
    logger.error('Error seeding mock data for DriverLocations:', error);
  }
}
module.exports = {
  seedMockDriverLocations
};
