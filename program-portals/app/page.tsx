import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yvape-purple to-yvape-blue flex items-center justify-center p-8">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-2xl p-12 text-center">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            🦄 YVAPE Program Portals
          </h1>
          <p className="text-xl text-gray-600">
            Welcome to the YVAPE Program Management System
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          <Link 
            href="/admin/login"
            className="group bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white p-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="text-4xl mb-4">👨‍💼</div>
            <h2 className="text-2xl font-bold mb-2">Admin Portal</h2>
            <p className="text-purple-100">
              School administrators track student progress and manage enrollments
            </p>
          </Link>

          <Link 
            href="/student/login"
            className="group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1"
          >
            <div className="text-4xl mb-4">🎓</div>
            <h2 className="text-2xl font-bold mb-2">Student Portal</h2>
            <p className="text-blue-100">
              Students access program materials and track their progress
            </p>
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Powered by YVAPE • Secure magic link authentication
          </p>
        </div>
      </div>
    </div>
  );
}
