type Url = string;
type Config = { headers: {}; params: {} };

export interface Client {
  get<T = unknown>(url: Url, config: Partial<Config>): Promise<{ data: T }>;
}
