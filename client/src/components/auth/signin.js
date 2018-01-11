import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import * as actions from '../../actions'

class SignIn extends Component {
  handleFormSubmit = ({email, password}) => {
    this.props.signinUser({ email, password }, this.props.history)
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  renderField(field) {
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;

    return (
      <div className={className}>
        <label>
          {field.label}
        </label>
        <input className="form-control" type={field.type} {...field.input} />
        <div className="text-help">
          {touched && error && <div className="error">{error}</div>}
        </div>
      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <Field label="Email:" name="email" type="text" component={this.renderField} />
        <Field label="Password:" name="password" type="password" component={this.renderField} />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    )
  }
}

function validate(values) {
    const errors = {}

    if (!values.email) {
      errors.email = 'Please enter an email';
    }

    if (!values.password) {
      errors.password = 'Please enter a password';
    }

    return errors
}


function mapStateToProps(state) {
  return { errorMessage: state.auth.error }
}

const form = reduxForm({ validate, form: 'signin' })(SignIn)

export default connect(mapStateToProps, actions)(form)
