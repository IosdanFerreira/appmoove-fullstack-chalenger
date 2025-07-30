/* eslint-disable @typescript-eslint/no-explicit-any */
import { Meta } from "./meta.interface";

export interface ApiResponse<T> {
  statusCode: number;
  success: boolean;
  errorType: string | null;
  errors: any | null;
  message: string;
  items: T;
  meta: Meta;
}