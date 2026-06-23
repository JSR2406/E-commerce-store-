import { useEffect, useState } from "react";
import http from "../api/http";
import SectionHeading from "../components/SectionHeading";
import StatTile from "../components/StatTile";

export default function AdminDashboardPage() {
  const [summary, setSummary] = useState({ total: 0, featured: 0, categories: 0 });

  useEffect(() => {
    http.get("/products?limit=50").then(({ data }) => {
      const uniqueCategories = new Set(data.items.map((item) => item.category));
      setSummary({
        total: data.total,
        featured: data.items.filter((item) => item.isFeatured).length,
        categories: uniqueCategories.size,
      });
    });
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <SectionHeading
        eyebrow="Admin"
        title="Operational overview."
        description="A lightweight dashboard for the admin role with product counts and category coverage."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <StatTile label="Products" value={summary.total} hint="Catalog size" />
        <StatTile label="Featured" value={summary.featured} hint="Highlighted items" />
        <StatTile label="Categories" value={summary.categories} hint="Catalog breadth" />
      </div>
    </div>
  );
}

