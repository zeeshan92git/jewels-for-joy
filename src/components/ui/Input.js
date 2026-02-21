export default function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-2 w-full text-left">
      {label && <label className="text-[10px] uppercase tracking-widest text-stone-500 font-medium">{label}</label>}
      <input 
        className="border-b border-stone-200 bg-transparent py-2 text-sm outline-none focus:border-gold transition-colors"
        {...props} 
      />
    </div>
  );
}