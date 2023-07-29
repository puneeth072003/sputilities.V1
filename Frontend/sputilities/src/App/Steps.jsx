import React from "react";

const step1 = `Click on the "Login" button in the top right corner of the webpage. You will be redirected to Spotify's login page. Enter your Spotify username and password to log in.`;
const step2 = `After logging in, you'll see a screen requesting your permission to authorize Sputilities to access some of your Spotify data. Read the permissions carefully and click "Agree" to authorize Sputilities.`;
const step3 = `Once you've authorized Sputilities, you'll be redirected back to the Sputilities website. Congratulations! You're now logged in and authorized to use Sputilities. You can now explore and use the features provided by Sputilities.`;
const Steps = () => {
  return (
    <div className="cont-app">
      <h2 className="head-steps">How to use sputilities?</h2>
      <div className="steps">
        <p className="step-dis">
          <h3 className="step-head">step 1</h3>
          {step1}
        </p>
        <p className="step-dis">
          <h3 className="step-head">step 2</h3>
          {step2}
        </p>
        <p className="step-dis">
          <h3 className="step-head">step 3</h3>
          {step3}
        </p>
      </div>
    </div>
  );
};

export { Steps };
