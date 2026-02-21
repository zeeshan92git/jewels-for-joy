export default function FAQ() {

  const faqs = [
    { q: "What is your delivery time?", a: "We typically deliver within 3-5 business days across Pakistan." },
    { q: "Do you offer Cash on Delivery?", a: "Yes, we offer COD services nationwide for your convenience." },
    { q: "Is your jewellery skin-friendly?", a: "Our artificial jewellery is crafted with high-quality alloys and is lead/nickel free to minimize skin irritation." }
  ];

  return (

    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-serif text-4xl text-center mb-16 uppercase tracking-tighter">Frequently Asked Questions</h1>
      <div className="space-y-12">
        {faqs.map((faq, i) => (
          <div key={i} className="border-l-2 border-gold pl-6">
            <h3 className="text-lg font-medium mb-3 text-stone-900">{faq.q}</h3>
            <p className="text-stone-500 font-light leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>

  );
}