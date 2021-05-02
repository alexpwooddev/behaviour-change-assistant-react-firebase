import React, { useState } from "react";
import "./GoalModal.css";
import GeneralModal from "./GeneralModal";

const GoalModal = (props) => {
  const [showCheckedDaysModal, toggleCheckedDaysModal] = useState(false)
  const dayToIndexMapper = {
    0: "monday",
    1: "tuesday",
    2: "wednesday",
    3: "thursday",
    4: "friday",
    5: "saturday",
    6: "sunday",
  };
  const [nameInput, setNameInput] = useState("");
  const [goalInput, setGoalInput] = useState("");
  const [colourInput, setColourInput] = useState("#4FE899");
  const [checkedDays, setCheckedDays] = useState([
    true,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  const hideOrShowCheckedDaysModal = (e = undefined) => {
    if (e) {
      e.stopPropagation();
    }
    toggleCheckedDaysModal(!showCheckedDaysModal);
  }

  const changeCheckedDays = (index) => {
    let newCheckedDays = Array.from(checkedDays);
    newCheckedDays[index] = !newCheckedDays[index];
    setCheckedDays(newCheckedDays);
  };

  const addGoal = (e) => {
    if (!checkedDays.includes(true)){
      hideOrShowCheckedDaysModal();
      console.log(e);
      e.preventDefault();
      return;
    }
    
    let goalDaysIndexes = [];
    checkedDays.forEach((element, index) => {
      if (element === true) {
        goalDaysIndexes.push(index);
      }
    });
    let goalDays = goalDaysIndexes.map((index) => dayToIndexMapper[index]);
    let newGoal = [goalInput, goalDays, colourInput, nameInput];

    props.addNewGoal(newGoal);
    props.hideOrShowGoalModal();
  };

  return (
    <div className="modal goal-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Add New Goal</h5>
        </div>
        <div className="modal-body">
          <form className="goalForm" id="goalForm" onSubmit={addGoal}>
            <fieldset>
              <div id="promise-container">
                <p>
                  I,<br />
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    maxLength="100"
                    required
                  />{" "}
                  <br />{" "}
                  <span className="input-instruction name-instruction">(your name)</span>
                </p>
                <p>
                <label htmlFor="goalTitle" id="goal-modal-title">
                commit to:<br />
                </label>
                <input
                  type="text"
                  id="goalTitle"
                  name="goalTitle"
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  maxLength="50"
                  required
                />
                <br />
                <span className="input-instruction behaviour-instruction">(desired behaviour - max 50 characters)</span>
              </p>
              </div>
              <p>
                <label htmlFor="goalColour">
                  Goal Colour:&nbsp;
                </label>
                <input
                  type="color"
                  id="goalColour"
                  name="goalColour"
                  value={colourInput}
                  onChange={(e) => setColourInput(e.target.value)}
                  required
                />
              </p>
              <p className="days-instruction">I will do this on:</p>
              <div className="days-wrapper">
                <div>
                  <input
                    type="checkbox"
                    id="monday"
                    name="goalDaysIndexes[]"
                    value="monday"
                    checked={checkedDays[0]}
                    onChange={() => changeCheckedDays(0)}
                  />
                  <label htmlFor="monday">Monday</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="tuesday"
                    name="goalDaysIndexes[]"
                    value="tuesday"
                    checked={checkedDays[1]}
                    onChange={() => changeCheckedDays(1)}
                  />
                  <label htmlFor="tuesday">Tuesday</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="wednesday"
                    name="goalDaysIndexes[]"
                    value="wednesday"
                    checked={checkedDays[2]}
                    onChange={() => changeCheckedDays(2)}
                  />
                  <label htmlFor="wednesday">Wednesday</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="thursday"
                    name="goalDaysIndexes[]"
                    value="thursday"
                    checked={checkedDays[3]}
                    onChange={() => changeCheckedDays(3)}
                  />
                  <label htmlFor="thursday">Thursday</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="friday"
                    name="goalDaysIndexes[]"
                    value="friday"
                    checked={checkedDays[4]}
                    onChange={() => changeCheckedDays(4)}
                  />
                  <label htmlFor="friday">Friday</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="saturday"
                    name="goalDaysIndexes[]"
                    value="saturday"
                    checked={checkedDays[5]}
                    onChange={() => changeCheckedDays(5)}
                  />
                  <label htmlFor="saturday">Saturday</label>
                </div>
                <div>
                  <input
                    type="checkbox"
                    id="sunday"
                    name="goalDaysIndexes[]"
                    value="sunday"
                    checked={checkedDays[6]}
                    onChange={() => changeCheckedDays(6)}
                  />
                  <label htmlFor="sunday">Sunday</label>
                </div>
              </div>            
            </fieldset>
            <div className="modal-buttons">
              <input
                className="btn btn-primary"
                id="save-goal"
                type="submit"
                value="Save Goal"
              ></input>
              <button
                id="modal-close-button"
                type="button"
                className="btn btn-secondary"
                onClick={props.hideOrShowGoalModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      {showCheckedDaysModal && (
        <GeneralModal 
          title="You Might be Forgetting Something"
          message="Remember to set the day/s on which you aim to do the activities to complete your goal."
          hideOrShowModal={hideOrShowCheckedDaysModal}
        />
      )}
    </div>
  );
};

export default GoalModal;
