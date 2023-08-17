import React, { useEffect, useState } from "react";
import { ITask } from "../types/task";
import localforage from "localforage";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {
  Alert,
  Container,
  Paper,
  Box,
  ListItem,
  IconButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Checkbox,
  Button,
  Link,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";
import { useNavigate } from "react-router-dom";

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export const ListTaskPage = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const getTasks = async () => {
    try {
      // await localforage.removeItem("tasks");
      const value: any = await localforage.getItem("tasks");
      if (value) {
        setTasks(JSON.parse(value));
      }
    } catch (error) {
      console.log(error);
      alert("some error on task");
    }
  };
  const handleChecked = (index: number, checked: boolean) => {
    const updatedTasks = [...tasks];

    // Then, update the task at the given index.
    const updatedTask = {
      ...updatedTasks[index],
      checked,
    };
    // Replace the task at the index in the array.
    updatedTasks[index] = updatedTask;
    // Finally, set the state with the updated tasks array.
    setTasks(updatedTasks);
  };
  const deleteTask = async() => {
    try {
      const filterTask = tasks?.filter((item: any)=>!item.checked)
      setTasks(filterTask)
      await localforage.setItem(
        "tasks",
        JSON.stringify(filterTask)
      );
    } catch (error) {
      console.log(error)
      setError('error in deleting task')
    }
  }
  useEffect(() => {
    getTasks();
  }, []);
  return (
    <>
      <Container maxWidth="xl">
        {!tasks?.length && <Alert severity="info">No task found</Alert>}
        {error && <Alert severity="info">{error}</Alert>}
        <Box
          sx={{ mt: 1, mb: 1 }}
          display={"flex"}
          flexDirection={"row"}
          flexWrap={"wrap"}
          gap={1}
        >
          {tasks?.filter((item: any)=>item.checked).length ? <Button variant="contained" startIcon={<DeleteIcon />} onClick={deleteTask}>
            Delete
          </Button>: null}
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/add-tasks")}
          >
            Add
          </Button>
        </Box>
        {tasks?.map((item: ITask, index: number) => {
          return (
            <>
              <Paper elevation={3} sx={{ p: 1, mb: 1 }} key={item.id}>
                <Box>
                  <ListItem
                    secondaryAction={
                      <IconButton edge="end" aria-label="delete">
                        <Checkbox
                          {...label}
                          checked={item?.checked}
                          onChange={(event: any) =>
                            handleChecked(index, event.target.checked)
                          }
                        />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <FolderIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.name}
                      secondary={
                        <Link
                          underline="hover"
                          href={`/edit-task?id=${item.id}`}
                        >
                          Edit
                        </Link>
                      }
                    />
                  </ListItem>
                  ,
                </Box>
              </Paper>
            </>
          );
        })}
      </Container>
    </>
  );
};
