import { useState, useEffect } from "react";

const useUserId = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) setUserId(storedUserId);
  }, []);

  return userId;
};

export default useUserId;
