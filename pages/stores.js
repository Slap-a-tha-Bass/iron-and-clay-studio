import styles from "../styles/Home.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Head from "next/head";

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
      <Head>
        <title>Stores</title>
        <meta
          name="description"
          content="Iron & Clay Studio | Birmingham, AL"
        />
      </Head>
      {storeLocations.map((store) => {
        return (
          <div key={store.id}>
            <h1 className={styles.title}>{store.name}</h1>
            <h2 className={styles.title}>{store.address}</h2>
            <div style={{ padding: "1rem" }} />
            <h3 className={styles.title}>
              <a href={`+1${store.phoneNumber}`}>{store.phoneNumber}</a>
            </h3>
            <div style={{ padding: "1rem" }} />
            <h3 className={styles.title}>
              <a
                href={`https://www.google.com/maps/dir//${store.location.latitude}, ${store.location.longitude}/@${store.location.latitude}, ${store.location.longitude},15z/`}
                target="_blank"
                rel="noreferrer"
              >
                Get Directions
              </a>
            </h3>
          </div>
        );
      })}
    </div>
  );
}
