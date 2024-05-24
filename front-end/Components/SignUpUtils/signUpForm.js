import { emailValidator } from "./emailValidator";
import { passwordValidator } from "./passwordValidator";
import { nameValidator } from "./nameValidator";

export function signUpForm(name, email, password, password2, team) {
  const signUpFormAuth = [
    nameValidator(name),
    emailValidator(email),
    passwordValidator(password),
    password === password2,
    team,
  ];
  let returnObj = {
    name: false,
    email: false,
    password: false,
    password2: false,
    check: true,
    team: false,
  };

  if (signUpFormAuth[0] === "valid name") returnObj.name = true;
  if (signUpFormAuth[1] === "valid email address") returnObj.email = true;
  if (signUpFormAuth[2] === "valid password") returnObj.password = true;
  if (signUpFormAuth[3] === true) returnObj.password2 = true;
  if (signUpFormAuth[4]) returnObj.team = true;
  return returnObj;
}
