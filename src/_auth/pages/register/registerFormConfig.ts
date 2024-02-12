
export const handleRegisterConfig=(values)=>{


    const inputs=
    [
      {
        id: 1,
        name: "login",
        type: "text",
        placeholder: "Username",
        errorMessage: "Invalid Email",
        label: "Username",
        required: true,
        pattern: " /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+. [a-zA-Z]{2,4}$/",
        className:"signupPage-form",
   
      }, 
      {
        id: 2,
        name: "password",
        type: "password",
        placeholder: "Password",
        label: "Password",
        required: true,
        errorMessage:"Password should be at least 8 characters and contains atleast  1 uppercase 1 lowercase and 1 special character",
        pattern:
          "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$",
          className:"signupPage-form"
      },
      {
        id: 3,
        name: "confirmPassword",
        type: "password",
        label: "Confirm Password",
        placeholder: "Confirm Password",
        errorMessage: "Password doesnt match",
        required: true,
        pattern: values.password,
        className:"signupPage-form"
      },
      {
        id: 1,
        name: "email",
        type: "email",
        placeholder: "Email",
        errorMessage: "Invalid Email",
        label: "Email",
        required: true,
        pattern: " /^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+. [a-zA-Z]{2,4}$/",
        className:"signupPage-form"
      },
    ];


return inputs
}


