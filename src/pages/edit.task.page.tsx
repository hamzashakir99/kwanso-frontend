import React, { useState, useEffect } from "react";
import localforage from "localforage";

import {
  Alert,
  Container,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ITask } from "../types/task";

export const EditTaskPage = () => {
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const editTasks = async(event: any) => {
    event.preventDefault();
    try {
      const id = searchParams.get("id");
      const index = tasks.findIndex((item: ITask) => item.id.toString() === id);
      const updatedTasks = [...tasks];
      updatedTasks[index] = {
        ...updatedTasks[index],
        name,
      };
      setTasks(updatedTasks);
      await localforage.setItem(
        "tasks",
        JSON.stringify(updatedTasks)
      );
      navigate("/list-tasks");
    } catch (error) {
      console.log(error)
      setError("some error on your edit task");
    }
  };
  const getTasks = async () => {
    const id = searchParams.get("id");
    if (id) {
      try {
        const value: any = await localforage.getItem("tasks");
        if (value) {
          const array = JSON.parse(value);
          const data = array.filter((item: ITask) => item.id.toString() === id);
          if (data[0]) {
            setName(data[0].name);
            setTasks(array);
          } else {
            navigate("/list-tasks");
          }
        }
      } catch (error) {
        console.log(error);
        setError("some error on your edit task");
      }
    } else {
      navigate("/list-tasks");
    }
  };
  useEffect(() => {
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Container maxWidth="xs">
        {error && <Alert severity="info">{error}</Alert>}
        {!error && (
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Edit Task
            </Typography>
            <Box
              component="form"
              onSubmit={editTasks}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                label="Name"
                name={"name"}
                value={name}
                onChange={(event: any) => {
                  console.log(event.target.value)
                  setName(event.target.value)
                }}
                autoFocus
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Save
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </>
  );
};
