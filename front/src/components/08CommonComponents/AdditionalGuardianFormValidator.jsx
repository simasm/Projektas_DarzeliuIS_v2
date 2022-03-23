//Validator for APPLICATION form additional guardian inputs.

const AdditionalGuardianFormValidator = (
  e,
  additionalGuardianValid,
  additionalGuardianInfoWarning
) => {
  switch (e.target.name) {
    case "name":
      if (!e.target.value.match(/^[A-ZĄČĘĖĮŠŲŪŽ]{1}[a-zA-Zą-ž\s\-']+$/)) {
        additionalGuardianValid.name = false;

        additionalGuardianInfoWarning.name = "Neteisingas vardo formatas";
      } else {
        additionalGuardianValid.name = true;
        additionalGuardianInfoWarning.name = "";
      }
      return additionalGuardianValid.name;

    case "surname":
      if (!e.target.value.match(/^[A-ZĄČĘĖĮŠŲŪŽ]{1}[a-zA-Zą-ž\s\-']+$/)) {
        additionalGuardianValid.surname = false;
        additionalGuardianInfoWarning.surname = "Neteisingas pavardės formatas";
      } else {
        additionalGuardianValid.surname = true;
        additionalGuardianInfoWarning.surname = "";
      }
      return additionalGuardianValid.surname;

    case "personalCode":
      if (!e.target.value.match(/[0-9]{11}/)) {
        additionalGuardianValid.personalCode = false;
        additionalGuardianInfoWarning.personalCode =
          "Neteisingas asmens kodo formatas";
      } else {
        additionalGuardianValid.personalCode = true;
        additionalGuardianInfoWarning.personalCode = "";
      }
      return additionalGuardianValid.personalCode;

    case "phone":
      if (!e.target.value.match(/[+]{1}[370]{3}[0-9]{8}/)) {
        additionalGuardianValid.phone = false;
        additionalGuardianInfoWarning.phone =
          "Neteisingas telefono numerio formatas";
      } else {
        additionalGuardianValid.phone = true;
        additionalGuardianInfoWarning.phone = "";
      }
      return additionalGuardianValid.phone;

    case "email":
      if (
        !e.target.value.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}/)
      ) {
        additionalGuardianValid.email = false;
        additionalGuardianInfoWarning.email = "Neteisingas el. pašto formatas";
      } else {
        additionalGuardianValid.email = true;
        additionalGuardianInfoWarning.email = "";
      }
      return additionalGuardianValid.email;

    case "address":
      if (!e.target.value.match(/[\s\dA-zÀ-ž-.]{5,64}/)) {
        additionalGuardianValid.address = false;
        additionalGuardianInfoWarning.address = "Neteisingas adreso formatas";
      } else {
        additionalGuardianValid.address = true;
        additionalGuardianInfoWarning.address = "";
      }
      return additionalGuardianValid.address;

    default:
      return additionalGuardianValid({
        ...additionalGuardianValid,
        [e.target.name]: true,
      });
  }
};
export default AdditionalGuardianFormValidator;
