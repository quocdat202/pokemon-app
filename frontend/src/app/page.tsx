'use client'
import React, { useState } from 'react'
import './globals.css'
import { usePokemon, useAuth, useFavorites } from '../hooks/useApi'
import PokemonCard from '../components/PokemonCard'
import LoginForm from '@/features/auth/LoginForm'

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [showFavorites, setShowFavorites] = useState(false)

  // Auth hooks
  const {
    user,
    token,
    loading: authLoading,
    error: authError,
    login,
    register,
    logout,
    isAuthenticated,
  } = useAuth()

  // Pokemon hooks
  const { pokemon, loading: pokemonLoading, error: pokemonError, searchPokemon } = usePokemon()

  // Favorites hooks
  const { favorites, loading: favoritesLoading, addFavorite, removeFavorite } = useFavorites(token)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      searchPokemon(searchTerm)
    }
  }

  const handleFavoriteToggle = (pokemonId: number) => {
    const isFavorite = favorites.some((fav) => fav.id === pokemonId)
    if (isFavorite) {
      removeFavorite(pokemonId)
    } else {
      addFavorite(pokemonId)
    }
  }

  // Remove the redundant PokemonType interface and use the actual Pokemon type from your data model
  // Normalize displayPokemon to always have a 'data' property
  const displayPokemon: { data: typeof favorites } = showFavorites
    ? { data: favorites }
    : Array.isArray(pokemon)
    ? { data: pokemon }
    : pokemon || { data: [] }

  return (
    <div className="App" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ marginBottom: '40px', textAlign: 'center' }}>
        {/* <h1 style={{ color: '#333', marginBottom: '10px' }}>🏮 Pokemon App</h1> */}

        {isAuthenticated ? (
          <div style={{ marginBottom: '20px' }}>
            <p>
              Xin chào, <strong>{user?.username}</strong>!
            </p>
            <button
              onClick={logout}
              style={{
                padding: '8px 16px',
                backgroundColor: '#ff6b6b',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginLeft: '10px',
              }}>
              Đăng xuất
            </button>
          </div>
        ) : (
          <LoginForm onLogin={login} loading={authLoading} error={authError} />
        )}

        {isAuthenticated && (
          <div style={{ marginTop: '20px' }}>
            <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
              <input
                type="text"
                placeholder="Tìm kiếm Pokemon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  marginRight: '10px',
                  width: '300px',
                }}
              />
              <button
                type="submit"
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#4ecdc4',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}>
                Tìm kiếm
              </button>
            </form>

            <div style={{ marginBottom: '20px' }}>
              <button
                onClick={() => setShowFavorites(false)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: showFavorites ? '#ddd' : '#4ecdc4',
                  color: showFavorites ? '#333' : 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginRight: '10px',
                }}>
                Tất cả Pokemon
              </button>
              <button
                onClick={() => setShowFavorites(true)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: showFavorites ? '#4ecdc4' : '#ddd',
                  color: showFavorites ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}>
                Yêu thích ({favorites.length})
              </button>
            </div>
          </div>
        )}
      </header>

      {isAuthenticated && (
        <main>
          {(pokemonLoading || favoritesLoading) && (
            <div style={{ textAlign: 'center', padding: '20px' }}>
              <p>Đang tải...</p>
            </div>
          )}

          {(pokemonError || authError) && (
            <div
              style={{
                padding: '10px',
                backgroundColor: '#ffebee',
                border: '1px solid #f44336',
                borderRadius: '4px',
                color: '#d32f2f',
                marginBottom: '20px',
                textAlign: 'center',
              }}>
              {pokemonError || authError}
            </div>
          )}

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '16px',
            }}>
            {displayPokemon &&
              displayPokemon?.data?.map((poke) => (
                <PokemonCard
                  key={poke.id}
                  pokemon={poke}
                  onFavorite={handleFavoriteToggle}
                  isFavorite={favorites.some((fav) => fav.id === poke.id)}
                  isAuthenticated={isAuthenticated}
                />
              ))}
          </div>

          {displayPokemon?.data?.length === 0 && !pokemonLoading && !favoritesLoading && (
            <div style={{ textAlign: 'center', padding: '40px' }}>
              <p>
                {showFavorites
                  ? 'Bạn chưa có Pokemon yêu thích nào.'
                  : 'Không tìm thấy Pokemon nào.'}
              </p>
            </div>
          )}
        </main>
      )}
    </div>
  )
}
