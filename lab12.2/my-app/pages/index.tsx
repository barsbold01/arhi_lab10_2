import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';

type User = {
  id: string;
  name: string;
  email: string;
};

type GetUsersData = {
  getUsers: User[];
};

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      email
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery<GetUsersData>(GET_USERS);

  if (loading) {
    return <p className="message">Унших...</p>;
  }

  if (error) {
    return <p className="message">Алдаа гарлаа: {error.message}</p>;
  }

  return (
    <main className="page">
      <h1 className="title">Хэрэглэгчдийн жагсаалт</h1>
      <ul className="user-list">
        {data?.getUsers.map((user) => (
          <li className="user-card" key={user.id}>
            <span className="user-name">{user.name}</span>{' '}
            <span className="user-email">({user.email})</span>
          </li>
        ))}
      </ul>
    </main>
  );
}
