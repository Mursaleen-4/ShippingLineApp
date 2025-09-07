import { connectDB, disconnectDB } from '../config/db';
import { User } from '../models/User';
import { Vessel } from '../models/Vessel';
import { hashPassword } from '../utils/password';

const sampleUsers = [
  {
    userId: 'admin',
    password: 'AdminPass123!',
    role: 'admin' as const,
  },
  {
    userId: 'operator1',
    password: 'OperatorPass123!',
    role: 'user' as const,
  },
  {
    userId: 'manager',
    password: 'ManagerPass123!',
    role: 'user' as const,
  },
];

const sampleVessels = [
  {
    vesselName: 'MSC DIANA',
    voyageNo: 'DIA001E',
    country: 'Panama',
    portName: 'Port of Hamburg',
    ETA: new Date('2024-01-15T08:00:00Z'),
    ETD: new Date('2024-01-17T18:00:00Z'),
  },
  {
    vesselName: 'MAERSK ESSEX',
    voyageNo: 'ESX234W',
    country: 'Denmark',
    portName: 'Port of Rotterdam',
    ETA: new Date('2024-01-20T06:30:00Z'),
    ETD: new Date('2024-01-22T14:00:00Z'),
  },
  {
    vesselName: 'COSCO SHANGHAI',
    voyageNo: 'CSH089N',
    country: 'China',
    portName: 'Port of Felixstowe',
    ETA: new Date('2024-01-25T12:00:00Z'),
    ETD: new Date('2024-01-28T09:30:00Z'),
  },
  {
    vesselName: 'CMA CGM ANTOINE DE SAINT EXUPERY',
    voyageNo: 'ASE445S',
    country: 'France',
    portName: 'Port of Southampton',
    ETA: new Date('2024-02-01T10:15:00Z'),
    ETD: new Date('2024-02-03T16:45:00Z'),
  },
  {
    vesselName: 'EVERGREEN EVER ACE',
    voyageNo: 'ACE567E',
    country: 'Taiwan',
    portName: 'Port of London',
    ETA: new Date('2024-02-05T07:00:00Z'),
    ETD: new Date('2024-02-07T19:30:00Z'),
  },
  {
    vesselName: 'HAPAG LLOYD BERLIN EXPRESS',
    voyageNo: 'BER789W',
    country: 'Germany',
    portName: 'Port of Liverpool',
    ETA: new Date('2024-02-10T11:30:00Z'),
    ETD: new Date('2024-02-12T15:00:00Z'),
  },
  {
    vesselName: 'ONE STORK',
    voyageNo: 'STK123N',
    country: 'Japan',
    portName: 'Port of Bristol',
    ETA: new Date('2024-02-15T09:45:00Z'),
    ETD: new Date('2024-02-17T13:15:00Z'),
  },
  {
    vesselName: 'YANG MING EXCELLENCE',
    voyageNo: 'EXC456S',
    country: 'Taiwan',
    portName: 'Port of Newcastle',
    ETA: new Date('2024-02-20T14:20:00Z'),
    ETD: new Date('2024-02-22T20:00:00Z'),
  },
  {
    vesselName: 'ZIM KINGSTON',
    voyageNo: 'KIN789E',
    country: 'Israel',
    portName: 'Port of Hull',
    ETA: new Date('2024-02-25T08:30:00Z'),
    ETD: new Date('2024-02-27T17:45:00Z'),
  },
  {
    vesselName: 'HYUNDAI BRAVE',
    voyageNo: 'BRV321W',
    country: 'South Korea',
    portName: 'Port of Glasgow',
    ETA: new Date('2024-03-01T06:00:00Z'),
    ETD: new Date('2024-03-03T12:30:00Z'),
  },
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Connect to database
    await connectDB();

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await User.deleteMany({});
    await Vessel.deleteMany({});

    // Create users
    console.log('👥 Creating users...');
    const userPromises = sampleUsers.map(async (userData) => {
      const hashedPassword = await hashPassword(userData.password);
      return User.create({
        userId: userData.userId,
        passwordHash: hashedPassword,
        role: userData.role,
      });
    });

    const createdUsers = await Promise.all(userPromises);
    console.log(`✅ Created ${createdUsers.length} users:`);
    createdUsers.forEach(user => {
      console.log(`   - ${user.userId} (${user.role})`);
    });

    // Create vessels
    console.log('🚢 Creating vessels...');
    const createdVessels = await Vessel.create(sampleVessels);
    console.log(`✅ Created ${createdVessels.length} vessels:`);
    createdVessels.forEach(vessel => {
      console.log(`   - ${vessel.vesselName} (${vessel.voyageNo}) -> ${vessel.portName}`);
    });

    // Print login credentials
    console.log('\n🔑 Login Credentials:');
    console.log('====================');
    sampleUsers.forEach(user => {
      console.log(`👤 User ID: ${user.userId}`);
      console.log(`🔒 Password: ${user.password}`);
      console.log(`🎭 Role: ${user.role}`);
      console.log('-------------------');
    });

    console.log('\n✨ Database seeding completed successfully!');
    console.log('🚀 You can now start the server and login with the above credentials.');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  } finally {
    // Disconnect from database
    await disconnectDB();
    process.exit(0);
  }
}

// Check if script is being run directly
if (require.main === module) {
  seedDatabase();
}

export { seedDatabase };
