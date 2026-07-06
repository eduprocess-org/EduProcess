import { Mail, User, GraduationCap, ShieldCheck } from "lucide-react";

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const initials =
    `${user.firstName?.[0] || ""}${user.lastName?.[0] || ""}`.toUpperCase() || "—";

  const fields = [
    { icon: Mail, label: "Email", value: user.email || "—" },
    { icon: User, label: "First name", value: user.firstName || "—" },
    { icon: User, label: "Last name", value: user.lastName || "—" },
    { icon: GraduationCap, label: "Role", value: user.role || "—" },
  ];

  return (
    <div className="profile-page min-h-screen px-4 sm:px-6 py-10">
      <style>{`
        .profile-page {
          --navy: #14213D;
          --navy-soft: #1F3357;
          --gold: #B08D57;
          --green: #3F6F54;
          --green-soft: rgba(63,111,87,0.1);
          --slate: #64748B;
          --bg: #F5F6FA;
          --card: #FFFFFF;
          --card-border: rgba(20,33,61,0.06);
          --row-border: rgba(20,33,61,0.06);
          --row-hover: rgba(20,33,61,0.025);
          --icon-chip: rgba(20,33,61,0.05);
          --text-main: var(--navy);
          background: var(--bg);
          transition: background-color 0.2s ease;
        }

        .dark .profile-page {
          --navy: #E2E8F0;
          --navy-soft: #2A3F66;
          --gold: #C9A876;
          --green: #6FBE9A;
          --green-soft: rgba(111,190,154,0.12);
          --slate: #94A3B8;
          --bg: #0B1220;
          --card: #131B2E;
          --card-border: rgba(255,255,255,0.06);
          --row-border: rgba(255,255,255,0.06);
          --row-hover: rgba(255,255,255,0.03);
          --icon-chip: rgba(255,255,255,0.06);
          --text-main: #F1F5F9;
        }

        .pp-card {
          background: var(--card);
          border-radius: 20px;
          border: 1px solid var(--card-border);
          box-shadow: 0 1px 2px rgba(20,33,61,0.04), 0 16px 32px -20px rgba(20,33,61,0.18);
          transition: background-color 0.2s ease, border-color 0.2s ease;
        }

        .dark .pp-card {
          box-shadow: 0 1px 2px rgba(0,0,0,0.2), 0 16px 32px -20px rgba(0,0,0,0.5);
        }

        .pp-avatar {
          background: linear-gradient(150deg, #14213D 0%, #1F3357 100%);
          box-shadow: 0 8px 20px -6px rgba(20,33,61,0.4);
        }

        .dark .pp-avatar {
          background: linear-gradient(150deg, #1F3357 0%, #2A3F66 100%);
          box-shadow: 0 8px 20px -6px rgba(0,0,0,0.5);
        }

        .pp-badge,
        .pp-status {
          background: var(--green-soft);
          color: var(--green);
        }

        .pp-row {
          transition: background-color 0.15s ease;
        }
        .pp-row:hover {
          background: var(--row-hover);
        }
        .pp-row + .pp-row {
          border-top: 1px solid var(--row-border);
        }

        .pp-icon-chip {
          background: var(--icon-chip);
          color: var(--text-main);
        }

        @media (prefers-reduced-motion: no-preference) {
          .pp-fade-in { animation: pp-fade-in 0.45s ease-out both; }
        }
        @keyframes pp-fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="max-w-5xl mx-auto pp-fade-in">

        {/* HEADER */}
        <div className="mb-8">
          <p
            className="text-[11px] font-semibold uppercase tracking-wider mb-1"
            style={{ color: "var(--gold)" }}
          >
            Account
          </p>
          <h1 className="text-3xl font-bold" style={{ color: "var(--text-main)" }}>
            My Profile
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--slate)" }}>
            User personal information
          </p>
        </div>

        {/* LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* LEFT — IDENTITY */}
          <div className="md:col-span-1 pp-card p-8 flex flex-col items-center text-center">
            <div className="pp-avatar w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {initials}
            </div>

            <h2 className="mt-5 text-lg font-semibold" style={{ color: "var(--text-main)" }}>
              {user.firstName || "First name"} {user.lastName || "Last name"}
            </h2>

            <p className="text-sm capitalize mt-0.5" style={{ color: "var(--slate)" }}>
              {user.role || "No role"}
            </p>

            <span className="pp-badge mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium capitalize">
              <GraduationCap size={13} />
              {user.role || "User"}
            </span>

            <div className="pp-status mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-wide">
              <ShieldCheck size={12} strokeWidth={2.5} />
              Active
            </div>
          </div>

          {/* RIGHT — DETAILS */}
          <div className="md:col-span-2 pp-card overflow-hidden">
            <div className="px-7 pt-7 pb-4">
              <h3 className="text-base font-semibold" style={{ color: "var(--text-main)" }}>
                Personal information
              </h3>
            </div>

            <div>
              {fields.map(({ icon: Icon, label, value }) => (
                <div key={label} className="pp-row flex items-center gap-4 px-7 py-4">
                  <div className="pp-icon-chip w-10 h-10 rounded-full flex items-center justify-center shrink-0">
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <p
                      className="text-[11px] font-medium uppercase tracking-wide"
                      style={{ color: "var(--slate)" }}
                    >
                      {label}
                    </p>
                    <p
                      className="text-sm font-medium capitalize truncate"
                      style={{ color: "var(--text-main)" }}
                    >
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;