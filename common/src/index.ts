import { cache } from 'react';
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

export const getCachedCharacters = cache(
  async (page: number = 1, appId?: string): Promise<CharacterResponse> => {
    return getAllCharacters(page, appId);
  }
);

export const getCachedCharacterById = cache(
  async (id: number, appId?: string): Promise<Character> => {
    return getCharacter(id, appId);
  }
);

export const getCachedEpisodes = cache(
  async (page: number = 1, appId?: string): Promise<EpisodeResponse> => {
    return getAllEpisodes(page, appId);
  }
);

export const getCachedEpisodeById = cache(
  async (id: number, appId?: string): Promise<Episode> => {
    return getEpisode(id, appId);
  }
);
