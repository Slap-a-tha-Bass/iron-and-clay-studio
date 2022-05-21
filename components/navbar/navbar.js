import { useReducer } from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import { RiShoppingCart2Line, RiMenu4Line } from "react-icons/ri";
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
          alt="logo"
          priority
        />
      </div>
      {isMobile ? (
        <button className={styles.menuButton} onClick={() => toggle(on)}>
          {on && (
            <ul className={styles.ulContainer}>
              <li className={styles.liGroups}>
                <Link href="/">Home</Link>
              </li>
              <li className={styles.liGroups}>
                <Link href="/about">About Me</Link>
              </li>
              <li className={styles.liGroups}>
                <Link href="/products">Products</Link>
              </li>
              <li className={styles.liGroups}>
                <Link href="/">
                  <div>
                    <RiShoppingCart2Line />
                  </div>
                </Link>
              </li>
            </ul>
          )}
          {!on && (
            <span className={styles.buttonSpan}>
              <RiMenu4Line />
            </span>
          )}
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
