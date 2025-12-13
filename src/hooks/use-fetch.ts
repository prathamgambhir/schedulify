"use client";

import { useState } from "react";

export default function useFetch<TData = any, TArgs extends any[] = any[]>(
  cb: (...args: TArgs) => Promise<TData>
) {
  const [data, setData] = useState<TData| undefined>(undefined);
  const [loading, setLoading] = useState<boolean>();
  const [error, setError] = useState(null);
  
  const fn = async (...args: TArgs) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);
      setData(response);
      return response;
      // console.log("this is dataaa")
      // console.log(response);
    } catch (error: any) {
      setError(error);
      throw new Error(error);
    } finally {
      setLoading(false);
    }
  };
  return { data, loading, error, fn };
}
