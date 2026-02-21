export default function ShippingPolicy() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20 font-light text-stone-600 leading-relaxed">
      <h1 className="font-serif text-4xl text-stone-900 mb-10 text-center uppercase tracking-tighter">Shipping Policy</h1>
      <section className="space-y-6">
        <p>At<span className="font-bold text-gold font-serif"> Jewels for Joy</span>, we ensure your handcrafted pieces reach you with the utmost care.</p>
        <h3 className="text-stone-900 font-bold uppercase text-xs tracking-widest">Delivery Timeline</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Lahore:</strong> 1-2 business days.</li>
          <li><strong>Other Cities:</strong> 3-5 business days.</li>
        </ul>
        <h3 className="text-stone-900 font-bold uppercase text-xs tracking-widest">Charges</h3>
        <p>Standard nationwide shipping is PKR 250. We offer <strong>Complimentary Shipping</strong> on all orders above PKR 5,000.</p>
      </section>
    </div>
  );
}