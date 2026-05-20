import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
      <header className="mx-auto max-w-7xl px-6 py-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">URBAN-R</h1>
          <p className="mt-2 text-sm text-slate-300">Smart training, safer drivers, and faster complaint resolution for city mobility.</p>
        </div>
        <nav className="flex items-center gap-4">
          <Link to="/login" className="rounded-full border border-slate-600 bg-slate-700/70 px-5 py-2 text-sm font-semibold text-white transition hover:border-white hover:bg-slate-600">
            Login
          </Link>
          <Link to="/signup" className="rounded-full border border-transparent bg-sky-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">
            Sign Up
          </Link>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-16">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] items-center py-16">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-sky-500/20 px-4 py-2 text-sm font-semibold text-sky-200">Connected e-rickshaw compliance for modern cities</p>
            <h2 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">Keep your fleet safe, informed, and always ready to roll.</h2>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              URBAN-R brings driver training, route compliance, and passenger complaints into one modern platform — built for drivers, operators, and administrators who want safer rides and better city mobility.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link to="/login" className="inline-flex items-center justify-center rounded-full bg-sky-500 px-7 py-3 text-base font-semibold text-slate-950 shadow-lg shadow-sky-500/30 transition hover:bg-sky-400">
                Login to Your Account
              </Link>
              <Link to="/signup" className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-800 px-7 py-3 text-base font-semibold text-white transition hover:border-slate-500">
                Create an Account
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-700 bg-slate-950/70 p-8 shadow-2xl shadow-black/30">
            <div className="space-y-6">
              <div className="rounded-3xl bg-slate-900/80 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-sky-300">Driver Training</p>
                <h3 className="mt-3 text-2xl font-semibold">Track driver readiness in real time</h3>
                <p className="mt-3 text-slate-400">Enable drivers to complete compliance training with just a few clicks, then automatically record the result in the system.</p>
              </div>
              <div className="rounded-3xl bg-slate-900/80 p-6">
                <p className="text-sm uppercase tracking-[0.2em] text-sky-300">Complaint Management</p>
                <h3 className="mt-3 text-2xl font-semibold">Resolve rider issues faster</h3>
                <p className="mt-3 text-slate-400">Passengers can submit complaints quickly, and admins can track status from pending to resolved.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-8 sm:grid-cols-3">
          {[
            { title: 'Training progress', description: 'Automated certification flow with recorded driver results.' },
            { title: 'Complaint history', description: 'A single view for riders to log and view issue status.' },
            { title: 'Driver dashboard', description: 'Clear activity and stats for every driver on the platform.' }
          ].map((item) => (
            <div key={item.title} className="rounded-3xl border border-slate-700 bg-slate-950/70 p-6 text-slate-200">
              <h4 className="text-xl font-semibold text-white">{item.title}</h4>
              <p className="mt-3 text-sm leading-6 text-slate-400">{item.description}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 rounded-3xl border border-slate-700 bg-slate-950/70 p-10 text-slate-200">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-sky-300">How URBAN-R works</p>
              <h3 className="mt-4 text-3xl font-bold text-white">From onboarding to resolution in three simple steps.</h3>
              <p className="mt-4 max-w-xl text-slate-400">Whether you are a driver, passenger, or admin, the URBAN-R platform turns training, reporting, and tracking into one seamless workflow.</p>
            </div>
            <div className="space-y-4">
              {[
                { label: '01', title: 'Register & verify', detail: 'Create your account, then log in as a driver, passenger, or admin.' },
                { label: '02', title: 'Complete training', detail: 'Drivers complete safety modules and assessments to get certified.' },
                { label: '03', title: 'Submit & resolve', detail: 'Passengers file complaints and admins manage resolutions with status updates.' }
              ].map((item) => (
                <div key={item.label} className="rounded-3xl bg-slate-900/80 p-6 border border-slate-700">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-sm font-bold text-slate-950">{item.label}</span>
                  <h4 className="mt-4 text-xl font-semibold text-white">{item.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-800 bg-slate-950/80 py-8 text-slate-400">
        <div className="mx-auto max-w-7xl px-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold text-white">URBAN-R</p>
            <p className="mt-2 text-sm text-slate-400">City mobility done smarter with training, reporting, and real-time visibility.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <Link to="/login" className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400">Login</Link>
            <Link to="/signup" className="rounded-full border border-slate-700 bg-slate-900 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:border-slate-500">Sign Up</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
