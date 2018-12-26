import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addEducation } from "../../actions/profileActions";

class AddEducation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      school: "",
      degree: "",
      fieldofstudy: "",
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();
    const expData = {
      school: this.state.school,
      degree: this.state.degree,
      fieldofstudy: this.state.fieldofstudy,
      from: this.state.from,
      to: this.state.to,
      current: this.state.current,
      description: this.state.description
    };

    this.props.addEducation(expData, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <div className="add-education">
        <div className="container">
          <div className="col-md-8 m-auto">
            <Link to="/dashboard" className="btn btn-light">
              Go Back
            </Link>
            <h1 className="display-4 text-center">Add Education</h1>
            <p className="lead text-center">
              Add any school or teaching that you have attended in the past, or
              current
            </p>
            <small className="d-block pb-3">* = required fields</small>
          </div>
          <form onSubmit={this.onSubmit}>
            <TextFieldGroup
              placeholder="* School"
              name="school"
              value={this.state.school}
              onChange={this.onChange}
              error={errors.school}
              info="The name of the school studied at"
            />
            <TextFieldGroup
              placeholder="* Degree"
              name="degree"
              value={this.state.degree}
              onChange={this.onChange}
              error={errors.degree}
              info="Your degree for your area of study"
            />
            <TextFieldGroup
              placeholder="* Field of Study"
              name="fieldofstudy"
              value={this.state.fieldofstudy}
              onChange={this.onChange}
              error={errors.fieldofstudy}
              info="What your field of study was"
            />
            <h6>From Date</h6>
            <TextFieldGroup
              placeholder="from"
              name="from"
              type="date"
              value={this.state.from}
              onChange={this.onChange}
              error={errors.from}
              info="Date you started at this school"
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
              info="Date you ended study"
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
                Current Education
              </label>
            </div>
            <TextAreaFieldGroup
              placeholder="School Description"
              name="description"
              value={this.state.description}
              onChange={this.onChange}
              error={errors.description}
              info="Tell us about your school experience"
            />
            <input
              type="submit"
              value="Submit"
              className="btn btn-info btn-block mt-4"
            />
          </form>
        </div>
      </div>
    );
  }
}

AddEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addEducation }
)(withRouter(AddEducation));
