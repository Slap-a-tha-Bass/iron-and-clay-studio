import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import mobileSetter from "../hooks/mobileSetter";

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
          heroBackground
        }
        products(where: { categories_some: { slug: "featured" } }) {
          id
          name
          price
          image
          slug
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
  const { isMobile } = mobileSetter();

  return (
    <div className={styles.container}>
      <Head>
        <title>Iron &amp; Clay Studio by Ashley Gooler</title>
        <meta
          name="description"
          content="Handmade Pottery in Birmingham, AL | Iron & Clay Studio by Ashley Gooler"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="apple-touch-icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="icon" href="/favicon/favicon.ico" />
        <link rel="manifest" href="/favicon/site.webmanifest" />
      </Head>
      <main className={styles.main}>
        {isMobile ? (
          <Image
            src={heroBackground.url}
            height={300}
            width={300}
            alt=""
            priority
          />
        ) : (
          <Image
            src={heroBackground.url}
            height={heroBackground.height}
            width={heroBackground.width}
            alt=""
            priority
          />
        )}
        <h1 className={styles.title}>{heroTitle}</h1>

        <p className={styles.description}>{heroText}</p>

        <div className={styles.grid}>
          {products.map((product) => (
            <div className={styles.card} key={product.slug}>
              <a href={`/products/${product.slug}`}>
                <Image
                  className={styles.productImage}
                  src={product.image.url}
                  height={
                    product.image.height > 450 ? 450 : product.image.height
                  }
                  width={product.image.width > 350 ? 350 : product.image.width}
                  alt={product.name}
                />
                <h2>{product.name}</h2>
                <p>${product.price}</p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    paddingTop: "1rem",
                  }}
                >
                  <button
                    className={`snipcart-add-item`}
                    data-item-id={product.id}
                    data-item-price={product.price}
                    data-item-url={`/products/${product.slug}`}
                    data-item-image={product.image.url}
                    data-item-name={product.name}
                  >
                    Add to cart
                  </button>
                </div>
              </a>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Copyright © 2022</p>
      </footer>
    </div>
  );
}
