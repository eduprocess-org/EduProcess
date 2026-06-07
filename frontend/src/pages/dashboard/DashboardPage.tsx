import {
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  ArrowUpRight,
} from "lucide-react";

function DashboardPage() {
  return (
    <div className="space-y-8">

      {/* HERO */}

      <div className="bg-gradient-to-r rounded-3xl p-8 text-black shadow-lg">

        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 w-full">

        <div>
          <h1 className="text-4xl font-bold mb-2 text-slate-900 dark:text-white">
            Welcome back, Vanessa 👋
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Manage your academic procedures efficiently and keep track of every request.
          </p>
        </div>

        <div className="flex flex-col items-start lg:items-end">
          <p className="text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Current Academic Period
          </p>
          <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
            Semester 7 2026 - 2026
          </h3>
        </div>
      </div>

      </div>

      {/* STATISTICS */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all border border-slate-100">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500">
                Total Procedures
              </p>

              <h2 className="text-4xl font-bold mt-2 text-slate-800">
                12
              </h2>

            </div>

            <div className="bg-blue-100 p-4 rounded-2xl">

              <FileText
                className="text-blue-700"
                size={30}
              />

            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all border border-slate-100">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500">
                Pending
              </p>

              <h2 className="text-4xl font-bold mt-2 text-yellow-600">
                4
              </h2>

            </div>

            <div className="bg-yellow-100 p-4 rounded-2xl">

              <Clock
                className="text-yellow-600"
                size={30}
              />

            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all border border-slate-100">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500">
                Approved
              </p>

              <h2 className="text-4xl font-bold mt-2 text-green-600">
                6
              </h2>

            </div>

            <div className="bg-green-100 p-4 rounded-2xl">

              <CheckCircle
                className="text-green-600"
                size={30}
              />

            </div>

          </div>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl transition-all border border-slate-100">

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500">
                Rejected
              </p>

              <h2 className="text-4xl font-bold mt-2 text-red-600">
                2
              </h2>

            </div>

            <div className="bg-red-100 p-4 rounded-2xl">

              <XCircle
                className="text-red-600"
                size={30}
              />

            </div>

          </div>

        </div>

      </div>

      {/* CONTENT */}

      <div className="grid lg:grid-cols-3 gap-6">

        {/* RECENT PROCEDURES */}

        <div className="lg:col-span-2 bg-white rounded-3xl shadow-md p-6">

          <div className="flex justify-between items-center mb-6">

            <h2 className="text-xl font-bold text-slate-800">
              Recent Procedures
            </h2>

            <button className="text-blue-600 flex items-center gap-2 text-sm font-medium hover:text-blue-800">

              View All

              <ArrowUpRight size={16} />

            </button>

          </div>

          <div className="space-y-4">

            <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition">

              <div>

                <h3 className="font-semibold">
                  Enrollment Request
                </h3>

                <p className="text-sm text-slate-500">
                  03/06/2026
                </p>

              </div>

              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                Approved
              </span>

            </div>

            <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition">

              <div>

                <h3 className="font-semibold">
                  Academic Certificate
                </h3>

                <p className="text-sm text-slate-500">
                  02/06/2026
                </p>

              </div>

              <span className="bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-sm font-medium">
                Pending
              </span>

            </div>

            <div className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition">

              <div>

                <h3 className="font-semibold">
                  Transcript Request
                </h3>

                <p className="text-sm text-slate-500">
                  29/05/2026
                </p>

              </div>

              <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
                Rejected
              </span>

            </div>

          </div>

        </div>

        {/* QUICK ACTIONS */}

        <div className="bg-white rounded-3xl shadow-md p-6">

          <h2 className="text-xl font-bold text-slate-800 mb-6">
            Quick Actions
          </h2>

          <div className="space-y-4">

            <button className="w-full bg-[#0B2D63] text-white p-4 rounded-2xl font-medium hover:bg-[#12408C] transition">
              Create New Procedure
            </button>

            <button className="w-full border border-slate-200 p-4 rounded-2xl font-medium hover:bg-slate-50 transition">
              Search Procedures
            </button>

            <button className="w-full border border-slate-200 p-4 rounded-2xl font-medium hover:bg-slate-50 transition">
              View Notifications
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardPage;