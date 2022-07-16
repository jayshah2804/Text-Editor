import React, { useState } from "react";

const TextEditor = () => {
  const [changed, isChanged] = useState(false);
  let optionsButtons = document.querySelectorAll(".option-button");
  let advancedOptionButton = document.querySelectorAll(".adv-option-button");
  let alignButtons = document.querySelectorAll(".align");
  let spacingButtons = document.querySelectorAll(".spacing");
  let formatButtons = document.querySelectorAll(".format");
  let scriptButtons = document.querySelectorAll(".script");

  const modifyText = (command, defaultUi, value) => {
    document.execCommand(command, defaultUi, value);
  };

  optionsButtons.forEach((button) => {
    button.addEventListener("click", () => {
      modifyText(button.id, false, null);
    });
  });

  advancedOptionButton.forEach((button) => {
    button.addEventListener("change", () => {
      modifyText(button.id, false, button.value);
    });
  });

  const highlighter = (className, needsRemoval) => {
    className.forEach((button) => {
      button.addEventListener("click", () => {
        if (needsRemoval) {
          let alreadyActive = false;

          if (button.classList.contains("active")) {
            alreadyActive = true;
          }

          highlighterRemover(className);
          if (!alreadyActive) {
            button.classList.add("active");
          }
        } else {
          button.classList.toggle("active");
        }
      });
    });
    const highlighterRemover = (className) => {
      className.forEach((button) => {
        button.classList.remove("active");
      });
    };
  };
  const initializer = () => {
    highlighter(alignButtons, true);
    highlighter(spacingButtons, true);
    highlighter(formatButtons, false);
    highlighter(scriptButtons, true);
  };
  window.onload = initializer();
  const clickHandler = (e) => {
    isChanged((prev) => !prev);
  };

  return (
    <div className="container">
      <div id="text-input" contentEditable="true" onChange={clickHandler}></div>
      <div
        className="options"
        style={{ marginLeft: "1rem" }}
        onClick={clickHandler}
      >
        <button id="bold" className="option-button format">
          <i className="fa-solid fa-bold"></i>
        </button>
        <button id="italic" className="option-button format">
          <i className="fa-solid fa-italic"></i>
        </button>
        <button id="underline" className="option-button format">
          <i className="fa-solid fa-underline"></i>
        </button>
        <button id="strikethrough" className="option-button format">
          <i className="fa-solid fa-strikethrough"></i>
        </button>

        <button id="insertOrderedList" className="option-button">
          <div className="fa-solid fa-list-ol"></div>
        </button>
        <button id="insertUnorderedList" className="option-button">
          <i className="fa-solid fa-list"></i>
        </button>

        <button id="undo" className="option-button">
          <i className="fa-solid fa-rotate-left"></i>
        </button>
        <button id="redo" className="option-button">
          <i className="fa-solid fa-rotate-right"></i>
        </button>

        <button id="justifyLeft" className="option-button align">
          <i className="fa-solid fa-align-left"></i>
        </button>
        <button id="justifyCenter" className="option-button align">
          <i className="fa-solid fa-align-center"></i>
        </button>
        <button id="justifyRight" className="option-button align">
          <i className="fa-solid fa-align-right"></i>
        </button>
        <button id="justifyFull" className="option-button align">
          <i className="fa-solid fa-align-justify"></i>
        </button>

        <select id="formatBlock" className="adv-option-button">
          <option value="H1">H1</option>
          <option value="H2">H2</option>
          <option value="H3">H3</option>
          <option value="H4">H4</option>
          <option value="H5">H5</option>
          <option value="H6">H6</option>
        </select>
        <div className="input-wrapper">
          <input type="color" id="foreColor" className="adv-option-button" />
        </div>

        <select id="fontName" className="adv-option-button">
          <option value="Roboto">Roboto</option>
          <option value="cursive">cursive</option>
          <option value="Georgia">Georgia</option>
          <option value="Garamond">Garamond</option>
          <option value="Verdana">Verdana</option>
          <option value="Arial">Arial</option>
        </select>
        <select id="fontSize" className="adv-option-button">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3" selected>
            3
          </option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
      </div>
    </div>
  );
};

export default TextEditor;
