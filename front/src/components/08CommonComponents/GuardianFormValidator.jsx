const GuardianFormValidator = (
  e,
  setGuardianWarning,
  setGuardianValid,
  guardianWarning,
  guardianValid
) => {
  const targetName = e.target.name;

  switch (targetName) {
    case "name":
      if (!e.target.value.match(/^[A-ZĄ-Ž]{1}[\w\sÀ-ž-]+$/)) {
        setGuardianWarning({
          ...guardianWarning,
          [targetName]: "blogas vardas",
        });
        setGuardianValid({ ...guardianValid, [targetName]: false });
      } else {
        setGuardianWarning({ ...guardianWarning, [targetName]: "" });
        setGuardianValid({ ...guardianValid, [targetName]: true });
      }
      return guardianValid.name;

    case "surname":
      if (!e.target.value.match(/^[A-ZĄ-Ž]{1}[\w\sÀ-ž-]+$/)) {
        setGuardianWarning({
          ...guardianWarning,
          [targetName]: "bloga pavarde",
        });
        setGuardianValid({ ...guardianValid, [targetName]: false });
      } else {
        setGuardianWarning({ ...guardianWarning, [targetName]: "" });
        setGuardianValid({ ...guardianValid, [targetName]: true });
      }
      return guardianValid.surname;

    case "personalCode":
      if (!e.target.value.match(/[0-9]{11}/)) {
        setGuardianWarning({
          ...guardianWarning,
          [targetName]: "blogas asmens kodas",
        });
        setGuardianValid({ ...guardianValid, [targetName]: false });
      } else {
        setGuardianWarning({ ...guardianWarning, [targetName]: "" });
        setGuardianValid({ ...guardianValid, [targetName]: true });
      }
      return guardianValid.personalCode;

    case "phone":
      if (!e.target.value.match(/[+]{1}[0-9]{11}|[852]{3}[0-9]{6}/)) {
        setGuardianWarning({
          ...guardianWarning,
          [targetName]: "blogas tel nr",
        });
        setGuardianValid({ ...guardianValid, [targetName]: false });
      } else {
        setGuardianWarning({ ...guardianWarning, [targetName]: "" });
        setGuardianValid({ ...guardianValid, [targetName]: true });
      }
      return guardianValid.phone;

    case "email":
      if (
        !e.target.value.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}/)
      ) {
        setGuardianWarning({
          ...guardianWarning,
          [targetName]: "blogas email",
        });
        setGuardianValid({ ...guardianValid, [targetName]: false });
      } else {
        setGuardianWarning({ ...guardianWarning, [targetName]: "" });
        setGuardianValid({ ...guardianValid, [targetName]: true });
      }
      return guardianValid.email;

    case "address":
      if (!e.target.value.match(/[\s\dA-zÀ-ž-.]{5,64}/)) {
        setGuardianWarning({
          ...guardianWarning,
          [targetName]: "blogas adresas",
        });
        setGuardianValid({ ...guardianValid, [targetName]: false });
      } else {
        setGuardianWarning({ ...guardianWarning, [targetName]: "" });
        setGuardianValid({ ...guardianValid, [targetName]: true });
      }
      return guardianValid.address;

    default:
      return setGuardianValid({ ...guardianValid, [targetName]: true });
  }
};
export default GuardianFormValidator;
