import { useState, useEffect, useCallback } from "react";
import { apiService, Pokemon, User, AuthResponse } from "../services/api";

// Hook để lấy danh sách Pokemon
export const usePokemon = () => {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const data = await apiService.getAllPokemon();
        console.log("🤔🤔🤔 ~ fetchPokemon ~ data:", data);
        setPokemon(data);
        setError(null);
      } catch (err) {
        setError("Không thể tải danh sách Pokemon");
        console.error("Error fetching pokemon:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const searchPokemon = async (name: string) => {
    try {
      setLoading(true);
      const data = await apiService.searchPokemon(name);
      setPokemon(data);
      setError(null);
    } catch (err) {
      setError("Không thể tìm kiếm Pokemon");
      console.error("Error searching pokemon:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    pokemon,
    loading,
    error,
    searchPokemon,
  };
};

// Hook để quản lý authentication
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("auth_token")
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response: AuthResponse = await apiService.login(username, password);
      setUser(response.user);
      setToken(response.access_token);
      localStorage.setItem("auth_token", response.access_token);
      localStorage.setItem("user", JSON.stringify(response.user));
    } catch (err) {
      setError("Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ) => {
    try {
      setLoading(true);
      setError(null);
      await apiService.register(username, email, password);
      // Sau khi đăng ký thành công, tự động đăng nhập
      await login(username, password);
    } catch (err) {
      setError("Đăng ký thất bại. Vui lòng thử lại.");
      console.error("Register error:", err);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  };

  // Khôi phục user từ localStorage khi component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }
  }, [token]);

  return {
    user,
    token,
    loading,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };
};

// Hook để quản lý favorites
export const useFavorites = (token: string | null) => {
  const [favorites, setFavorites] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFavorites = useCallback(async () => {
    if (!token) return;

    try {
      setLoading(true);
      const data = await apiService.getFavorites(token);
      setFavorites(data);
      setError(null);
    } catch (err) {
      setError("Không thể tải danh sách yêu thích");
      console.error("Error fetching favorites:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const addFavorite = async (pokemonId: number) => {
    if (!token) return;

    try {
      await apiService.addFavorite(pokemonId, token);
      // Refresh favorites list
      await fetchFavorites();
    } catch (err) {
      setError("Không thể thêm vào danh sách yêu thích");
      console.error("Error adding favorite:", err);
    }
  };

  const removeFavorite = async (pokemonId: number) => {
    if (!token) return;

    try {
      await apiService.removeFavorite(pokemonId, token);
      // Refresh favorites list
      await fetchFavorites();
    } catch (err) {
      setError("Không thể xóa khỏi danh sách yêu thích");
      console.error("Error removing favorite:", err);
    }
  };

  useEffect(() => {
    if (token) {
      fetchFavorites();
    }
  }, [token, fetchFavorites]);

  return {
    favorites,
    loading,
    error,
    addFavorite,
    removeFavorite,
    refreshFavorites: fetchFavorites,
  };
};
