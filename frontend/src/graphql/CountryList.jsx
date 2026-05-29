import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      code
      name
      emoji
    }
  }
`;

function CountryList() {
  const { loading, error, data } = useQuery(GET_COUNTRIES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ul>
      {data.countries.map(({ code, name, emoji }) => (
        <li key={code}>
          {emoji} {name}
        </li>
      ))}
    </ul>
  );
}

export default CountryList;