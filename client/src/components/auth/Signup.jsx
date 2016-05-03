import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions';

const FIELDS = {
  email: {
    label: 'Email',
    type: 'email',
    error: 'an email'
  },
  password: {
    label: 'Password',
    type: 'password',
    error: 'a password'
  },
  passwordConfirm: {
    label: 'Confirm Password',
    type: 'password',
    error: 'a password confirmation'
  }
};


class Signup extends Component {
  handleFormSubmit(formProps) {
    this.props.signupUser(formProps);
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  renderField(fieldConfig, field) {
    const fieldHelper = this.props.fields[field];

    return (
      <fieldset key={_.uniqueId()} className="form-group">
        <label>{fieldConfig.label}:</label>
        <input type={fieldConfig.type} className="form-control" {...fieldHelper}  />
        {fieldHelper.touched && fieldHelper.error && <div className="error">{fieldHelper.error}</div>}
      </fieldset>
    )
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        {_.map(FIELDS, this.renderField.bind(this))}
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign Up!</button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  _.each(FIELDS, (type, field) => {
    if (!formProps[field]) {
      errors[field] = `Enter ${type.error}`;
    }
  });

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match!'
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  form: 'signup',
  fields: _.keys(FIELDS),
  validate
}, mapStateToProps, actions)(Signup);
