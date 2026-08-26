/** Soft atmospheric backdrop for dashboard auth pages (login / forgot-password). */
export default function DashboardAuthAtmosphere() {
  return (
    <div className="dashboard-auth-atmosphere pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="dashboard-auth-atmosphere__base absolute inset-0" />
      <div className="dashboard-auth-atmosphere__beam absolute inset-0" />
      <div className="dashboard-auth-atmosphere__orb dashboard-auth-atmosphere__orb--a absolute" />
      <div className="dashboard-auth-atmosphere__orb dashboard-auth-atmosphere__orb--b absolute" />
      <div className="dashboard-auth-atmosphere__horizon absolute inset-x-0" />
      <div className="dashboard-auth-atmosphere__vignette absolute inset-0" />
    </div>
  );
}
