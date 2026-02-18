import { useState, useEffect, useCallback, useMemo } from "react";
import type { AlertState, GetOptions, HttpMethod, PostOptions } from "../utils/AuthUtils";

export const useAlertToast = () => {
  const [alert, setAlert] = useState<AlertState | null>(null);

  const showSuccess = (title: string, description?: string) => {
    setAlert({
      type: "success",
      title,
      description,
    });
  };

  const showError = (title: string, description?: string) => {
    setAlert({
      type: "error",
      title,
      description,
    });
  };

  const clearAlert = () => setAlert(null);

  return {
    alert,
    showSuccess,
    showError,
    clearAlert,
  };
};



export const usePost = <TRequest, TResponse>(
  url: string,
  defaultMethod: HttpMethod = 'POST'
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = async (data: TRequest, options?: PostOptions<TResponse> & { method?: HttpMethod }) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(import.meta.env.VITE_API_BASE_URL + url, {
        method: options?.method || defaultMethod,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers
        },
        body: JSON.stringify(data),
        credentials: options?.credentials || "include", // 'include' for cookies
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      options?.onSuccess?.(result);
      return result;
    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setError(errorMessage);
      options?.onError?.(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return { execute, isLoading, error };
};

export const useGet = <TResponse,>(url: string, options?: GetOptions<TResponse>) => {
  const [data, setData] = useState<TResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(import.meta.env.VITE_API_BASE_URL + url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch data');
      }

      setData(result);
      options?.onSuccess?.(result);
    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected error occurred';
      setError(errorMessage);
      options?.onError?.(err);
    } finally {
      setIsLoading(false);
    }
  }, [url, JSON.stringify(options?.headers)]);

  useEffect(() => {
    if (options?.enabled !== false) {
      fetchData();
    }
  }, [fetchData, options?.enabled]);

  return { data, isLoading, error, refetch: fetchData };
};


function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// export function useFilter<T>(data: T[] | null, searchKeys: (keyof T)[]) {
//   const [searchText, setSearchText] = useState('');
//   const debouncedSearch = useDebounce(searchText, 300);

//   const filteredData = useMemo(() => {
//     if (!data) return [];
//     if (!debouncedSearch) return data;

//     const query = debouncedSearch.toLowerCase();

//     return data.filter((item) => {
//       return searchKeys.some((key) => {
//         const value = item[key];
//         return value && String(value).toLowerCase().includes(query);
//       });
//     });
//   }, [data, debouncedSearch, searchKeys]);

//   return {
//     searchText,
//     setSearchText,
//     filteredData,
//   };
// }

type Filters<T> = Partial<Record<keyof T, string | number>>;

export function useFilter<T>(
  data: T[] | null,
  searchKeys: (keyof T)[],
  filters: Filters<T>
) {
  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 300);

  const filteredData = useMemo(() => {
    if (!data) return [];

    let result = data;

    if (debouncedSearch) {
      const query = debouncedSearch.toLowerCase();

      result = result.filter(item =>
        searchKeys.some(key => {
          const value = item[key];
          return value && String(value).toLowerCase().includes(query);
        })
      );
    }

    result = result.filter(item => {
      return Object.entries(filters).every(([key, value]) => {
        if (value === "" || value === null || value === undefined) return true;
        return String(item[key as keyof T]) === String(value);
      });
    });

    return result;
  }, [data, debouncedSearch, searchKeys, filters]);

  return {
    searchText,
    setSearchText,
    filteredData,
  };
}
