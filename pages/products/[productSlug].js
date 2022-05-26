import styles from "../../styles/Home.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Image from "next/image";
import Head from "next/head";

export async function getStaticProps({ params }) {
  const client = new ApolloClient({
    uri: "https://api-us-east-1.graphcms.com/v2/cl3d3o63u1nnr01xn22c8e04h/master",
    cache: new InMemoryCache(),
  });
  const data = await client.query({
    query: gql`
      query PageProduct($slug: String) {
        product(where: { slug: $slug }) {
          id
          image
          name
          price
          description {
            html
          }
          slug
        }
      }
    `,
    variables: {
      slug: params.productSlug,
    },
  });
  const product = data.data.product;
  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths() {
  const client = new ApolloClient({
    uri: "https://api-us-east-1.graphcms.com/v2/cl3d3o63u1nnr01xn22c8e04h/master",
    cache: new InMemoryCache(),
  });
  const data = await client.query({
    query: gql`
      query PageProducts {
        products {
          name
          price
          slug
          image
        }
      }
    `,
  });
  const paths = data.data.products.map((product) => {
    return {
      params: {
        productSlug: product.slug,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
}

export default function ProductSlug({ product }) {
  return (
    <div className={styles.main}>
      <Head>
        <title>{product.name} | Iron & Clay Studio by Ashley Gooler</title>
        <meta
          name="description"
          content={`Find ${product.name} at Iron & Clay Studio by Ashley Gooler`}
        />
      </Head>
      <Image
        className={styles.productImage}
        src={product.image.url}
        height={product.image.height > 450 ? 450 : product.image.height}
        width={product.image.width > 350 ? 350 : product.image.width}
        alt={`${product.name} by Ashley Gooler | Iron & Clay Studio`}
      />
      <h1>{product.name}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: product.description?.html,
        }}
      />
      <p>${product.price}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingTop: "1rem",
        }}
      >
        <button
          className={`snipcart-add-item ${styles.cartButton}`}
          data-item-id={product.id}
          data-item-price={product.price}
          data-item-url={`/products/${product.slug}`}
          data-item-image={product.image.url}
          data-item-name={product.name}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
