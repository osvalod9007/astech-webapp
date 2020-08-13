import { validateEmail } from "../../../helper/validators";
import { fetchUsersAction } from "../../../context/users/userActions";

export const validateForm = async (values) => {
  let errors = {};
  const emails = Object.keys(values)
    .filter((k) => k.includes("email"))
    .map((a) => ({ [a]: values[a] }))
    .filter((el) => Object.values(el).some((el) => el));

  const roles = Object.keys(values)
    .filter((k) => k.includes("role"))
    .map((a) => ({ [a]: values[a] }));

  if (!emails.length) {
    errors["email-row-invitation-1"] = "Please enter email.";
  }
  if (emails.length) {
    if (!emails.some((email) => Object.values(email).some((value) => value))) {
      errors["email-row-invitation-1"] = "Please enter email.";
    } else {
      const result = await Promise.all(emails.map(async (email) => {
        const interErr = {};
        const [item] = Object.entries(email);
        const [key, value] = item;

        if (!validateEmail(value)) {
          interErr[key] = "Please correct the email format.";
        }

        const index= key.split("email")[1]       
        const role = roles.find(role => role[`role${index}`])

        if(!role){
          interErr[`role${index}`] = "Please select the role."
        }

        if(validateEmail(value)) {
          const response = await fetchUsersAction(JSON.stringify({search: value}));         
          if(response.results[0] && response.results[0].is_active){
            interErr[key] = 'exist';
          }
        }
        return interErr;
      }));
      
      errors = {...errors, ...result.reduce((a,b) => ({...a, ...b}), {})};
    }
  }

  if (!roles.length) {
    errors["rol-row-invitation-1"] = "Please select the role.";
  }

  return errors;
};

export const validateBulkForm = async values => {
  let errors = {};
  if(!values['email-row-invitation']) {
    errors["email-row-invitation"] = "Please enter email.";
  }
  if (values['email-row-invitation']) {
    const splitedInSemiColon = (values['email-row-invitation'] || '').split(';').map(email => email.trim()).filter(notEmpty => notEmpty)
    const result = await Promise.all(splitedInSemiColon.map(async (email) => {
      const interErr = {};

      if (!validateEmail(email)) {
        // interErr['email-row-invitation'] = "There is a email with a invalid format\nPlease change them to continue";
        interErr['email-row-invitation'] = "Please correct the email format";
      }

      if(validateEmail(email)) {
        const response = await fetchUsersAction(JSON.stringify({search: email}));         
        if(response.results[0] && response.results[0].is_active){
          interErr['email-row-invitation'] = 'exist';
        }
      }
      return interErr;
    }));
    
    errors = {...errors, ...result.reduce((a,b) => ({...a, ...b}), {})};
  }
  if(!values['role-row-invitation']) {
    errors["role-row-invitation"] = "Please select the role.";
  }
  return errors;
}
