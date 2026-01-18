export default function Card({ title, children, icon: Icon, className = "" }) {
  return (
    <div
      className={`
        bg-white rounded-2xl p-8 border border-slate-200/80
        shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)]
        hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1),0_2px_10px_-2px_rgba(0,0,0,0.04)]
        hover:border-slate-200
        transition-all duration-300
        ${className}
      `}
    >
      {(title || Icon) && (
        <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-100">
          {Icon && (
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#e8f0fe] text-[#0f62fe]">
              <Icon className="h-6 w-6" strokeWidth={2} />
            </div>
          )}
          {title && <h2 className="text-xl font-bold text-slate-900 tracking-tight">{title}</h2>}
        </div>
      )}
      <div className="text-slate-600 leading-relaxed">{children}</div>
    </div>
  );
}
