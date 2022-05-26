import { useReducer } from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import { RiShoppingCart2Line, RiMenu4Line } from "react-icons/ri";
import Link from "next/link";
import mobileSetter from "../../hooks/mobileSetter";
import { useSnipcart } from "use-snipcart";

export default function NavBar() {
  const { isMobile } = mobileSetter();
  const [on, toggle] = useReducer((s) => !s, false);
  const { cart = {} } = useSnipcart();

  return (
    <nav className={styles.navContainer}>
      <div className={styles.imageContainer}>
        <Link href="/" forwardRef>
          <div className={styles.image}>
            <Image
              src="https://res.cloudinary.com/slapathabass/image/upload/v1653103032/iron%20and%20clay/iron-clay-color-bg-blend-green-bold_xyz5fa.png"
              layout="fill"
              objectFit="contain"
              alt="logo"
              priority
            />
          </div>
        </Link>
      </div>
      {isMobile ? (
        <button
          aria-label="Menu button"
          className={styles.menuButton}
          onClick={() => toggle(on)}
        >
          {on && (
            <ul className={styles.ulContainer}>
              <li className={styles.liGroups}>
                <Link href="/">Home</Link>
              </li>
              <li className={styles.liGroups}>
                <Link href="/about">About Me</Link>
              </li>
              <li className={styles.liGroups}>
                <Link href="/categories/bowls">Bowls</Link>
              </li>
              <li className={styles.liGroups}>
                <Link href="/categories/mugs">Mugs</Link>
              </li>
              <li className={styles.liGroups}>
                <Link href="/categories/plates">Plates</Link>
              </li>
              <li className={styles.liGroups}>
                <p className={`snipcart-checkout ${styles.cartContainer}`}>
                  <RiShoppingCart2Line />
                  <span>${cart.subtotal?.toFixed(2)}</span>
                </p>
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
            <Link href="/categories/bowls">Bowls</Link>
          </div>
          <div className={styles.navLinks}>
            <Link href="/categories/mugs">Mugs</Link>
          </div>
          <div className={styles.navLinks}>
            <Link href="/categories/plates">Plates</Link>
          </div>
          <button
            aria-label="Cart button"
            className={`snipcart-checkout ${styles.cartContainer}`}
          >
            <RiShoppingCart2Line />
            <span>${cart.subtotal?.toFixed(2)}</span>
          </button>
        </div>
      )}
    </nav>
  );
}
