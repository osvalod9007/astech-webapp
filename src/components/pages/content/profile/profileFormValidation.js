import { validateEmail } from "../../../../helper/validators";

const profileFormValidation = (values) => {
  const errors = {};
  if (!values.first_name) {
    errors.first_name = "Please complete required fields.";
  }
  if (!values.last_name) {
    errors.last_name = "Please complete required fields.";
  }
  if (!values.email) {
    errors.email = "Please complete required fields.";
  }
  if (!values.phone_number) {
    errors.phone_number = "Please complete required fields.";
  }
  if (values.phone_number) {
    const numbers = values.phone_number
      .split(/-/)
      .join("")
      .split(/\s/)
      .join("");
    if (numbers.length !== 11) {
      errors.phone_number = "Invalid phone number.";
    }
  }
  if (values.email && !validateEmail(values.email)) {
    errors.email = "Please correct the email format.";
  }
  return errors;
};

export default profileFormValidation;
