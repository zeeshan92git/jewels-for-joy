export default function SizeChart() {
  const bangleSizes = [
    { size: "2.4", label: "S", inches: "2.25" },
    { size: "2.6", label: "M", inches: "2.37" },
    { size: "2.8", label: "L", inches: "2.50" },
    { size: "2.10", label: "XL", inches: "2.62" },
  ];

  return (
    <div className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="font-serif text-4xl text-center mb-12 uppercase tracking-tighter">Size Guide</h1>
      <div className="overflow-hidden border border-stone-200 rounded-sm">
        <table className="w-full text-left text-sm">
          <thead className="bg-stone-50 uppercase text-[10px] tracking-widest text-stone-500">
            <tr>
              <th className="px-6 py-4">Standard Size</th>
              <th className="px-6 py-4">Label</th>
              <th className="px-6 py-4">Diameter (Inches)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {bangleSizes.map((item) => (
              <tr key={item.size} className="hover:bg-stone-50 transition-colors">
                <td className="px-6 py-4 font-medium">{item.size}</td>
                <td className="px-6 py-4">{item.label}</td>
                <td className="px-6 py-4">{item.inches}"</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-6 text-xs text-black italic text-center">
        *Measure the internal diameter of your best-fitting jewellery for accuracy.
      </p>
    </div>
  );
}