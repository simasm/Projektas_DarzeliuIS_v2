//Validator for APPLICATION form additional guardian inputs.

const UpdateProfileFormValidator = (e, infoValid, infoWarning) => {
  switch (e.target.name) {
    case "name":
      if (!e.target.value.match(/^[A-ZĄČĘĖĮŠŲŪŽ]{1}[a-zA-Zą-ž\s\-']+$/)) {
        infoValid.name = false;

        infoWarning.name = "Neteisingas vardo formatas";
      } else {
        infoValid.name = true;
        infoWarning.name = "";
      }
      return infoValid.name;

    case "surname":
      if (!e.target.value.match(/^[A-ZĄČĘĖĮŠŲŪŽ]{1}[a-zA-Zą-ž\s\-']+$/)) {
        infoValid.surname = false;
        infoWarning.surname = "Neteisingas pavardės formatas";
      } else {
        infoValid.surname = true;
        infoWarning.surname = "";
      }
      return infoValid.surname;

    case "personalCode":
      if (!e.target.value.match(/[0-9]{11}/)) {
        infoValid.personalCode = false;
        infoWarning.personalCode = "Neteisingas asmens kodo formatas";
      } else {
        infoValid.personalCode = true;
        infoWarning.personalCode = "";
      }
      return infoValid.personalCode;

    case "phone":
      if (!e.target.value.match(/[+]{1}[370]{3}[0-9]{8}/)) {
        infoValid.phone = false;
        infoWarning.phone = "Neteisingas telefono numerio formatas";
      } else {
        infoValid.phone = true;
        infoWarning.phone = "";
      }
      return infoValid.phone;

    case "email":
      if (
        !e.target.value.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}/)
      ) {
        infoValid.email = false;
        infoWarning.email = "Neteisingas el. pašto formatas";
      } else {
        infoValid.email = true;
        infoWarning.email = "";
      }
      return infoValid.email;

    case "address":
      if (!e.target.value.match(/[\s\dA-zÀ-ž-.]{5,64}/)) {
        infoValid.address = false;
        infoWarning.address = "Neteisingas adreso formatas";
      } else {
        infoValid.address = true;
        infoWarning.address = "";
      }
      return infoValid.address;

    case "city":
      if (!e.target.value.match(/^[A-ZĄČĘĖĮŠŲŪŽ]{1}[a-zA-Zą-ž\s\-']+$/)) {
        infoValid.city = false;
        infoWarning.city = "Neteisingas miesto formatas";
      } else {
        infoValid.city = true;
        infoWarning.city = "";
      }
      return infoValid.city;

    default:
      return infoValid({
        ...infoValid,
        [e.target.name]: true,
      });
  }
};
export default UpdateProfileFormValidator;
