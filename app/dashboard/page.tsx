import "@/app/styles/dashboard.css"

const DashboardPage = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-charcoal-gray mb-6">Welcome to Your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
            <h2 className="text-xl font-semibold text-slate-blue mb-2">Metric {item}</h2>
            <p className="text-charcoal-gray">Placeholder data for metric {item}.</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
