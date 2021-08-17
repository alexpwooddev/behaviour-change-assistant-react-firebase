import React, { useState, useContext } from "react";
import PropTypes from 'prop-types';

import { Text, LanguageContext } from '../containers/Language';
import "./GoalModal.css";
import GeneralModal from "./GeneralModal";

const GoalModal = (props) => {
  const [showCheckedDaysModal, toggleCheckedDaysModal] = useState(false);
  const { dictionary } = useContext(LanguageContext);
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
  const [colourInput, setColourInput] = useState("#d028e6");
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
          <h5 className="modal-title"><Text tid="goalModalTitle"/></h5>
        </div>
        <div className="modal-body">
          <form className="goalForm" id="goalForm" onSubmit={addGoal}>
            <fieldset>
              <div id="promise-container">
                <p>
                  <Text tid="goalModalPhraseP1"/>,<br />
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    maxLength="100"
                    required
                  />{" "}
                  <br />{" "}
                  <span className="input-instruction name-instruction">(<Text tid="goalModalNameInstruction"/>)</span>
                </p>
                <p>
                <label htmlFor="goalTitle" id="goal-modal-title">
                <Text tid="goalModalPhraseP2" />:<br />
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
                <span className="input-instruction behaviour-instruction">(<Text tid="goalModalGoalInstruction" />)</span>
              </p>
              </div>
              <p>
                <label htmlFor="goalColour">
                  <Text tid="goalModalColourSelector"/>:&nbsp;
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
              <p className="days-instruction"><Text tid="goalModalDaysTitle"/>:</p>
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
                  <label htmlFor="monday"><Text tid="goalModalDay1"/></label>
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
                  <label htmlFor="tuesday"><Text tid="goalModalDay2"/></label>
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
                  <label htmlFor="wednesday"><Text tid="goalModalDay3"/></label>
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
                  <label htmlFor="thursday"><Text tid="goalModalDay4"/></label>
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
                  <label htmlFor="friday"><Text tid="goalModalDay5"/></label>
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
                  <label htmlFor="saturday"><Text tid="goalModalDay6"/></label>
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
                  <label htmlFor="sunday"><Text tid="goalModalDay7"/></label>
                </div>
              </div>            
            </fieldset>
            <div className="modal-buttons">
              <input
                className="btn btn-primary"
                id="save-goal"
                type="submit"
                value={dictionary.goalModalSaveGoalButton}
              ></input>
              <button
                id="modal-close-button"
                type="button"
                className="btn btn-secondary"
                onClick={props.hideOrShowGoalModal}
              >
                <Text tid="cancelButton"/>
              </button>
            </div>
          </form>
        </div>
      </div>
      {showCheckedDaysModal && (
        <GeneralModal 
          title={dictionary.goalDaysIncompleteTitle}
          message={dictionary.goalDaysIncompleteMessage}
          hideOrShowModal={hideOrShowCheckedDaysModal}
        />
      )}
    </div>
  );
};

GoalModal.propTypes = {
  addNewGoal: PropTypes.func.isRequired,
  hideOrShowGoalModal: PropTypes.func.isRequired,
  goals: PropTypes.array.isRequired,
}

export default GoalModal;
