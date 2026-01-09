import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export default async function StudentDashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    redirect("/student/login");
  }

  // Get student data
  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    include: {
      school: true,
      programProgress: {
        include: {
          step: true,
        },
        orderBy: {
          step: { orderIndex: "asc" },
        },
      },
    },
  });

  if (!student) {
    return <div>Student profile not found</div>;
  }

  // Calculate progress
  const totalSteps = student.programProgress.length;
  const completedSteps = student.programProgress.filter(
    (p: any) => p.status === "COMPLETED"
  ).length;
  const progressPercent = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Header */}
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {student.firstName}! 👋
            </h1>
            <p className="text-gray-600 mt-2">
              {student.school.name} • Grade {student.grade}
            </p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-yvape-blue">
              {Math.round(progressPercent)}%
            </div>
            <p className="text-sm text-gray-600">Complete</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-600 to-purple-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {completedSteps} of {totalSteps} steps completed
          </p>
        </div>
      </div>

      {/* Program Steps */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Program Steps</h2>
        
        <div className="grid gap-4">
          {student.programProgress.map((progress: any, index: number) => (
            <StepCard
              key={progress.id}
              step={progress.step}
              status={progress.status}
              stepNumber={index + 1}
              studentId={student.id}
            />
          ))}
        </div>
      </div>

      {/* Resources Section */}
      <div className="mt-12 grid md:grid-cols-3 gap-6">
        <ResourceCard
          title="Program Overview"
          description="Review the program details and expectations"
          icon="📋"
          href="/student/overview"
        />
        <ResourceCard
          title="Schedule Call"
          description="Book your one-on-one session"
          icon="📞"
          href="/student/schedule"
        />
        <ResourceCard
          title="Resources"
          description="Access videos and materials"
          icon="📚"
          href="/student/resources"
        />
      </div>
    </div>
  );
}

function StepCard({
  step,
  status,
  stepNumber,
  studentId,
}: {
  step: any;
  status: string;
  stepNumber: number;
  studentId: string;
}) {
  const statusConfigMap: Record<string, any> = {
    NOT_STARTED: {
      bg: "bg-gray-100",
      text: "text-gray-700",
      badge: "bg-gray-500",
      icon: "⏸️",
    },
    IN_PROGRESS: {
      bg: "bg-blue-50",
      text: "text-blue-900",
      badge: "bg-blue-500",
      icon: "🔄",
    },
    COMPLETED: {
      bg: "bg-green-50",
      text: "text-green-900",
      badge: "bg-green-500",
      icon: "✅",
    },
    SKIPPED: {
      bg: "bg-yellow-50",
      text: "text-yellow-900",
      badge: "bg-yellow-500",
      icon: "⏭️",
    },
  };
  
  const statusConfig = statusConfigMap[status] || statusConfigMap.NOT_STARTED;

  return (
    <div className={`${statusConfig.bg} rounded-lg shadow-md p-6 border-l-4 border-${statusConfig.badge}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{statusConfig.icon}</span>
            <div>
              <h3 className={`text-lg font-bold ${statusConfig.text}`}>
                Step {stepNumber}: {step.title}
              </h3>
              <span className={`inline-block px-2 py-1 text-xs font-semibold text-white ${statusConfig.badge} rounded-full mt-1`}>
                {status.replace("_", " ")}
              </span>
            </div>
          </div>
          <p className="text-gray-700 mt-3">{step.description}</p>
        </div>
        {status !== "COMPLETED" && (
          <button className="ml-4 px-4 py-2 bg-yvape-blue hover:bg-blue-700 text-white font-medium rounded-lg transition-colors">
            Start Step
          </button>
        )}
      </div>
    </div>
  );
}

function ResourceCard({
  title,
  description,
  icon,
  href,
}: {
  title: string;
  description: string;
  icon: string;
  href: string;
}) {
  return (
    <a
      href={href}
      className="block bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
    >
      <div className="text-4xl mb-3">{icon}</div>
      <h4 className="text-lg font-bold text-gray-900 mb-2">{title}</h4>
      <p className="text-sm text-gray-600">{description}</p>
    </a>
  );
}
