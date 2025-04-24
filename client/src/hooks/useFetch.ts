import { useState } from 'react';
import axios, { AxiosRequestConfig } from 'axios';

type HTTPMethod = 'GET' | 'POST' | 'DELETE' | 'PATCH';

const useFetch = <T = unknown>(url: string, method: HTTPMethod = 'GET') => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [data, setData] = useState<T | null>(null);

  const execute = async (body?: unknown): Promise<{ data?: T; error?: unknown }> => {
    setLoading(true);
    setError(null);
    const config: AxiosRequestConfig = { method, url, data: body };
    try {
      const response = await axios(config);
      setData(response.data);
      return { data: response.data };
    } catch (err: any) {
      const message = err.response?.data?.message;
      message ? setError(message) : setError(err);
      return { error: message };
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, execute };
};

export default useFetch;
