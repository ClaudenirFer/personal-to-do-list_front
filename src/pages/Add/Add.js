import DatePicker from "react-datepicker";
import React, { useState } from "react";
import { Api } from "../../api/api";
import { Modal } from "react-responsive-modal";
import { useNavigate } from "react-router-dom";

// CSS
import "../../style/DatePicker.scss";
import "../../style/Modal.scss";
import "./Add.scss";
import "react-datepicker/dist/react-datepicker.css";
import "react-responsive-modal/styles.css";

const Add = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState("");
  const [message, setMessage] = useState("");
  const [fields, setFields] = useState({});
  const [open, setOpen] = useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => {
    setOpen(false);
    navigate("/");
  };

  const handleFieldChange = (event) => {
    fields[event.target.name] = event.target.value;
    if (fields.status || fields.priority) {
      fields.status = parseInt(fields.status);
      fields.priority = parseInt(fields.priority);
    }
    setFields(fields);
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    fields.deadline = selectedDate;

    const response = await Api.buildPostRequest(fields);

    if (response.status === 200) {
      setMessage(`Tarefa ${fields.title} criada com sucesso!`);
      openModal();
    } else {
      setMessage("Error: Algo deu errado!");
      openModal();
    }
  };

  return (
    <section className="add">
      <div className="add-content">
        <form className="add-content-form" onSubmit={handleSubmit}>
          <div className="add-content-form-group">
            <div className="add-content-form-group-label">
              <label htmlFor="title" id="title">
                Título:
              </label>
            </div>
            <div className="add-content-form-group-input">
              <input
                className="add-content-form-group-input-inpt"
                type="text"
                name="title"
                id="title"
                onChange={handleFieldChange}
                value={fields.title}
              />
            </div>
          </div>

          <div className="add-content-form-group">
            <div className="add-content-form-group-label">
              <label>Descrição:</label>
            </div>
            <div className="add-content-form-group-input">
              <input
                className="add-content-form-group-input-inpt"
                type="text"
                name="description"
                id="description"
                onChange={handleFieldChange}
                value={fields.description}
              />
            </div>
          </div>

          {/* STATUS */}
          <div className="add-content-form-group">
            <div className="add-content-form-group-label">
              <label htmlFor="status" id="status">
                Status:
              </label>
            </div>
            <div className="add-content-form-group-input">
              <div className="add-content-form-group-input-option">
                <input
                  className="add-content-form-group-input-option-rad"
                  type="radio"
                  name="status"
                  id="status0"
                  onChange={handleFieldChange}
                  value={0}
                />{" "}
                <label
                  htmlFor="status0"
                  className="add-content-form-group-input-option-lab"
                >
                  {" "}
                  Iniciar{" "}
                </label>
              </div>

              <div className="add-content-form-group-input-option">
                <input
                  className="add-content-form-group-input-option-rad"
                  type="radio"
                  name="status"
                  id="status1"
                  onChange={handleFieldChange}
                  value={1}
                />{" "}
                <label
                  htmlFor="status1"
                  className="add-content-form-group-input-option-lab"
                >
                  {" "}
                  Iniciada{" "}
                </label>
              </div>

              <div className="add-content-form-group-input-option">
                <input
                  className="add-content-form-group-input-option-rad"
                  type="radio"
                  name="status"
                  id="status2"
                  onChange={handleFieldChange}
                  value={2}
                />{" "}
                <label
                  htmlFor="status2"
                  className="add-content-form-group-input-option-lab"
                >
                  {" "}
                  Finalizada{" "}
                </label>
              </div>
            </div>
          </div>

          {/* PRIORITY */}
          <div className="add-content-form-group">
            <div className="add-content-form-group-label">
              <label>Prioridade:</label>
            </div>
            <div className="add-content-form-group-input">
              <div className="add-content-form-group-input-option">
                <input
                  className="add-content-form-group-input-option-rad"
                  type="radio"
                  name="priority"
                  id="priority0"
                  onChange={handleFieldChange}
                  value={0}
                />{" "}
                <label
                  htmlFor="priority0"
                  className="add-content-form-group-input-option-lab"
                >
                  {" "}
                  Baixa{" "}
                </label>
              </div>
              <div className="add-content-form-group-input-option">
                <input
                  className="add-content-form-group-input-option-rad"
                  type="radio"
                  name="priority"
                  id="priority1"
                  onChange={handleFieldChange}
                  value={1}
                />{" "}
                <label
                  htmlFor="priority1"
                  className="add-content-form-group-input-option-lab"
                >
                  {" "}
                  Média{" "}
                </label>
              </div>

              <div className="add-content-form-group-input-option">
                <input
                  className="add-content-form-group-input-option-rad"
                  type="radio"
                  name="priority"
                  id="priority2"
                  onChange={handleFieldChange}
                  value={2}
                />{" "}
                <label
                  htmlFor="priority2"
                  className="add-content-form-group-input-option-lab"
                >
                  {" "}
                  Alta{" "}
                </label>
              </div>
            </div>
          </div>

          {/* DEADLINE */}
          <div className="add-content-form-group">
            <div className="add-content-form-group-label-date">
              <label>Prazo:</label>
            </div>
            <div className="add-content-form-group-input">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="dd/MM/yyyy"
                showYearDropdown
                scrollableMonthYearDropdown
                minDate={new Date()}
                className="react-datepicker__header"
                value={fields.deadline}
              />
            </div>
          </div>

          <div className="add-content-form-buttons">
            <button
              className="add-content-form-buttons-btn-cancelar"
              onClick={handleGoBack}
            >
              VOLTAR
            </button>
            <button className="add-content-form-buttons-btn-add" type="submit">
              SALVAR
            </button>
          </div>
        </form>
      </div>

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
    </section>
  );
};

export default Add;
