import Link from "next/link";

export default function Home() {
  return (
    <main className="page-shell">
      <section className="home-panel">
        <div className="page-heading">
          <p className="eyebrow">Lab 13.1</p>
          <h1>Next.js Microservice App</h1>
          <p>
            Хэрэглэгч болон бүтээгдэхүүний MongoDB сервисийг Next.js API
            route-оор үүсгэсэн лабораторийн ажил.
          </p>
        </div>

        <nav className="home-actions" aria-label="Лабораторийн хуудсууд">
          <Link href="/user">Хэрэглэгч нэмэх</Link>
          <Link href="/product">Бүтээгдэхүүн нэмэх</Link>
        </nav>
      </section>
    </main>
  );
}
