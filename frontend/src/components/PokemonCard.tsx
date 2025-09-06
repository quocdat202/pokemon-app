import React from "react";
import { Pokemon } from "../services/api";

interface PokemonCardProps {
  pokemon: Pokemon;
  onFavorite?: (pokemonId: number) => void;
  isFavorite?: boolean;
  isAuthenticated?: boolean;
}

const PokemonCard: React.FC<PokemonCardProps> = ({
  pokemon,
  onFavorite,
  isFavorite = false,
  isAuthenticated = false,
}) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        margin: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ margin: "0 0 8px 0", color: "#333" }}>{pokemon.name}</h3>
      <div style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}>
        <p>
          <strong>Loại:</strong> {pokemon.type}
        </p>
        <p>
          <strong>Chiều cao:</strong> {pokemon.height}m
        </p>
        <p>
          <strong>Cân nặng:</strong> {pokemon.weight}kg
        </p>
        <p>
          <strong>Khả năng:</strong> {pokemon.abilities}
        </p>
      </div>

      {isAuthenticated && onFavorite && (
        <button
          onClick={() => onFavorite(pokemon.id)}
          style={{
            padding: "8px 16px",
            backgroundColor: isFavorite ? "#ff6b6b" : "#4ecdc4",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "12px",
          }}
        >
          {isFavorite ? "❤️ Bỏ yêu thích" : "🧡 Yêu thích"}
        </button>
      )}
    </div>
  );
};

export default PokemonCard;
