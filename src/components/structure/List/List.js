import Card from "../Card/Card";
import React, { useState, useEffect } from "react";
import { Api } from "../../../api/api";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

// CSS
import "./List.scss";

const List = () => {
  let total;
  const [list, setList] = useState([]);
  const [priority, setPriority] = useState("");
  const [i, setI] = useState(0);
  const [j, setJ] = useState(5);

  useEffect(() => {
    getList();
  }, [priority]);

  const handleLessCheck = () => {
    setI(i - 5);
    setJ(j - 5);
  };

  const handleMoreCheck = (total) => {
    setI(i + 5);
    setJ(j + 5);
  };

  const getList = async () => {
    if (!priority) {
      const response = await Api.buildGetRequest();
      const data = await response.json();
      setList(data);
    } else {
      const response = await Api.buildGetPriorityRequest(priority);
      const data = await response.json();

      setList(data);
    }
  };

  return (
    <div className="list">
      <div className="list-content">
        <div className="list-content-group-priority">
          <div className="list-content-group-priority-label">
            <label>Selecione a prioridade: </label>
          </div>
          <select
            className="list-content-group-priority-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value={""}> </option>
            <option value={0}> Baixa </option>
            <option value={1}> Média </option>
            <option value={2}> Alta </option>
          </select>
        </div>

        <div className="list-content-container">
          {
            <div className="list-content-container-cards">
              {
                (total = list
                  .slice(i, j)
                  .map((task, i) => <Card task={task} key={task._id} />))
              }
            </div>
          }

          <div className="list-content-container-link">
            <Link
              to="/"
              onClick={() => {
                if (i - 5 >= 0) {
                  handleLessCheck(total);
                }
              }}
              className="list-content-container-link-all"
            >
              <FaArrowAltCircleLeft className="list-content-container-link-all-bt" />
            </Link>

            <Link
              to="/"
              onClick={() => {
                if (i + 5 < list.length) {
                  handleMoreCheck(total);
                }
              }}
              className="list-content-container-link-all"
            >
              <FaArrowAltCircleRight className="list-content-container-link-all-bt" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;
