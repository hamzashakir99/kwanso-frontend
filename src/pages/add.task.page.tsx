import React, { useState } from "react";
import localforage from "localforage";
import {
  Alert,
  Container,
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";



export const AddTaskPage = () => {
  const [error, setError] = useState<string>("");
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();
  const addTasks = async (event: any) => {
    event.preventDefault();
    try {
      const value: any = await localforage.getItem("tasks");
      if (value) {
        const array = JSON.parse(value);
        array.push({
          name,
          id: array.length,
          checked: false,
        });
        await localforage.setItem("tasks", JSON.stringify(array));
      } else {
        await localforage.setItem(
          "tasks",
          JSON.stringify([
            {
              name,
              id: 0,
              checked: false,
            },
          ])
        );
      }
      navigate("/list-tasks");
    } catch (error) {
      console.log(error);
      setError("some error on add task");
    }
  };
  return (
    <>
      <Container maxWidth="xs">
        {error && <Alert severity="info">{error}</Alert>}
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Add Task
          </Typography>
          <Box component="form" onSubmit={addTasks} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              label="Name"
              name="name"
              value={name}
              onChange={(event: any) => setName(event.target.value)}
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
      </Container>
    </>
  );
};
