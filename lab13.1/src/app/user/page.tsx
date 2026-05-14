"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";

type SavedUser = {
  id?: string;
  _id?: string;
  name: string;
  email: string;
};

export default function UserPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [users, setUsers] = useState<SavedUser[]>([]);

  const loadUsers = async () => {
    const response = await fetch("/api/user");

    if (response.ok) {
      const data = (await response.json()) as SavedUser[];
      setUsers(data);
    }
  };

  useEffect(() => {
    let isMounted = true;

    fetch("/api/user")
      .then(async (response) => {
        if (!response.ok) {
          return [];
        }

        return (await response.json()) as SavedUser[];
      })
      .then((data) => {
        if (isMounted) {
          setUsers(data);
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

    const response = await fetch("/api/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      setName("");
      setEmail("");
      setPassword("");
      setMessage("Хэрэглэгч амжилттай нэмэгдлээ!");
      await loadUsers();
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
          <h1>Хэрэглэгч нэмэх</h1>
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
            <span>И-мэйл</span>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            <span>Нууц үг</span>
            <input
              type="password"
              placeholder="Нууц үг"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Нэмж байна..." : "Нэмэх"}
          </button>
        </form>

        {message && <p className="form-message">{message}</p>}

        <div className="list-section">
          <h2>Нэмсэн хэрэглэгчид</h2>
          {users.length > 0 ? (
            <ul className="data-list">
              {users.map((user) => (
                <li key={user.id ?? user._id ?? user.email}>
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="empty-text">Одоогоор хэрэглэгч нэмээгүй байна.</p>
          )}
        </div>
      </section>
    </main>
  );
}
