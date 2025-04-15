
import CharacterList from "../component/characterList";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <CharacterList />
      </main>

      <footer className={styles.footer}>
        <p>Desenvolvido durante o curso de Desenvolvimento de Sistemas</p>
        <div className={styles.footerSignature}>
          <span className={styles.hogwartsText}>Hogwarts School of Witchcraft and Wizardry</span>
          <span className={styles.magicSeparator}>✨</span>
          <span className={styles.yearText}>Ano Escolar 2023-2024</span>
        </div>
      </footer>
    </div>
  );
}