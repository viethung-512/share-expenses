import queryString from "query-string";

export abstract class BaseService<
  T extends object = {},
  R extends object = {},
> {
  abstract apiEndpoint: string;

  async fetchAll(filter?: Partial<R>): Promise<T[]> {
    const url = queryString.stringifyUrl({
      url: this.apiEndpoint,
      query: filter as any,
    });
    return this.get(url);
  }

  async fetchById(id?: string): Promise<T> {
    return this.get(`${this.apiEndpoint}/${id}`);
  }

  async create(data: Partial<T>): Promise<T> {
    return this.post(this.apiEndpoint, data);
  }

  protected async get(url: string) {
    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "API request failed");
    }
    return response.json();
  }

  protected async post(url: string, data: any) {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "API request failed");
    }
    return response.json();
  }
}
