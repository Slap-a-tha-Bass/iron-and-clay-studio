import styles from "../../styles/Home.module.css";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Image from "next/image";
import Head from "next/head";
import { buildImage } from "../../lib/cloudinary";

export async function getStaticProps({ params, locale }) {
  const client = new ApolloClient({
    uri: "https://api-us-east-1.graphcms.com/v2/cl3d3o63u1nnr01xn22c8e04h/master",
    cache: new InMemoryCache(),
  });
  const data = await client.query({
    query: gql`
      query PageProduct($slug: String, $locale: Locale!) {
        product(where: { slug: $slug }) {
          id
          image
          name
          price
          description {
            html
          }
          slug
          localizations(locales: [$locale]) {
            description {
              html
            }
            locale
          }
        }
      }
    `,
    variables: {
      slug: params.productSlug,
      locale
    },
  });
  let product = data.data.product;

  if (product.localizations.length > 0) {
    product = {
      ...product,
      ...product.localizations[0]
    }
  }
  return {
    props: {
      product,
    },
  };
}

export async function getStaticPaths({ locales }) {
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
    paths: [
      ...paths,
      ...paths.flatMap((path) => {
        return locales.map((locale) => {
          return {
            ...path,
            locale,
          };
        });
      }),
    ],
    fallback: false,
  };
}

export default function ProductSlug({ product }) {
  return (
    <div className={styles.main}>
      <Head>
        <title>{product.name} | Iron & Clay Studio | Ashley Gooler</title>
        <meta
          name="description"
          content={`Find ${product.name} at Iron & Clay Studio by Ashley Gooler`}
        />
      </Head>
      <Image
        className={styles.productImage}
        src={buildImage(product.image.public_id).toURL()}
        height="900"
        width="900"
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
          className={`snipcart-add-item ${styles.largeCardButton}`}
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
