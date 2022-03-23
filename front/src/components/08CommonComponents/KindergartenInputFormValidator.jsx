const KindergartenInputFormValidator = (e, infoValid, infoWarning) => {
  switch (e.target.name) {
    case "address":
      if (!e.target.value.match(/[A-ZĄ-Ž]{1}[\S\s]{1,64}$/)) {
        infoValid.address = false;

        infoWarning.address = "Neteisingas adreso formatas";
      } else {
        infoValid.address = true;
        infoWarning.address = "";
      }
      return infoValid.address;

    case "id":
      if (!e.target.value.match(/\d{9}/)) {
        infoValid.id = false;
        infoWarning.id = "Neteisingas įstaigos kodo formatas";
      } else {
        infoValid.id = true;
        infoWarning.id = "";
      }
      return infoValid.id;

    case "name":
      if (!e.target.value.match(/^[A-ZĄ-Ž]{1}[\S\s]{1,64}$/)) {
        infoValid.name = false;
        infoWarning.name = "Neteisingas vardo formatas";
      } else {
        infoValid.name = true;
        infoWarning.name = "";
      }
      return infoValid.name;

    case "directorName":
      if (!e.target.value.match(/^[A-ZĄČĘĖĮŠŲŪŽ]{1}[a-zA-Zą-ž\s\-']+$/)) {
        infoValid.directorName = false;
        infoWarning.directorName = "Neteisingas vardo formatas";
      } else {
        infoValid.directorName = true;
        infoWarning.directorName = "";
      }
      return infoValid.directorName;

    case "directorSurname":
      if (!e.target.value.match(/^[A-ZĄČĘĖĮŠŲŪŽ]{1}[a-zA-Zą-ž\s\-']+$/)) {
        infoValid.directorSurname = false;
        infoWarning.directorSurname = "Neteisingas pavardės formatas";
      } else {
        infoValid.directorSurname = true;
        infoWarning.directorSurname = "";
      }
      return infoValid.directorSurname;
  }
};
export default KindergartenInputFormValidator;
