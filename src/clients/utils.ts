type Url = string;
type Config = { headers: { [key: string]: string }; params: URLSearchParams };

export interface Client {
  get<D = unknown>(url: Url, config: Partial<Config>): Promise<{ data: D }>;
  post<D = unknown, B = unknown>(url: Url, body: B, config: Partial<Config>): Promise<{ data: D }>;
  delete<D = unknown>(url: Url, config: Partial<Config>): Promise<{ data: D }>;
}
