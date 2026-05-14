import { useEffect, useState } from "react";

type User = {
  _id: string;
  name: string;
};

type Product = {
  _id: string;
  name: string;
};

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const [usersResponse, productsResponse] = await Promise.all([
          fetch("/api/users"),
          fetch("/api/products")
        ]);

        if (!usersResponse.ok || !productsResponse.ok) {
          throw new Error("API response was not successful");
        }

        setUsers(await usersResponse.json());
        setProducts(await productsResponse.json());
      } catch (err) {
        setError("Services холбогдоход алдаа гарлаа.");
      }
    }

    loadData();
  }, []);

  return (
    <main className="page">
      <section className="panel">
        <div>
          <p className="eyebrow">Docker microservices</p>
          <h1>Next.js + Express + MongoDB</h1>
          <p className="description">
            NGINX нь frontend болон API service-үүдийг нэг хаягаар дамжуулж байна.
          </p>
        </div>

        {error ? <p className="error">{error}</p> : null}

        <div className="grid">
          <article className="card">
            <h2>Users</h2>
            <ul>
              {users.map((user) => (
                <li key={user._id}>{user.name}</li>
              ))}
            </ul>
            {!users.length && !error ? <p className="empty">Хоосон байна</p> : null}
          </article>

          <article className="card">
            <h2>Products</h2>
            <ul>
              {products.map((product) => (
                <li key={product._id}>{product.name}</li>
              ))}
            </ul>
            {!products.length && !error ? <p className="empty">Хоосон байна</p> : null}
          </article>
        </div>
      </section>
    </main>
  );
}

