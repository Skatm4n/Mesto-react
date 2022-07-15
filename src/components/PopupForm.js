import React from "react";

function PopupForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen && 'popup_visible'}`}>
      <div className="popup__modal">
        <button
          onClick={props.onClose}
          className="popup__close-btn"
          type="button"
        />
        <h2 className="popup__title">{props.title}</h2>
        <form
          onSubmit={props.onSubmit}
          className="popup__form"
          autoComplete="off"
          name={`${props.name}-form`}
        >
          {props.children}

          <button
            type="submit"
            className="popup__form-btn"
          >
            {props.bText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupForm;
