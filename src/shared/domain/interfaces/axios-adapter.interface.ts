export interface AxiosAdapterInterface {
  get<T = any>(url: string): Promise<T>;
}
