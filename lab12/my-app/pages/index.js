import { useEffect, useState } from 'react';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  useEffect(() => {
    fetch('http://localhost:4000/api/products')
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <h1>Express.js болон JSON жишээ</h1>
      <section>
        <h2>Хэрэглэгчдийн жагсаалт</h2>
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name} - {user.email}</li>
          ))}
        </ul>
      </section>
      <section>
        <h2>Барааны жагсаалт</h2>
        <ul>
          {products.map(product => (
            <li key={product.id}>{product.name} - {product.price}₮</li>
          ))}
        </ul>
      </section>
    </div>
  );
}