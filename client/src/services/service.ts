const service = {
  getData: async <T>(api: string, id?: number): Promise<T> => {
    const res: Response = await fetch(`${api}${id ? `/${id}` : ''}`);
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    return await res.json();
  },

  postData: async <T>(api: string, data: Omit<T, 'id'>): Promise<T> => {
    const res: Response = await fetch(`${api}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    return await res.json();
  },

  putData: async <T>(api: string, data: Partial<T>, id: number): Promise<T> => {
    const res: Response = await fetch(`${api}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    return await res.json();
  },

  deleteData: async <T>(api: string, id: number): Promise<T> => {
    const res: Response = await fetch(`${api}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    return res.status !== 204 ? await res.json() : undefined; //
  },
};

export default service;
