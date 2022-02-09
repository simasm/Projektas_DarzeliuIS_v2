const ChildInfoFormValidator = (
  e,
  setChildInfoWarning,
  childInfoWarning,
  setChildInfoValid,
  childInfoValid
) => {
  if (!e.target.value.match(/[0-9]{11}/)) {
    setChildInfoWarning({
      ...childInfoWarning,
      personalID: "blogas id",
    });
    setChildInfoValid({ ...childInfoValid, personalID: false });
  } else {
    setChildInfoWarning({ ...childInfoWarning, personalID: "" });
    setChildInfoValid({ ...childInfoValid, personalID: true });
  }
  return childInfoValid.personalID;
};
export default ChildInfoFormValidator;
