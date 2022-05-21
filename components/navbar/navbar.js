import { useReducer } from 'react';
import styles from "./navbar.module.css";
import Image from "next/image";
import { RiShoppingCart2Line } from "react-icons/ri";
import Link from "next/link";
import mobileSetter from "../../hooks/mobileSetter";

export default function NavBar() {
  const { isMobile } = mobileSetter();
  const [on, toggle] = useReducer((s) => !s, false);

  return (
    <nav className={styles.navContainer}>
      <div className={styles.imageContainer}>
        <Image
          src="https://res.cloudinary.com/slapathabass/image/upload/v1653103032/iron%20and%20clay/iron-clay-color-bg-blend-green-bold_xyz5fa.png"
          layout="fill"
          objectFit="contain"
        />
      </div>
      {isMobile ? (
        <button onClick={() => toggle(on)}>
            <ul>
                <li>Home</li>
                <li>About Me</li>
                <li>Products</li>
                <li><RiShoppingCart2Line /></li>
            </ul>
        </button>
      ) : (
        <div className={styles.linkContainer}>
          <div className={styles.navLinks}>
            <Link href="/">Home</Link>
          </div>
          <div className={styles.navLinks}>
            <Link href="/about">About Me</Link>
          </div>
          <div className={styles.navLinks}>
            <Link href="/products">Products</Link>
          </div>
          <Link href="/">
            <div className={styles.cartContainer}>
              <RiShoppingCart2Line />
            </div>
          </Link>
        </div>
      )}
    </nav>
  );
}
