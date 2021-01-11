import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import Input from '../UI/Input/Input';
import googleSignIn from '../../assets/google_signin_buttons/web/1x/btn_google_signin_dark_normal_web.png'
import LoginButton from '../UI/Buttons/Login/LoginButton';
import Login from '../../hoc/Layouts/Login/Login'
import * as classes from './UserAuth.module.css' 
import {signInFields, signUpFields} from '../UserAuth/authFields';
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/authActions'
// import validateEmails from '../../utils/validateEmails';

class UserAuth extends Component {
	state = {
		signIn: true,
	};

	

	componentDidMount(){
		console.log(this.props.auth.isAuthenticated);
		if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
	}
	componentDidUpdate(){
		console.log(this.props.auth.isAuthenticated);
		if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
	}

	signUpHandler = () => {
		const curMode = this.state.signIn;
		this.setState({ signIn: !curMode });
	};

	onSubmit=(values)=>{
		console.log(values);
		this.state.signIn
			? this.props.loginUser(values, this.props.history)
			: this.props.registerUser(values, this.props.history);
	}

	renderInput(authFields) {
		return authFields.map(({ label, name, type }) => {
			let error = null
			if(this.props.errors){
				error= this.props.errors[name] 
			}
			return (
				<Field
					key={name}
					component={Input}
					type={type}
					label={label}
					name={name}
					error={error}
				/>
			);
		});
	}

	render() {
		let btnText = 'Register';
		let authText = 'Already have an account?';
		let signInToggle = 'Sign Up';
		let authFields = signUpFields;
		if (this.state.signIn) {
			btnText = 'Sign In';
			authText = `Don't have an account?`;
			signInToggle = 'Sign Up';
			authFields = signInFields;
		}

		return (
			<Login>
				<div className={classes.authPage}>
					<form onSubmit={this.props.handleSubmit(this.onSubmit)}>
						{this.renderInput(authFields)}
						<p>Or continue with</p>
						<ul>
							<li>
								<a href='/auth/google'>
									<img src={googleSignIn} alt='Google SignIn' />
								</a>
							</li>
						</ul>
						<LoginButton type='submit'>{btnText}</LoginButton>
					</form>
					<p style={{ maginBottom: '32px' }}>
						{authText} <span onClick={this.signUpHandler} style={{color: '#8D2AB5'}}>{signInToggle}</span>
					</p>
				</div>
			</Login>
		);
	}
}

const mapStateToProps = ({auth, err}) => ({
	auth,
	errors: err
})

export default connect(mapStateToProps, actions)(reduxForm({
	form: 'authForm',
	destroyOnUnmount: false,
})(withRouter(UserAuth)));
