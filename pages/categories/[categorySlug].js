import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import styles from "../../styles/Home.module.css";
import Head from "next/head";
import Image from "next/image";

export async function getStaticProps({ params }) {
  const client = new ApolloClient({
    uri: "https://api-us-east-1.graphcms.com/v2/cl3d3o63u1nnr01xn22c8e04h/master",
    cache: new InMemoryCache(),
  });
  const data = await client.query({
    query: gql`
      query PageCategory($slug: String = "") {
        category(where: { slug: $slug }) {
          id
          name
          slug
          products {
            id
            image
            name
            price
            slug
          }
        }
      }
    `,
    variables: {
      slug: params.categorySlug,
    },
  });
  const category = data.data.category;
  return {
    props: {
      category,
      products: category.products,
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
      query PageCategories {
        categories {
          id
          slug
        }
      }
    `,
  });
  const paths = data.data.categories.map((category) => {
    return {
      params: {
        categorySlug: category.slug,
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

export default function Category({ category, products }) {
  return (
    <div className={styles.main}>
      <Head>
        <title>{category.name} | Iron & Clay Studio | Ashley Gooler</title>
        <meta
          name="description"
          content={`Find ${category.name} at Iron & Clay Studio by Ashley Gooler`}
        />
      </Head>
      <h1>{category.name}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          maxWidth: "80%",
        }}
      >
        {products.map((product) => {
          return (
            <div key={product.id} style={{ margin: "1rem" }}>
              <h2>{product.name}</h2>
              <p>${product.price}</p>
              <Image
                className={styles.productImage}
                src={product.image.url}
                alt={`${product.name} by Ashley Gooler | Iron & Clay Studio`}
                height={product.image.height > 450 ? 450 : product.image.height}
                width={product.image.width > 350 ? 350 : product.image.width}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
