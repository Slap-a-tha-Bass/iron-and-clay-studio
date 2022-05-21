import styles from "./navbar.module.css";
import Image from "next/image";

export default function NavBar() {
  return (
    <nav className={styles.navContainer}>
      <Image
        src="https://res.cloudinary.com/slapathabass/image/upload/v1653103032/iron%20and%20clay/iron-clay-color-bg-blend-green-bold_xyz5fa.png"
        height={120}
        width={220}
      />
      <p>Cart</p>
    </nav>
  );
}
