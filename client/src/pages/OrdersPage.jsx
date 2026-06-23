import { mockOrders } from "../mockData/orders";
import SectionHeading from "../components/SectionHeading";

export default function OrdersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Orders"
        title="Simulated order history."
        description="This page mirrors the lesson brief with frontend-only mock order data."
      />

      <div className="space-y-4">
        {mockOrders.map((order) => (
          <section key={order._id} className="soft-panel rounded-[2rem] p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-sand-300/70">{order._id}</p>
                <h3 className="mt-2 text-xl font-semibold text-sand-50">{order.status}</h3>
                <p className="mt-1 text-sm text-sand-300/70">
                  {new Date(order.orderDate).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <p className="text-2xl font-semibold text-sand-50">${order.totalAmount.toFixed(2)}</p>
            </div>

            <div className="mt-5 grid gap-3">
              {order.items.map((item) => (
                <div key={item.productId} className="flex items-center justify-between border-t border-white/8 pt-3 text-sm">
                  <span className="text-sand-50">
                    {item.name} x {item.quantity}
                  </span>
                  <span className="text-sand-300/70">${item.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

