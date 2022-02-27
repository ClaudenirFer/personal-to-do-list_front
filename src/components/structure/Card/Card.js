import React, { useState } from "react";
import { FaEye, FaTrashAlt } from "react-icons/fa";
import { Modal } from "react-responsive-modal";
import { useNavigate } from "react-router-dom";

// CSS
import "../../../style/Modal.scss";
import "./Card.scss";
import "react-responsive-modal/styles.css";

const Card = (props) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const task = props.task;

  let status = "";
  let priority = "";

  // PRIORITY
  if (task.priority === 0) {
    priority = "Baixa";
  } else if (task.priority === 1) {
    priority = "Média";
  } else {
    priority = "Alta";
  }

  // STATUS
  if (task.status === 0) {
    status = "Não Iniciado";
  } else if (task.status === 1) {
    status = "Fazendo";
  } else {
    status = "Finalizada";
  }

  const handleView = () => {
    //chama a rota de outro componente e passa o objeto para ela.
    navigate(`/view/${task._id}`);
  };

  const handleDelete = () => {
    closeModal();
    navigate(`/delete/${task._id}`);
  };

  return (
    <div className="card">
      <div className="card-content">
        <h4> {task.title} </h4>
        <p> Prioridade: {priority} </p>
      </div>
      <div className="card-link">
        <a
          onClick={() => {
            handleView();
          }}
        >
          <FaEye className="card-link-eye" />
        </a>

        <a onClick={openModal}>
          <FaTrashAlt className="card-link-trash" />
        </a>
      </div>
      <div className="card-modal">
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
                <p> Deseja realmente apagar essa tarefa? </p>
              </div>
              <div className="card-modal-content-group-buttons">
                <button
                  className="card-modal-content-group-buttons-bt yes"
                  onClick={handleDelete}
                >
                  SIM
                </button>
                <button className="card-modal-content-group-buttons-bt not">
                  NÃO
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Card;
