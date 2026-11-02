import React, { createContext, useContext, useState, useEffect } from 'react';
import { Hotel } from '../types/hotel';
import { apiRequest } from '../api/client';
import { useAuth } from './AuthContext';

interface FavoritesContextType {
  favorites: Hotel[];
  favoriteIds: Set<string>;
  toggleFavorite: (hotel: Hotel) => Promise<void>;
  isFavorite: (hotelId: string) => boolean;
  compareList: Hotel[];
  addToCompare: (hotel: Hotel) => void;
  removeFromCompare: (hotelId: string) => void;
  clearCompare: () => void;
  isComparing: (hotelId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState<Hotel[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  const [compareList, setCompareList] = useState<Hotel[]>([]);

  // Fetch user favorites when logged in
  useEffect(() => {
    async function fetchFavs() {
      if (!user) {
        setFavorites([]);
        setFavoriteIds(new Set());
        return;
      }
      try {
        const res = await apiRequest<{ favorites: Hotel[] }>('/favorites');
        setFavorites(res.favorites || []);
        setFavoriteIds(new Set((res.favorites || []).map((h) => h.id)));
      } catch (err) {
        console.error('Failed to load favorites', err);
      }
    }
    fetchFavs();
  }, [user]);

  const toggleFavorite = async (hotel: Hotel) => {
    if (!user) {
      alert('Please log in or select a demo role to save favorite hotels.');
      return;
    }

    // Optimistic toggle
    const exists = favoriteIds.has(hotel.id);
    const newSet = new Set(favoriteIds);
    if (exists) {
      newSet.delete(hotel.id);
      setFavorites((prev) => prev.filter((h) => h.id !== hotel.id));
    } else {
      newSet.add(hotel.id);
      setFavorites((prev) => [hotel, ...prev]);
    }
    setFavoriteIds(newSet);

    try {
      await apiRequest('/favorites/toggle', {
        method: 'POST',
        body: JSON.stringify({ hotelId: hotel.id })
      });
    } catch {
      // Revert if API fails
      if (exists) {
        newSet.add(hotel.id);
        setFavorites((prev) => [hotel, ...prev]);
      } else {
        newSet.delete(hotel.id);
        setFavorites((prev) => prev.filter((h) => h.id !== hotel.id));
      }
      setFavoriteIds(new Set(newSet));
    }
  };

  const isFavorite = (hotelId: string) => favoriteIds.has(hotelId);

  const addToCompare = (hotel: Hotel) => {
    if (compareList.some((h) => h.id === hotel.id)) return;
    if (compareList.length >= 4) {
      alert('You can compare up to 4 hotels at once.');
      return;
    }
    setCompareList((prev) => [...prev, hotel]);
  };

  const removeFromCompare = (hotelId: string) => {
    setCompareList((prev) => prev.filter((h) => h.id !== hotelId));
  };

  const clearCompare = () => setCompareList([]);

  const isComparing = (hotelId: string) => compareList.some((h) => h.id === hotelId);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoriteIds,
        toggleFavorite,
        isFavorite,
        compareList,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isComparing
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
