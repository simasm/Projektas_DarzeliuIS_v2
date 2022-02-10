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
      if (!e.target.value.match(/^[A-ZĄ-Ž]{1}[\w\sÀ-ž-][^%_0-9^$]+$/)) {
        setGuardianWarning({
          ...guardianWarning,
          [targetName]: "Neteisingas vardo formatas",
        });
        setGuardianValid({ ...guardianValid, [targetName]: false });
      } else {
        setGuardianWarning({ ...guardianWarning, [targetName]: "" });
        setGuardianValid({ ...guardianValid, [targetName]: true });
      }
      return guardianValid.name;

    case "surname":
      if (!e.target.value.match(/^[A-ZĄ-Ž]{1}[\w\sÀ-ž-][^%_0-9^$]+$/)) {
        setGuardianWarning({
          ...guardianWarning,
          [targetName]: "Neteisingas pavardės formatas",
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
          [targetName]: "Neteisingas asmens kodo formatas",
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
          [targetName]: "Neteisingas telefono numerio formatas",
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
          [targetName]: "Neteisingas el. pašto formatas",
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
          [targetName]: "Neteisingas adreso formatas",
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
