import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting YVAPE Demo Database Seed...\n');

  // Clear existing data
  console.log('🗑️  Cleaning existing data...');
  await prisma.emailLog.deleteMany({});
  await prisma.videoProgress.deleteMany({});
  await prisma.surveyResponse.deleteMany({});
  await prisma.activityLog.deleteMany({});
  await prisma.programProgress.deleteMany({});
  await prisma.student.deleteMany({});
  await prisma.school.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.programStep.deleteMany({});

  // Create schools
  console.log('\n🏫 Creating schools...');
  const school1 = await prisma.school.create({
    data: {
      name: 'Lincoln High School',
      address: '123 Education Lane',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      phone: '(555) 123-4567',
      email: 'admin@lincolnhs.edu',
    },
  });

  const school2 = await prisma.school.create({
    data: {
      name: 'Washington Academy',
      address: '456 Learning Blvd',
      city: 'Oakland',
      state: 'CA',
      zipCode: '94601',
      phone: '(555) 987-6543',
      email: 'admin@washingtonacademy.edu',
    },
  });
  console.log('✅ Created 2 schools');

  // Create admin users
  console.log('\n👤 Creating admin users...');
  const admin1 = await prisma.user.create({
    data: {
      email: 'admin@lincolnhs.edu',
      name: 'Sarah Johnson',
      role: 'ADMIN',
      emailVerified: new Date(),
      adminSchools: { connect: { id: school1.id } },
    },
  });

  const admin2 = await prisma.user.create({
    data: {
      email: 'admin@washingtonacademy.edu',
      name: 'Michael Chen',
      role: 'ADMIN',
      emailVerified: new Date(),
      adminSchools: { connect: { id: school2.id } },
    },
  });
  console.log('✅ Created 2 admin users');

  // Create student users
  console.log('\n🎓 Creating students...');
  const user1 = await prisma.user.create({
    data: {
      email: 'alex.rivera@student.com',
      name: 'Alex Rivera',
      role: 'STUDENT',
      emailVerified: new Date(),
    },
  });

  const student1 = await prisma.student.create({
    data: {
      userId: user1.id,
      schoolId: school1.id,
      firstName: 'Alex',
      lastName: 'Rivera',
      email: 'alex.rivera@student.com',
      phone: '(555) 111-2222',
      grade: '10',
      parentEmail: 'parent.rivera@email.com',
      parentPhone: '(555) 111-3333',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'jordan.lee@student.com',
      name: 'Jordan Lee',
      role: 'STUDENT',
      emailVerified: new Date(),
    },
  });

  const student2 = await prisma.student.create({
    data: {
      userId: user2.id,
      schoolId: school1.id,
      firstName: 'Jordan',
      lastName: 'Lee',
      email: 'jordan.lee@student.com',
      phone: '(555) 222-3333',
      grade: '11',
      parentEmail: 'parent.lee@email.com',
      parentPhone: '(555) 222-4444',
    },
  });

  const user3 = await prisma.user.create({
    data: {
      email: 'taylor.smith@student.com',
      name: 'Taylor Smith',
      role: 'STUDENT',
      emailVerified: new Date(),
    },
  });

  const student3 = await prisma.student.create({
    data: {
      userId: user3.id,
      schoolId: school2.id,
      firstName: 'Taylor',
      lastName: 'Smith',
      email: 'taylor.smith@student.com',
      phone: '(555) 333-4444',
      grade: '12',
      parentEmail: 'parent.smith@email.com',
      parentPhone: '(555) 333-5555',
    },
  });
  console.log('✅ Created 3 students');

  // Create program steps
  console.log('\n📚 Creating program steps...');
  const step1 = await prisma.programStep.create({
    data: {
      title: 'Welcome & Orientation',
      description: 'Introduction to the YVAPE program and understanding vaping risks.',
      orderIndex: 1,
      isRequired: true,
    },
  });

  const step2 = await prisma.programStep.create({
    data: {
      title: 'Health Impact Education',
      description: 'Learn about health effects of vaping and nicotine addiction.',
      orderIndex: 2,
      isRequired: true,
    },
  });

  const step3 = await prisma.programStep.create({
    data: {
      title: 'Coping Strategies',
      description: 'Develop healthy coping mechanisms and stress management.',
      orderIndex: 3,
      isRequired: true,
    },
  });

  const step4 = await prisma.programStep.create({
    data: {
      title: 'Peer Pressure & Social Skills',
      description: 'Learn to handle peer pressure and make healthy decisions.',
      orderIndex: 4,
      isRequired: true,
    },
  });

  const step5 = await prisma.programStep.create({
    data: {
      title: 'Final Assessment',
      description: 'Complete program assessment and make commitment to quit vaping.',
      orderIndex: 5,
      isRequired: true,
    },
  });
  console.log('✅ Created 5 program steps');

  // Create progress for students
  console.log('\n📊 Creating student progress...');
  
  // Alex - 2 completed, 1 in progress
  await prisma.programProgress.createMany({
    data: [
      {
        studentId: student1.id,
        stepId: step1.id,
        status: 'COMPLETED',
        startedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      },
      {
        studentId: student1.id,
        stepId: step2.id,
        status: 'COMPLETED',
        startedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      },
      {
        studentId: student1.id,
        stepId: step3.id,
        status: 'IN_PROGRESS',
        startedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      },
    ],
  });

  // Jordan - just started
  await prisma.programProgress.create({
    data: {
      studentId: student2.id,
      stepId: step1.id,
      status: 'IN_PROGRESS',
      startedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
  });

  // Taylor - completed all
  await prisma.programProgress.createMany({
    data: [
      {
        studentId: student3.id,
        stepId: step1.id,
        status: 'COMPLETED',
        startedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000),
      },
      {
        studentId: student3.id,
        stepId: step2.id,
        status: 'COMPLETED',
        startedAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 23 * 24 * 60 * 60 * 1000),
      },
      {
        studentId: student3.id,
        stepId: step3.id,
        status: 'COMPLETED',
        startedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
      },
      {
        studentId: student3.id,
        stepId: step4.id,
        status: 'COMPLETED',
        startedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000),
      },
      {
        studentId: student3.id,
        stepId: step5.id,
        status: 'COMPLETED',
        startedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
      },
    ],
  });
  console.log('✅ Created progress records');

  // Create activity logs
  console.log('\n📝 Creating activity logs...');
  await prisma.activityLog.createMany({
    data: [
      {
        studentId: student1.id,
        activityType: 'LOGIN',
        description: 'Student logged into portal',
      },
      {
        studentId: student1.id,
        activityType: 'VIDEO_WATCHED',
        description: 'Watched: Understanding Vaping Risks',
      },
      {
        studentId: student3.id,
        activityType: 'STEP_COMPLETED',
        description: 'Completed Final Assessment',
      },
    ],
  });
  console.log('✅ Created activity logs');

  // Create email logs
  console.log('\n📧 Creating email logs...');
  await prisma.emailLog.createMany({
    data: [
      {
        recipientEmail: 'admin@lincolnhs.edu',
        emailType: 'ADMIN_CONFIRMATION',
        subject: 'New Student Enrollment',
        status: 'DELIVERED',
      },
      {
        recipientEmail: 'alex.rivera@student.com',
        emailType: 'STUDENT_WELCOME',
        subject: 'Welcome to YVAPE Program',
        status: 'DELIVERED',
      },
      {
        recipientEmail: 'parent.rivera@email.com',
        emailType: 'PARENT_WELCOME',
        subject: 'Your Child Enrolled in YVAPE',
        status: 'DELIVERED',
      },
    ],
  });
  console.log('✅ Created email logs');

  console.log('\n🎉 Demo seed completed!\n');
  console.log('📋 Demo Login Credentials:');
  console.log('   👨‍💼 Admin: admin@lincolnhs.edu');
  console.log('   🎓 Student 1: alex.rivera@student.com (40% complete)');
  console.log('   🎓 Student 2: jordan.lee@student.com (just started)');
  console.log('   🎓 Student 3: taylor.smith@student.com (100% complete)\n');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
