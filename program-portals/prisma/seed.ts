import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create sample school
  const school = await prisma.school.upsert({
    where: { id: 'seed-school-1' },
    update: {},
    create: {
      id: 'seed-school-1',
      name: 'Demo High School',
      address: '123 Education Lane',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94102',
      phone: '(555) 123-4567',
      email: 'admin@demohigh.edu',
      isActive: true,
    },
  });

  console.log('✅ Created school:', school.name);

  // Create admin user
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@demohigh.edu' },
    update: {},
    create: {
      email: 'admin@demohigh.edu',
      name: 'Demo Admin',
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  });

  // Link admin to school
  await prisma.school.update({
    where: { id: school.id },
    data: { adminUserId: adminUser.id },
  });

  console.log('✅ Created admin user:', adminUser.email);

  // Create student user
  const studentUser = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      name: 'Demo Student',
      role: 'STUDENT',
      emailVerified: new Date(),
    },
  });

  // Create student profile
  const student = await prisma.student.upsert({
    where: { userId: studentUser.id },
    update: {},
    create: {
      userId: studentUser.id,
      schoolId: school.id,
      firstName: 'Demo',
      lastName: 'Student',
      email: 'student@example.com',
      grade: '10',
      language: 'English',
      isUnder18: true,
      parentName: 'Parent Demo',
      parentEmail: 'parent@example.com',
    },
  });

  console.log('✅ Created student:', student.firstName, student.lastName);

  // Create program steps
  const programSteps = [
    {
      title: 'Welcome & Program Overview',
      description: 'Introduction to the YVAPE program and what to expect',
      orderIndex: 1,
      videoUrl: 'https://example.com/videos/welcome',
      duration: 10,
      isRequired: true,
    },
    {
      title: 'Understanding Vaping Risks',
      description: 'Learn about the health risks associated with vaping',
      orderIndex: 2,
      videoUrl: 'https://example.com/videos/risks',
      surveyUrl: 'https://example.com/surveys/knowledge-check',
      duration: 15,
      isRequired: true,
    },
    {
      title: 'Peer Pressure & Decision Making',
      description: 'Strategies for handling peer pressure and making healthy choices',
      orderIndex: 3,
      videoUrl: 'https://example.com/videos/peer-pressure',
      duration: 12,
      isRequired: true,
    },
    {
      title: 'Creating Your Action Plan',
      description: 'Develop a personal action plan for staying vape-free',
      orderIndex: 4,
      surveyUrl: 'https://example.com/surveys/action-plan',
      duration: 20,
      isRequired: true,
    },
    {
      title: 'Program Completion Survey',
      description: 'Final survey and program feedback',
      orderIndex: 5,
      surveyUrl: 'https://example.com/surveys/completion',
      duration: 10,
      isRequired: true,
    },
  ];

  for (const stepData of programSteps) {
    const step = await prisma.programStep.upsert({
      where: { orderIndex: stepData.orderIndex },
      update: {},
      create: stepData,
    });
    console.log(`✅ Created program step ${step.orderIndex}:`, step.title);

    // Create progress entry for demo student
    await prisma.programProgress.upsert({
      where: {
        studentId_stepId: {
          studentId: student.id,
          stepId: step.id,
        },
      },
      update: {},
      create: {
        studentId: student.id,
        stepId: step.id,
        status:
          step.orderIndex === 1
            ? 'COMPLETED'
            : step.orderIndex === 2
            ? 'IN_PROGRESS'
            : 'NOT_STARTED',
        startedAt: step.orderIndex <= 2 ? new Date() : null,
        completedAt: step.orderIndex === 1 ? new Date() : null,
      },
    });
  }

  console.log('✅ Created program progress for demo student');

  // Create sample activity log
  await prisma.activityLog.create({
    data: {
      studentId: student.id,
      action: 'login',
      details: 'Student logged in via magic link',
      ipAddress: '127.0.0.1',
    },
  });

  console.log('✅ Created sample activity log');

  // Create sample email log
  await prisma.emailLog.create({
    data: {
      recipientEmail: student.email,
      recipientName: `${student.firstName} ${student.lastName}`,
      emailType: 'student_welcome',
      subject: 'Welcome to YVAPE!',
      status: 'sent',
      sentAt: new Date(),
    },
  });

  console.log('✅ Created sample email log');

  console.log('');
  console.log('🎉 Database seeded successfully!');
  console.log('');
  console.log('📝 You can now log in with:');
  console.log('   Admin: admin@demohigh.edu');
  console.log('   Student: student@example.com');
  console.log('');
  console.log('⚠️  Note: Magic link authentication is configured.');
  console.log('   You will need to check the VerificationToken table');
  console.log('   or configure email sending to log in.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error seeding database:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
