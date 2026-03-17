import { ofetch } from 'ofetch';
import type {
  CharacterResponse,
  CharacterFilters,
  Character,
  EpisodeResponse,
  EpisodeFilters,
  Episode,
} from './types';

export type {
  CharacterResponse,
  CharacterFilters,
  Character,
  EpisodeResponse,
  EpisodeFilters,
  Episode,
};

const API_ENDPOINT = process.env.API_ENDPOINT || 'https://rickandmortyapi.com/api';

const characterCache = new Map<string, { data: CharacterResponse; timestamp: number }>();
const characterByIdCache = new Map<number, { data: Character; timestamp: number }>();
const episodeCache = new Map<string, { data: EpisodeResponse; timestamp: number }>();
const episodeByIdCache = new Map<number, { data: Episode; timestamp: number }>();
const CACHE_TTL = 5 * 60 * 1000;

function getCachedOrFetch<K, V>(
  cache: Map<K, { data: V; timestamp: number }>,
  key: K,
  fetchFn: () => Promise<V>
): Promise<V> {
  const cached = cache.get(key);
  const now = Date.now();
  
  if (cached && now - cached.timestamp < CACHE_TTL) {
    return Promise.resolve(cached.data);
  }
  
  return fetchFn().then(data => {
    cache.set(key, { data, timestamp: now });
    return data;
  });
}

export function buildHeaders(appId?: string): Record<string, string> | undefined {
  return appId ? { 'X-App-Id': appId } : undefined;
}

const apiFetch = ofetch.create({
  baseURL: API_ENDPOINT,
});

export async function getAllCharacters(
  page?: number,
  appId?: string
): Promise<CharacterResponse> {
  return apiFetch('/character', {
    query: page ? { page } : undefined,
    headers: buildHeaders(appId),
  });
}

export async function getCharacter(id: number, appId?: string): Promise<Character> {
  return apiFetch(`/character/${id}`, {
    headers: buildHeaders(appId),
  });
}

export async function getCharacterBy(
  filters: CharacterFilters,
  appId?: string
): Promise<CharacterResponse> {
  return apiFetch('/character', {
    query: filters as Record<string, string>,
    headers: buildHeaders(appId),
  });
}

export async function getAllEpisodes(
  page?: number,
  appId?: string
): Promise<EpisodeResponse> {
  return apiFetch('/episode', {
    query: page ? { page } : undefined,
    headers: buildHeaders(appId),
  });
}

export async function getEpisode(id: number, appId?: string): Promise<Episode> {
  return apiFetch(`/episode/${id}`, {
    headers: buildHeaders(appId),
  });
}

export async function getEpisodeBy(
  filters: EpisodeFilters,
  appId?: string
): Promise<EpisodeResponse> {
  return apiFetch('/episode', {
    query: filters as Record<string, string>,
    headers: buildHeaders(appId),
  });
}

export async function getCachedCharacters(
  page: number = 1,
  appId?: string
): Promise<CharacterResponse> {
  const cacheKey = `${page}-${appId || 'default'}`;
  return getCachedOrFetch(characterCache, cacheKey, () => getAllCharacters(page, appId));
}

export async function getCachedCharacterById(
  id: number,
  appId?: string
): Promise<Character> {
  return getCachedOrFetch(characterByIdCache, id, () => getCharacter(id, appId));
}

export async function getCachedEpisodes(
  page: number = 1,
  appId?: string
): Promise<EpisodeResponse> {
  const cacheKey = `${page}-${appId || 'default'}`;
  return getCachedOrFetch(episodeCache, cacheKey, () => getAllEpisodes(page, appId));
}

export async function getCachedEpisodeById(
  id: number,
  appId?: string
): Promise<Episode> {
  return getCachedOrFetch(episodeByIdCache, id, () => getEpisode(id, appId));
}
