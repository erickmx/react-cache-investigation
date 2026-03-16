import { ofetch } from 'ofetch';
import type {
  CharacterResponse,
  CharacterFilters,
  Character,
  EpisodeResponse,
  EpisodeFilters,
  Episode,
} from './types';

const API_ENDPOINT = process.env.API_ENDPOINT || 'https://rickandmortyapi.com/api';

/**
 * Creates a fetch instance with the base URL configured
 */
const apiFetch = ofetch.create({
  baseURL: API_ENDPOINT,
});

/**
 * Get all characters with optional pagination
 * @param page - Page number (optional)
 * @returns Paginated list of characters
 */
export async function getAllCharacters(page?: number): Promise<CharacterResponse> {
  return apiFetch('/character', {
    query: page ? { page } : undefined,
  });
}

/**
 * Get a single character by ID
 * @param id - Character ID
 * @returns Character object
 */
export async function getCharacter(id: number): Promise<Character> {
  return apiFetch(`/character/${id}`);
}

/**
 * Filter characters by various criteria
 * @param filters - Object containing filter criteria
 * @returns Paginated list of filtered characters
 */
export async function getCharacterBy(
  filters: CharacterFilters
): Promise<CharacterResponse> {
  return apiFetch('/character', {
    query: filters as Record<string, string>,
  });
}

/**
 * Get all episodes with optional pagination
 * @param page - Page number (optional)
 * @returns Paginated list of episodes
 */
export async function getAllEpisodes(page?: number): Promise<EpisodeResponse> {
  return apiFetch('/episode', {
    query: page ? { page } : undefined,
  });
}

/**
 * Get a single episode by ID
 * @param id - Episode ID
 * @returns Episode object
 */
export async function getEpisode(id: number): Promise<Episode> {
  return apiFetch(`/episode/${id}`);
}

/**
 * Filter episodes by various criteria
 * @param filters - Object containing filter criteria
 * @returns Paginated list of filtered episodes
 */
export async function getEpisodeBy(
  filters: EpisodeFilters
): Promise<EpisodeResponse> {
  return apiFetch('/episode', {
    query: filters as Record<string, string>,
  });
}
