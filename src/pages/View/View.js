import DatePicker from "react-datepicker";
import React, { useEffect, useState } from "react";
import { Api } from "../../api/api";
import { Modal } from "react-responsive-modal";
import { useNavigate, useParams } from "react-router-dom";

// CSS
import "../../style/DatePicker.scss";
import "../../style/Modal.scss";
import "./View.scss";
import "react-datepicker/dist/react-datepicker.css";
import "react-responsive-modal/styles.css";

const View = () => {
  const navigate = useNavigate();
  const id = useParams().id;

  const [fields, setFields] = useState({});
  const [message, setMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [open, setOpen] = useState(false);

  const openModal = () => setOpen(true);
  const closeModal = () => {
    setOpen(false);
    navigate("/");
  };

  useEffect(() => {
    getViewTaskById();
  }, []);

  const getViewTaskById = async () => {
    const response = await Api.buildGetRequestById(id);
    const data = await response.json();
    data.deadline = dateFormat(data.deadline);
    setFields(data);
  };

  const dateConverter = (date) => {
    const dateAux = new Date(date);
    let month = "" + (dateAux.getMonth() + 1);
    let day = "" + dateAux.getDate();
    let year = "" + dateAux.getFullYear();

    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }
    return [day, month, year].join("/");
  };

  const dateFormat = (date) => {
    const formatDayMonthYear = dateConverter(date);
    return formatDayMonthYear;
  };

  const handleFieldsChange = (event) => {
    const auxFields = { ...fields };
    auxFields[event.target.name] = event.target.value;
    if (auxFields.status) {
      auxFields.status = parseInt(auxFields.status);
    }
    if (auxFields.priority) {
      auxFields.priority = parseInt(auxFields.priority);
    }
    setFields(auxFields);
  };

  const handleCheckRadioValue = () => {
    if (fields.status === 0) {
      return 0;
    }

    if (fields.status === 1) {
      return 1;
    }

    if (fields.status === 2) {
      return 2;
    }
  };

  const handleGoBack = (event) => {
    event.preventDefault();
    navigate("/");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await Api.buildPutRequest(fields, fields._id);

    if (response.status === 200) {
      setMessage(`Tarefa "${fields.title}" alterada!`);
      openModal();
    } else {
      setMessage("Ops: Algo deu errado! Tarefa não atualizada.");
      openModal();
    }
  };

  return (
    <section className="view">
      <div className="view-content">
        <form className="view-content-form" onSubmit={handleSubmit}>
          <div className="view-content-form-group">
            <div className="view-content-form-group-label">
              <label htmlFor="title" id="title">
                Título:
              </label>
            </div>
            <div className="view-content-form-group-input">
              <input
                className="view-content-form-group-input-inpt"
                type="text"
                name="title"
                id="title"
                value={fields.title}
                onChange={handleFieldsChange}
              />
            </div>
          </div>

          <div className="view-content-form-group">
            <div className="view-content-form-group-label">
              <label>Descrição:</label>
            </div>
            <div className="view-content-form-group-input">
              <input
                className="view-content-form-group-input-inpt"
                type="text"
                name="description"
                id="description"
                value={fields.description}
                onChange={handleFieldsChange}
              />
            </div>
          </div>

          {/* STATUS */}
          <div className="view-content-form-group">
            <div className="view-content-form-group-label">
              <label>Status:</label>
            </div>
            <div className="view-content-form-group-input">
              <div className="view-content-form-group-input-option">
                <input
                  className="view-content-form-group-input-option-rad"
                  type="radio"
                  name="status"
                  id="status0"
                  value={0}
                  checked={(() => {
                    if (handleCheckRadioValue() === 0) {
                      return true;
                    }
                  })()}
                  onChange={handleFieldsChange}
                />{" "}
                <label
                  htmlFor="status0"
                  className="view-content-form-group-input-option-lab"
                >
                  {" "}
                  Iniciar
                </label>
              </div>
              <div className="view-content-form-group-input-option">
                <input
                  className="view-content-form-group-input-option-rad"
                  type="radio"
                  name="status"
                  id="status1"
                  value={1}
                  checked={(() => {
                    if (handleCheckRadioValue() === 1) {
                      return true;
                    }
                  })()}
                  onChange={handleFieldsChange}
                />{" "}
                <label
                  htmlFor="status1"
                  className="view-content-form-group-input-option-lab"
                >
                  {" "}
                  Iniciada{" "}
                </label>
              </div>

              <div className="view-content-form-group-input-option">
                <input
                  className="view-content-form-group-input-option-rad"
                  type="radio"
                  name="status"
                  id="status2"
                  value={2}
                  checked={(() => {
                    if (handleCheckRadioValue() === 2) {
                      return true;
                    }
                  })()}
                  onChange={handleFieldsChange}
                />{" "}
                <label
                  htmlFor="status2"
                  className="view-content-form-group-input-option-lab"
                >
                  {" "}
                  Finalizada{" "}
                </label>
              </div>
            </div>
          </div>

          {/* PRIORITY */}
          <div className="view-content-form-group">
            <div className="view-content-form-group-label">
              <label>Prioridade:</label>
            </div>
            <div className="view-content-form-group-input">
              <div className="view-content-form-group-input-option">
                <input
                  className="view-content-form-group-input-option-rad"
                  type="radio"
                  name="priority"
                  id="priority0"
                  value={0}
                  // Função que autimaticamente se executa
                  checked={(() => {
                    if (fields.priority === 0) {
                      return true;
                    }
                  })()}
                  onChange={handleFieldsChange}
                />{" "}
                <label
                  htmlFor="priority0"
                  className="view-content-form-group-input-option-lab"
                >
                  {" "}
                  Baixa{" "}
                </label>
              </div>

              <div className="view-content-form-group-input-option">
                <input
                  className="view-content-form-group-input-option-rad"
                  type="radio"
                  name="priority"
                  id="priority1"
                  value={1}
                  checked={(() => {
                    if (fields.priority === 1) {
                      return true;
                    }
                  })()}
                  onChange={handleFieldsChange}
                />{" "}
                <label
                  htmlFor="priority1"
                  className="view-content-form-group-input-option-lab"
                >
                  {" "}
                  Média{" "}
                </label>
              </div>

              <div className="view-content-form-group-input-option">
                <input
                  className="view-content-form-group-input-option-rad"
                  type="radio"
                  name="priority"
                  id="priority2"
                  value={2}
                  checked={(() => {
                    if (fields.priority === 2) {
                      return true;
                    }
                  })()}
                  onChange={handleFieldsChange}
                />{" "}
                <label
                  htmlFor="priority2"
                  className="view-content-form-group-input-option-lab"
                >
                  {" "}
                  Alta{" "}
                </label>
              </div>
            </div>
          </div>

          {/* DEADLINE */}
          <div className="view-content-form-group">
            <div className="view-content-form-group-label-date">
              <label>Prazo:</label>
            </div>
            <div className="view-content-form-group-input">
              <DatePicker
                selected={selectedDate}
                onChange={(date) => {
                  setSelectedDate(date);
                  fields.deadline = date;
                }}
                dateFormat={"dd/MM/yyyy"}
                showYearDropdown
                scrollableMonthYearDropdown
                minDate={new Date()}
                value={fields.deadline}
                className="react-datepicker__header"
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="view-content-form-buttons">
            <button
              className="view-content-form-buttons-btn-cancelar"
              onClick={handleGoBack}
            >
              VOLTAR
            </button>

            <button
              className="view-content-form-buttons-btn-edit"
              type="submit"
            >
              SALVAR
            </button>
          </div>
        </form>
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
                <p> {message} </p>
              </div>
              <div className="card-modal-content-group-buttons"></div>
            </div>
          </div>
        </Modal>
      </div>
    </section>
  );
};

export default View;
