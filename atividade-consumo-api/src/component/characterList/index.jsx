"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./characterList.module.css";


const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://hp-api.onrender.com/api/characters");
        setCharacters(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar personagens:", error);
        setError("Não foi possível carregar os personagens. Tente novamente mais tarde!");
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);


  const filteredCharacters = characters.filter(character => {
    const searchLower = searchTerm.toLowerCase();
    return (
      character.name.toLowerCase().includes(searchLower) ||
      (character.house && character.house.toLowerCase().includes(searchLower))
    );
  });

  if (loading) {
    return <div className={styles.loading}>Carregando personagens...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Personagens de Harry Potter</h1>
      
     
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar por nome ou casa..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles.filmGrid}>
        {filteredCharacters.slice(0, 24).map((character) => (
          <div key={character.id} className={styles.filmCard}>
              <div className={styles.content}>
            <div className={styles.imageContainer}>
              <img 
                src={character.image || "/default-wizard.png"} 
                alt={character.name}
                className={styles.image}
                onError={(e) => {
                  e.target.src = "/default-wizard.png";
                }}
              />
            </div>
              <h2 className={styles.filmTitle}>{character.name}</h2>
              <p className={styles.director}>
                <strong>Casa:</strong> {character.house || "Desconhecida"}
              </p>
              <p className={styles.year}>
                <strong>Ator:</strong> {character.actor}
              </p>
              <p>
                <strong>Ancestral:</strong> {character.ancestry || "Desconhecida"}
              </p>
              <div className={styles.rating}>
                <span className={styles.score}>{character.patronus || "Nenhum"}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CharacterList;