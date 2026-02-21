export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary: 'bg-stone-900 text-white hover:bg-stone-800',
    outline: 'border border-stone-300 text-stone-800 hover:bg-stone-50',
    gold: 'bg-gold text-white hover:opacity-90',
  };

  return (
    <button 
      className={`px-8 py-3 text-xs uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}