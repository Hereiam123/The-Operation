import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class AddExperience extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: "",
      title: "",
      location: "",
      from: "",
      to: "",
      current: false,
      disabled: false,
      description: "",
      errors: {}
    };
  }

  onCheck = e => {
    const current = !this.state.current;
    this.setState({ disabled: current, current });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="add-experience">
        <div className="container">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Experience</h1>
            <p className="lead text-center">
              Add any job or position that you have had in the past, or current
            </p>
            <small className="d-block pb-3">* = required fields</small>
          </div>
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="* Company"
              name="company"
              value={this.state.company}
              onChange={this.onChange}
              error={errors.company}
              info="The name of the company you worked for"
            />
            <TextFieldGroup
              placeholder="* Job Title"
              name="title"
              value={this.state.title}
              onChange={this.onChange}
              error={errors.title}
              info="Your job title"
            />
            <TextFieldGroup
              placeholder="Location"
              name="location"
              value={this.state.location}
              onChange={this.onChange}
              error={errors.location}
              info="Where your job was located"
            />
            <h6>From Date</h6>
            <TextFieldGroup
              placeholder="from"
              name="location"
              type="date"
              value={this.state.from}
              onChange={this.onChange}
              error={errors.from}
              info="Date you started working"
            />
            <h6>To Date</h6>
            <TextFieldGroup
              placeholder="to"
              name="to"
              type="date"
              value={this.state.to}
              onChange={this.onChange}
              error={errors.to}
              disabled={this.state.disabled ? "disabled" : ""}
              info="Date you ended this position"
            />
            <div className="form-check mb-4">
              <input
                type="checkbox"
                className="form-check-input"
                name="current"
                value={this.state.current}
                checked={this.state.current}
                onChange={this.onCheck}
                id="current"
              />
              <label htmlFor="current" className="form-check-label">
                Current Job
              </label>
            </div>
            <TextAreaFieldGroup
              placeholder="Job Description"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
              errors={errors.description}
              info="Tell us about your role"
            />
          </form>
          <input type="submit" value="Submit" />
        </div>
      </div>
    );
  }
}

AddExperience.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps)(withRouter(AddExperience));
