import { useState, useEffect } from "react";
import { Alert } from "react-native";

const useAppwrite = (fn: any) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const fetchData = async () => {
    setIsloading(true);
    try {
      const response: any = await fn()
      setData(response);
    } catch (error: any) {
      Alert.alert('Error', error.message)
    } finally {
      setIsloading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => fetchData()

  return { data, isLoading, refetch };
}

export default useAppwrite;