export default function Card({ title, children, icon: Icon }) {
  return (
    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center space-x-3 mb-4">
        {Icon && <Icon className="w-6 h-6 text-primary" />}
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="text-gray-300">
        {children}
      </div>
    </div>
  );
}
