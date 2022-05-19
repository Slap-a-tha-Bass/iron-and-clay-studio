import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export async function getStaticProps() {
  const client = new ApolloClient({
    uri: "https://api-us-east-1.graphcms.com/v2/cl3d3o63u1nnr01xn22c8e04h/master",
    cache: new InMemoryCache(),
  });
  const data = await client.query({
    query: gql`
      query PageHome {
        page(where: { slug: "home" }) {
          id
          heroLink
          heroText
          heroTitle
          name
          slug
          heroBackground {
            height
            url
            width
          }
        }
        products(first: 4) {
          name
          price
          slug
          image {
            width
            url
            height
          }
        }
      }
    `,
  });

  const home = data.data.page;
  const products = data.data.products;

  return {
    props: {
      home,
      products,
    },
  };
}

export default function Home({ home, products }) {
  const { heroLink, heroText, heroTitle, heroBackground } = home;
  console.log("products", products);
  return (
    <div className={styles.container}>
      <Head>
        <title>Iron &amp; Clay Studio</title>
        <meta
          name="description"
          content="Handmade Pottery in Birmingham, AL | By Ashley Gooler"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Image
          src={heroBackground.url}
          height={heroBackground.height}
          width={heroBackground.width}
        />
        <h1 className={styles.title}>{heroTitle}</h1>

        <p className={styles.description}>{heroText}</p>

        <div>
          {products.map((product) => (
            <div className={styles.productContainer} key={product.slug}>
              <a href={`/products/${product.slug}`}>
                <Image
                  className={styles.productImage}
                  src={product.image.url}
                  height={product.image.height / 2}
                  width={product.image.width /2}
                />
                <h3>{product.name}</h3>
                <p>${product.price}</p>
              </a>
            </div>
          ))}
        </div>

        {/* <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}
      </main>

      <footer className={styles.footer}>
        <p>Copyright © 2022</p>
      </footer>
    </div>
  );
}
