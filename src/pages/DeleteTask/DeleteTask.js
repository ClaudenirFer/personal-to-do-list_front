import Home from "../Home/Home";
import React, { useEffect, useState } from "react";
import { Api } from "../../api/api";
import { useParams } from "react-router-dom";

const DeleteTask = () => {
  const id = useParams().id;
  const [taskDelete, setTaskDelete] = useState(false);

  useEffect(() => {
    deleteTaskRequest();
  }, []);

  const deleteTaskRequest = async () => {
    const response = await Api.buildDeleteRequest(id);
    const data = await response.json();

    if (response.status === 200) {
      setTaskDelete(data.status.task);
    } else {
      setTaskDelete(data.status);
    }
  };

  if (!Object.keys(taskDelete).length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card-modal">
      <Home delete={taskDelete} />
    </div>
  );
};

export default DeleteTask;
