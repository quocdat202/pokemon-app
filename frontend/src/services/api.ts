import axios from "axios";

// Cấu hình base URL cho API backend
const API_BASE_URL = "http://localhost:3000";

// Tạo axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interface cho Pokemon data
export interface Pokemon {
  id: number;
  name: string;
  type: string;
  height: number;
  weight: number;
  abilities: string;
}

// Interface cho User data
export interface User {
  id: number;
  username: string;
  email: string;
}

// Interface cho Auth response
export interface AuthResponse {
  access_token: string;
  user: User;
}

// API Service class
class ApiService {
  // Auth APIs
  async login(username: string, password: string): Promise<AuthResponse> {
    const response = await apiClient.post("/auth/login", {
      username,
      password,
    });
    return response.data;
  }

  async register(
    username: string,
    email: string,
    password: string
  ): Promise<User> {
    const response = await apiClient.post("/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  }

  // Pokemon APIs
  async getAllPokemon(): Promise<Pokemon[]> {
    const response = await apiClient.get("/pokemon");
    return response.data;
  }

  async getPokemonById(id: number): Promise<Pokemon> {
    const response = await apiClient.get(`/pokemon/${id}`);
    return response.data;
  }

  async searchPokemon(name: string): Promise<Pokemon[]> {
    const response = await apiClient.get(`/pokemon/search?name=${name}`);
    return response.data;
  }

  // User APIs
  async getAllUsers(): Promise<User[]> {
    const response = await apiClient.get("/users");
    return response.data;
  }

  async getUserById(id: number): Promise<User> {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  }

  // Favorites APIs (cần token)
  async getFavorites(token: string): Promise<Pokemon[]> {
    const response = await apiClient.get("/favorites", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }

  async addFavorite(pokemonId: number, token: string): Promise<void> {
    await apiClient.post(
      "/favorites",
      { pokemonId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  async removeFavorite(pokemonId: number, token: string): Promise<void> {
    await apiClient.delete(`/favorites/${pokemonId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

// Export instance
export const apiService = new ApiService();

// Export axios instance để có thể sử dụng trực tiếp nếu cần
export { apiClient };
