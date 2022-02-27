import React, { useEffect, useState } from "react";
import { Modal } from "react-responsive-modal";
import { useNavigate } from "react-router-dom";
import List from "../../components/structure/List/List";

import "./Home.scss";
import "../../style/Modal.scss";
import "react-responsive-modal/styles.css";

const Home = (props) => {
  const taskDeleted = props.delete;

  const navigate = useNavigate();
  const [isModalDelete, setIsModalDelete] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const openModal = () => {
    setOpen(true);
    setIsModalDelete(true);
  };
  const closeModal = () => {
    setOpen(false);
    navigate("/");
  };

  useEffect(() => {
    checkIsModal();
  });

  const checkIsModal = () => {
    if (taskDeleted != null && isModalDelete === false) {
      if (typeof taskDeleted === "object") {
        setMessage(`Tarefa ${taskDeleted.title} deletada!`);
        openModal();
      } else {
        setMessage(`Tarefa não deletada!`);
        openModal();
      }
    }
  };

  return (
    <section className="home">
      <Modal
        classNames="card-modal-md"
        open={open}
        onClose={closeModal}
        center
        classNames={{
          overlayAnimationIn: "customEnterOverlayAnimation",
          overlayAnimationOu: "customLeaverOverlayAnimation",
          modalAnimationIn: "customEnterModalAnimation",
          modalAnimationOu: "customLeaveModalAnimation",
        }}
      >
        <div className="card-modal-content">
          <div className="card-modal-content-group">
            <div className="card-modal-content-group-text">
              <p> {message} </p>
            </div>
            <div className="card-modal-content-group-buttons"></div>
          </div>
        </div>
      </Modal>
      <List />
    </section>
  );
};

export default Home;
