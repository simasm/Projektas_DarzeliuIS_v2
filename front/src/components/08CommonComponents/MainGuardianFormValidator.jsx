//Validator for APPLICATION form main guardian inputs.

const MainGuardianFormValidator = (
  e,
  mainGuardianValid,
  mainGuardianInfoWarning
) => {
  switch (e.target.name) {
    case "name":
      if (!e.target.value.match(/^[A-ZĄČĘĖĮŠŲŪŽ]{1}[a-zA-Zą-ž\s\-']+$/)) {
        mainGuardianValid.name = false;

        mainGuardianInfoWarning.name = "Neteisingas vardo formatas";
      } else {
        mainGuardianValid.name = true;
        mainGuardianInfoWarning.name = "";
      }
      return mainGuardianValid.name;

    case "surname":
      if (!e.target.value.match(/^[A-ZĄČĘĖĮŠŲŪŽ]{1}[a-zA-Zą-ž\s\-']+$/)) {
        mainGuardianValid.surname = false;
        mainGuardianInfoWarning.surname = "Neteisingas pavardės formatas";
      } else {
        mainGuardianValid.surname = true;
        mainGuardianInfoWarning.surname = "";
      }
      return mainGuardianValid.surname;

    case "personalCode":
      if (!e.target.value.match(/[0-9]{11}/)) {
        mainGuardianValid.personalCode = false;
        mainGuardianInfoWarning.personalCode =
          "Neteisingas asmens kodo formatas";
      } else {
        mainGuardianValid.personalCode = true;
        mainGuardianInfoWarning.personalCode = "";
      }
      return mainGuardianValid.personalCode;

    case "phone":
      if (!e.target.value.match(/[+]{1}[370]{3}[0-9]{8}/)) {
        mainGuardianValid.phone = false;
        mainGuardianInfoWarning.phone = "Neteisingas telefono numerio formatas";
      } else {
        mainGuardianValid.phone = true;
        mainGuardianInfoWarning.phone = "";
      }
      return mainGuardianValid.phone;

    case "email":
      if (
        !e.target.value.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}/)
      ) {
        mainGuardianValid.email = false;
        mainGuardianInfoWarning.email = "Neteisingas el. pašto formatas";
      } else {
        mainGuardianValid.email = true;
        mainGuardianInfoWarning.email = "";
      }
      return mainGuardianValid.email;

    case "address":
      if (!e.target.value.match(/[\s\dA-zÀ-ž-.]{5,64}/)) {
        mainGuardianValid.address = false;
        mainGuardianInfoWarning.address = "Neteisingas adreso formatas";
      } else {
        mainGuardianValid.address = true;
        mainGuardianInfoWarning.address = "";
      }
      return mainGuardianValid.address;

    default:
      return mainGuardianValid({
        ...mainGuardianValid,
        [e.target.name]: true,
      });
  }
};
export default MainGuardianFormValidator;
