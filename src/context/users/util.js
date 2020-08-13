export const filterIsActive = (a) => a.is_active;

export const formatDate = (date) => new Date(date).toLocaleString("en-US");

export const hasNameAndLastName = (...nameLastName) => {
  return nameLastName.filter((a) => a).join(" ");
};
