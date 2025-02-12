import API from './api';

const service = {
  get: async <T>(endpoint: string, id?: string): Promise<T> => {
    const res: Response = await fetch(
      `${API}${endpoint}${id ? `/${id}` : ''}`,
      {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    return await res.json();
  },

  post: async <T>(endpoint: string, data: Omit<T, 'id'>): Promise<T> => {
    const res: Response = await fetch(`${API}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    return await res.json();
  },

  put: async <T>(
    endpoint: string,
    data: Partial<T>,
    id: string
  ): Promise<T> => {
    const res: Response = await fetch(`${API}${endpoint}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    return await res.json();
  },

  path: async <T>(
    endpoint: string,
    data: Partial<T>,
    id: string
  ): Promise<T> => {
    const res: Response = await fetch(`${API}${endpoint}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    return await res.json();
  },

  delete: async <T>(endpoint: string, id: number): Promise<T> => {
    const res: Response = await fetch(`${API}${endpoint}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    return res.status !== 204 ? await res.json() : undefined; //
  },
};

export default service;
