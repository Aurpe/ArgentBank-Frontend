import React from 'react';
import Button from '../common/Button';
import InputCheckbox from '../common/InputCheckbox';
import InputWrapper from '../common/InputWrapper';
import '../loginpage/LoginPage.scss'

const LoginPage = () => {
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        
        <form>
          <InputWrapper
            label="Username"
            id="username"
            type="text"
          />
          
          <InputWrapper
            label="Password"
            id="password"
            type="password"
          />
          
          <InputCheckbox
            id="remember-me"
            label="Remember me"
          />
          
          <Button 
            type="submit"
            className="sign-in-button"
          />
            
        </form>
      </section>
    </main>
  );
};

export default LoginPage;