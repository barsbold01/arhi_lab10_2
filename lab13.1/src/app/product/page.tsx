"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

type SavedProduct = {
  id?: string;
  _id?: string;
  name: string;
  price: number;
};

export default function ProductPage() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [products, setProducts] = useState<SavedProduct[]>([]);

  const loadProducts = async () => {
    const response = await fetch("/api/product");

    if (response.ok) {
      const data = (await response.json()) as SavedProduct[];
      setProducts(data);
    }
  };

  useEffect(() => {
    let isMounted = true;

    fetch("/api/product")
      .then(async (response) => {
        if (!response.ok) {
          return [];
        }

        return (await response.json()) as SavedProduct[];
      })
      .then((data) => {
        if (isMounted) {
          setProducts(data);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    const response = await fetch("/api/product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, price: Number(price) }),
    });

    if (response.ok) {
      setName("");
      setPrice("");
      setMessage("Бүтээгдэхүүн амжилттай нэмэгдлээ!");
      await loadProducts();
    } else {
      const data = (await response.json().catch(() => null)) as {
        message?: string;
      } | null;
      setMessage(data?.message ?? "Алдаа гарлаа.");
    }

    setIsSubmitting(false);
  };

  return (
    <main className="page-shell">
      <section className="form-panel">
        <div className="page-heading">
          <Link href="/" className="back-link">
            Нүүр
          </Link>
          <h1>Бүтээгдэхүүн нэмэх</h1>
        </div>

        <form onSubmit={handleSubmit} className="entry-form">
          <label>
            <span>Нэр</span>
            <input
              type="text"
              placeholder="Нэр"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>

          <label>
            <span>Үнэ</span>
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              required
            />
          </label>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Нэмж байна..." : "Нэмэх"}
          </button>
        </form>

        {message && <p className="form-message">{message}</p>}

        <div className="list-section">
          <h2>Нэмсэн бүтээгдэхүүнүүд</h2>
          {products.length > 0 ? (
            <ul className="data-list">
              {products.map((product) => (
                <li key={product.id ?? product._id ?? product.name}>
                  <strong>{product.name}</strong>
                  <span>{product.price.toLocaleString()} ₮</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-text">Одоогоор бүтээгдэхүүн нэмээгүй байна.</p>
          )}
        </div>
      </section>
    </main>
  );
}
