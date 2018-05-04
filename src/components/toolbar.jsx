import React from 'react';
import PropTypes from 'prop-types';

class Toolbar extends React.Component {
  handleDropdown(button, obj) {
    const dropdown = this.refs["dropdown-" + obj.id];
    if (dropdown.style.display != "block") {
      dropdown.style.display = "block";
      dropdown.style.left = (button.offsetLeft + parseInt(button.offsetWidth / 2) - parseInt(dropdown.offsetWidth / 2)) + "px";
      dropdown.style.top = button.offsetTop + button.offsetHeight + "px";

      const outsideClickListener = event => {
        dropdown.style.display = 'none'
        document.removeEventListener('click', outsideClickListener)
      }

      document.addEventListener('click', outsideClickListener)
    } else {
      dropdown.style.display = "none";
    }
  }

  render() {
    const buttons = this.props.toolbarButtons.
      filter((obj) => this.props.toolbarOptions.includes(obj.id)).
      map((obj, i) => {
        return (
          <button
            key={i}
            type="button"
            title={obj.tooltip}
            onClick={(event) => { obj.dropdownOptions ? this.handleDropdown(event.currentTarget, obj) : obj.callback()}}
            className={"react-md-toolbar-button" + (obj.dropdownOptions ? " react-md-toolbar-dropdown-button" : "")}>
            <svg className={`icon icon-${obj.icon}`}>
              <use xlinkHref={`#icon-${obj.icon}`}></use>
            </svg>
            {obj.dropdownOptions &&
                <span className="react-md-toolbar-caret"></span>
            }

          </button>
        )
      });

    const dropdowns = this.props.toolbarButtons.filter((obj) => obj.dropdownOptions).map((obj, i) => {
      const dropdownOptions = obj.dropdownOptions.map((opt, i) => {
        return (<li key={i} onClick={opt.onClick} className={"react-md-dropdown-option " + opt.className}>{opt.text}</li>)
      });
      return (
        <div key={i} ref={"dropdown-" + obj.id} className="react-md-dropdown">
          <ul>
            {dropdownOptions}
          </ul>
        </div>
      )
    });

    return (
      <nav className="react-md-toolbar">
        <div className="react-md-tab">
          <button
            type="button"
            className={this.props.isPreview ? "react-md-tablinks active" : "react-md-tablinks"}
            onClick={() => this.props.showMarkdown(false)}>Write</button>
          <button
            type="button"
            className={this.props.isPreview ? "react-md-tablinks" : "react-md-tablinks active"}
            onClick={() => this.props.showMarkdown(true)}>Preview</button>
        </div>
        {this.props.toolbarOptions.includes("preview-as-html") &&
          <span>
            <input
              name="Preview as HTML"
              type="checkbox"
              checked={this.props.asHTML}
              onChange={this.props.handleCheck} />
            <span className="react-md-toolbar-item">Preview as HTML</span>
          </span>
        }
        {this.props.isPreview && buttons}
        {this.props.isPreview && dropdowns}
      </nav>
    );
  }
};

Toolbar.propTypes = {
  showMarkdown: PropTypes.func.isRequired,
  handleCheck: PropTypes.func.isRequired,
  toolbarButtons: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string.isRequired,
      tooltip: PropTypes.string
    })
  ),
  asHTML: PropTypes.bool.isRequired,
  isPreview: PropTypes.bool.isRequired
};

export default Toolbar;
