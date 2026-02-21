"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { Eye, CheckCircle, Clock, Smartphone, MapPin, Loader2, XCircle, Truck, ExternalLink } from 'lucide-react';

export default function OrderTableBody({ initialOrders, view }) {
  const router = useRouter();
  const [loadingId, setLoadingId] = useState(null);

  const updateStatus = async (orderId, newStatus) => {
    setLoadingId(`${orderId}-${newStatus}`);
    try {
      const res = await fetch(`/api/orders/verify`, { 
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status: newStatus }) 
      });

      if (res.ok) {
        toast.success(`Order ${newStatus}`);
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.error || "Update failed");
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setLoadingId(null);
    }
  };

  if (view === "mobile") {
    return (
      <div className="divide-y divide-stone-100">
        {initialOrders.map((order) => (
          <div key={order._id} className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono font-bold text-stone-400 bg-stone-100 px-2 py-1 rounded-md">
                  #{order._id.slice(-6).toUpperCase()}
                </span>
                <p className="text-[10px] text-stone-400 mt-1 uppercase tracking-tighter">
                  {new Date(order.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                </p>
              </div>
              <StatusBadge status={order.status} />
            </div>

            <div>
              <p className="font-serif text-stone-900">{order.shippingAddress?.fullName}</p>
              <div className="flex items-center gap-2 text-stone-500 text-xs mt-1">
                <Smartphone size={12} className="text-stone-300" />
                <span>{order.shippingAddress?.phone}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-stone-50">
              <div className="text-sm font-bold text-stone-900">
                Rs. {order.totalAmount?.toLocaleString()}
              </div>
              <div className="flex gap-2">
                <Link href={`/admin/orders/${order._id}`} className="p-2 bg-stone-50 text-stone-400 rounded-full border border-stone-100">
                  <Eye size={16} />
                </Link>
                <ActionButtons order={order} loadingId={loadingId} updateStatus={updateStatus} />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // DESKTOP TABLE BODY
  return (
    <tbody className="divide-y divide-stone-50">
      {initialOrders.map((order) => (
        <tr key={order._id} className="hover:bg-stone-50/30 transition-all group">
          <td className="px-8 py-6">
            <div className="flex flex-col">
              <span className="font-mono text-[11px] font-bold text-stone-500 bg-stone-100 px-2 py-0.5 rounded w-fit">
                #{order._id.slice(-6).toUpperCase()}
              </span>
              <span className="text-[10px] text-stone-400 mt-2 uppercase">{new Date(order.createdAt).toLocaleDateString('en-GB')}</span>
            </div>
          </td>

          <td className="px-6 py-6">
            <div className="max-w-50">
              <p className="text-sm font-bold text-stone-800 truncate">{order.shippingAddress?.fullName}</p>
              <p className="flex items-center gap-1.5 text-[11px] text-stone-400 mt-1">
                <MapPin size={10} /> <span className="truncate">{order.shippingAddress?.city}</span>
              </p>
            </div>
          </td>

          <td className="px-6 py-6">
            <div className="flex flex-col gap-1">
              <span className="text-sm text-stone-900 font-bold">Rs. {order.totalAmount?.toLocaleString()}</span>
              <div className="flex items-center gap-2">
                <span className={`text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-widest border ${order.paymentMethod === 'Advance' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-stone-100 text-stone-500 border-stone-200'}`}>
                  {order.paymentMethod}
                </span>
                {order.paymentScreenshot && (
                  <a href={order.paymentScreenshot} target="_blank" className="text-gold hover:text-stone-900 transition-colors">
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </td>

          <td className="px-6 py-6">
            <div className="flex justify-center">
              <StatusBadge status={order.status} />
            </div>
          </td>

          <td className="px-8 py-6 text-right">
            <div className="flex justify-end items-center gap-3">
              <ActionButtons order={order} loadingId={loadingId} updateStatus={updateStatus} />
              <Link href={`/admin/orders/${order._id}`} title="View Order Details">
                <div className="p-2 text-stone-400 hover:text-stone-900 bg-stone-50 rounded-full border border-stone-100 transition-all">
                  <Eye size={18} strokeWidth={1.5} />
                </div>
              </Link>
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

// Sub-components for cleaner logic
function StatusBadge({ status }) {
  const styles = {
    Verified: 'bg-blue-50 text-blue-600 border-blue-100',
    Delivered: 'bg-green-50 text-green-600 border-green-100',
    Cancelled: 'bg-red-50 text-red-600 border-red-100',
    Pending: 'bg-amber-50 text-amber-600 border-amber-100'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest border ${styles[status] || styles.Pending}`}>
      <span className={`h-1 w-1 rounded-full animate-pulse ${status === 'Pending' ? 'bg-amber-600' : 'hidden'}`} />
      {status === 'Delivered' ? 'Completed' : status}
    </span>
  );
}

function ActionButtons({ order, loadingId, updateStatus }) {
  return (
    <div className="flex items-center gap-2">
      {order.status === 'Pending' && (
        <>
          <button
            onClick={() => updateStatus(order._id, 'Verified')}
            disabled={!!loadingId}
            className="bg-stone-900 text-white text-[9px] px-4 py-2 rounded-full uppercase tracking-widest hover:bg-gold transition-all font-bold disabled:opacity-50"
          >
            {loadingId === `${order._id}-Verified` ? <Loader2 size={12} className="animate-spin" /> : 'Verify'}
          </button>
          <button
            onClick={() => updateStatus(order._id, 'Cancelled')}
            disabled={!!loadingId}
            className="p-2 text-red-400 hover:text-red-600 bg-red-50 rounded-full transition-all"
          >
            {loadingId === `${order._id}-Cancelled` ? <Loader2 size={12} className="animate-spin" /> : <XCircle size={16} />}
          </button>
        </>
      )}

      {order.status === 'Verified' && (
        <button
          onClick={() => updateStatus(order._id, 'Delivered')}
          disabled={!!loadingId}
          className="bg-green-600 text-white text-[9px] px-4 py-2 rounded-full uppercase tracking-widest hover:bg-green-700 transition-all font-bold flex items-center gap-2"
        >
          {loadingId === `${order._id}-Delivered` ? <Loader2 size={12} className="animate-spin" /> : <><Truck size={12}/> Dispatch</>}
        </button>
      )}
    </div>
  );
}