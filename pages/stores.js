import styles from "../styles/Home.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://api-us-east-1.graphcms.com/v2/cl3d3o63u1nnr01xn22c8e04h/master",
    cache: new InMemoryCache(),
  });
  const data = await client.query({
    query: gql`
      query PageStores {
        storeLocations {
          id
          address
          name
          phoneNumber
          location {
            latitude
            longitude
          }
        }
      }
    `,
  });

  const storeLocations = data.data.storeLocations;

  return {
    props: {
      storeLocations,
    },
  };
}

export default function Stores({ storeLocations }) {
  return (
    <div className={styles.main}>
      {storeLocations.map((store) => {
        return (
          <div key={store.id}>
            <h1>{store.name}</h1>
            <h2>{store.address}</h2>
            <h3>{store.phoneNumber}</h3>
            <button>View on Map</button>
            <a href={`https://www.google.com/maps/dir//${store.location.latitude}, ${store.location.longitude}/@${store.location.latitude}, ${store.location.longitude},15z/`} target="_blank">
                Get Directions
            </a>
          </div>
        );
      })}
    </div>
  );
}
