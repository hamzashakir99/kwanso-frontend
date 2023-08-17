import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/list-tasks");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <></>;
};
