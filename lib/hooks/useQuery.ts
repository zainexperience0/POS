"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const useInfiniteQuery = ({ modelSlug, searchQuery }: any) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  // const [isEnd, setIsEnd] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const fetchInit = useRef(false);
  const isEnd = useRef(false);

  const fetchData = async (pageNo?: number) => {
    if (!fetchInit.current) {
      if (isEnd.current) return;
      // console.log("fetching...");
      fetchInit.current = true;
      // console.log({ pageNo, page });
      setIsLoading(true);
      const searchParams = `?page=${pageNo ? pageNo : page}${
        searchQuery ? searchQuery : ""
      }`;
      const res = await axios.get(
        `/api/v1/dynamic/${modelSlug}${searchParams}`
      );
      if (res.data.length === 0) {
        // setIsEnd(true);
        isEnd.current = true;
      }
      setData((prev: any) => [...prev, ...res.data]);
      if (pageNo) {
        setPage(pageNo + 1);
      } else {
        setPage((prev) => prev + 1);
      }
      setIsLoading(false);
      fetchInit.current = false;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      if (!isLoading) {
        fetchData();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  useEffect(() => {
    if (!searchQuery) return;
    isEnd.current = false;
    setData([]);
    fetchData(1);
  }, [searchQuery]);

  const reload = async () => {
    // console.log("reloading...");
    setIsLoading(true);
    const searchParams = `?page=1${searchQuery}`;
    const res = await axios.get(`/api/v1/dynamic/${modelSlug}${searchParams}`);
    setData([...res.data]);
    setPage(2);
    setIsLoading(false);
  };

  return {
    data,
    isLoading,
    isFailed,
    isEnd: isEnd.current,
    reload,
  };
};

export default useInfiniteQuery;
