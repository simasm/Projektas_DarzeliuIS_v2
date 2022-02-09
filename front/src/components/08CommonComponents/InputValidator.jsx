function InputValidator(event) {
  const target = event.target;

  if (
    target.validity.valueMissing &&
    target.name !== "birthdate" &&
    target.name !== "phone"
  ) {
    target.setCustomValidity(target.placeholder + " yra privalomas laukelis");
  } else {
    if (target.name === "email") {
      if (target.validity.patternMismatch) {
        target.setCustomValidity("Neteisingas el. pašto formatas");
      } else {
        target.setCustomValidity("");
      }
    }
    // else if(target.id==="txtBirthdate") {
    //     if(target.validity.valueMissing) {
    //         target.setCustomValidity("Gimimo data yra privalomas laukelis")
    //     }
    //     else if(target.validity.patternMismatch) {
    //         target.setCustomValidity("Neteisingas gimimo datos formatas")
    //     }
    //     else if(target.validity.rangeOverflow) {
    //         target.setCustomValidity("Gimimo data negali būti ateityje")
    //     }
    //     else if(target.validity.rangeUnderflow) {
    //         target.setCustomValidity("Gimimo data negali būti ankstesnė nei 01.01.1900")
    //     }
    //     else {
    //         target.setCustomValidity("")
    //     }
    // }
    else if (
      target.name === "personalCode" ||
      target.name === "childPersonalCode"
    ) {
      if (target.validity.patternMismatch) {
        target.setCustomValidity(
          "Asmens koda sudaro 11 skaičių, įvesta skaičių: " +
            target.value.length
        );
      } else {
        target.setCustomValidity("");
      }
    } else if (target.name === "name" || target.name === "childName") {
      if (target.validity.patternMismatch) {
        target.setCustomValidity("Netinkamo formato vardas");
      } else {
        target.setCustomValidity("");
      }
    } else if (target.name === "surname" || target.name === "childSurname") {
      if (target.validity.patternMismatch) {
        target.setCustomValidity("Netinkamo formato pavardė");
      } else {
        target.setCustomValidity("");
      }
    } else if (target.name === "address") {
      target.setCustomValidity("");
    } else if (target.name === "phone") {
      if (target.validity.valueMissing) {
        target.setCustomValidity("Telefono numeris yra privalomas laukelis");
      } else {
        if (target.value.includes("+")) {
          if (target.validity.patternMismatch) {
            target.setCustomValidity(
              "Telefono numerį sudaro nuo 4 iki 19 skaičiai, įvesta skaičių: " +
                (0 + target.value.length - 1)
            );
          } else {
            target.setCustomValidity("");
          }
        } else {
          target.setCustomValidity("Formatas: +37000000000");
        }
      }
    } else if (
      target.id === "txtNewPassword" ||
      target.id === "txtNewPasswordRepeat"
    ) {
      if (target.validity.patternMismatch) {
        target.setCustomValidity(
          "Slaptažodis turi būti ne mažiau 8 simbolių ilgio, turėti bent vieną didžiąją ir mažąją raides ir bent vieną skaičių"
        );
      } else {
        target.setCustomValidity("");
      }
    } else if (target.id === "txtOldPassword") {
      target.setCustomValidity("");
    }
  }

  //###########################Compensation Application -> guardian form#######################################//

  const txtGuardianNameCompensationWarning = document.getElementById(
    "txtGuardianNameCompensationWarning"
  );
  const txtGuardianSurnameCompensationWarning = document.getElementById(
    "txtGuardianSurnameCompensationWarning"
  );
  const txtGuardianIdCompensationWarning = document.getElementById(
    "txtGuardianIdCompensationWarning"
  );
  const txtGuardianPhoneCompensationWarning = document.getElementById(
    "txtGuardianPhoneCompensationWarning"
  );
  const txtGuardianEmailCompensationWarning = document.getElementById(
    "txtGuardianEmailCompensationWarning"
  );
  const txtGuardianAddressCompensationWarning = document.getElementById(
    "txtGuardianAddressCompensationWarning"
  );

  if (
    target.validity.patternMismatch &&
    target.id === "txtGuardianNameCompensation"
  ) {
    txtGuardianNameCompensationWarning.textContent = "Netinkamo formato vardas";
  } else if (
    !target.validity.patternMismatch &&
    target.id === "txtGuardianNameCompensation"
  ) {
    txtGuardianNameCompensationWarning.textContent = "";
  }

  if (
    target.validity.patternMismatch &&
    target.id === "txtGuardianSurnameCompensation"
  ) {
    txtGuardianSurnameCompensationWarning.textContent =
      "Netinkamo formato pavardė";
  } else if (
    !target.validity.patternMismatch &&
    target.id === "txtGuardianSurnameCompensation"
  ) {
    txtGuardianSurnameCompensationWarning.textContent = "";
  }

  if (
    target.validity.patternMismatch &&
    target.id === "txtGuardianIdCompensation"
  ) {
    txtGuardianIdCompensationWarning.textContent =
      "Netinkamo formato asmens kodas";
  } else if (
    !target.validity.patternMismatch &&
    target.id === "txtGuardianIdCompensation"
  ) {
    txtGuardianIdCompensationWarning.textContent = "";
  }

  if (
    target.validity.patternMismatch &&
    target.id === "txtGuardianPhoneCompensation"
  ) {
    txtGuardianPhoneCompensationWarning.textContent =
      "Netinkamo formato tel. nr";
  } else if (
    !target.validity.patternMismatch &&
    target.id === "txtGuardianPhoneCompensation"
  ) {
    txtGuardianPhoneCompensationWarning.textContent = "";
  }

  if (
    target.validity.patternMismatch &&
    target.id === "txtGuardianEmailCompensation"
  ) {
    txtGuardianEmailCompensationWarning.textContent = "Netinkamo formato el. paštas";
  } else if (
    !target.validity.patternMismatch &&
    target.id === "txtGuardianEmailCompensation"
  ) {
    txtGuardianEmailCompensationWarning.textContent = "";
  }

  if (
    target.validity.patternMismatch &&
    target.id === "txtGuardianAddressCompensation"
  ) {
    txtGuardianAddressCompensationWarning.textContent =
      "Netinkamo formato adresas";
  } else if (
    !target.validity.patternMismatch &&
    target.id === "txtGuardianAddressCompensation"
  ) {
    txtGuardianAddressCompensationWarning.textContent = "";
  }

  //###########################Compensation Application -> kindergarten form#######################################//
  const txtKindergartenNameWarning = document.getElementById(
    "txtKindergartenNameWarning"
  );
  const txtKindergartenCodeWarning = document.getElementById(
    "txtKindergartenCodeWarning"
  );
  const txtKindergartenAddressWarning = document.getElementById(
    "txtKindergartenAddressWarning"
  );
  const txtKindergartenPhoneWarning = document.getElementById(
    "txtKindergartenPhoneWarning"
  );
  const txtKindergartenEmailWarning = document.getElementById(
    "txtKindergartenEmailWarning"
  );
  const txtKindergartenBankNameWarning = document.getElementById(
    "txtKindergartenBankNameWarning"
  );
  const txtKindergartenAccountNumberWarning = document.getElementById(
    "txtKindergartenAccountNumberWarning"
  );
  const txtKindergartenBankCodeWarning = document.getElementById(
    "txtKindergartenBankCodeWarning"
  );

  if (target.validity.patternMismatch && target.id === "txtKindergartenName") {
    txtKindergartenNameWarning.textContent = "Netinkamo formato pavadinimas";
  } else if (
    !target.validity.patternMismatch &&
    target.id === "txtKindergartenName"
  ) {
    txtKindergartenNameWarning.textContent = "";
  }

  if (target.validity.patternMismatch && target.id === "txtKindergartenCode") {
    txtKindergartenCodeWarning.textContent = "Netinkamo formato kodas";
  } else if (
    !target.validity.patternMismatch &&
    target.id === "txtKindergartenCode"
  ) {
    txtKindergartenCodeWarning.textContent = "";
  }

  if (
    target.validity.patternMismatch &&
    target.id === "txtKindergartenAddress"
  ) {
    txtKindergartenAddressWarning.textContent = "Netinkamo formato adresas";
  } else if (
    !target.validity.patternMismatch &&
    target.id === "txtKindergartenAddress"
  ) {
    txtKindergartenAddressWarning.textContent = "";
  }

  if (target.validity.patternMismatch && target.id === "txtKindergartenPhone") {
    txtKindergartenPhoneWarning.textContent = "Netinkamo formato tel. nr.";
  } else if (
    !target.validity.patternMismatch &&
    target.id === "txtKindergartenPhone"
  ) {
    txtKindergartenPhoneWarning.textContent = "";
  }

  if (target.validity.patternMismatch && target.id === "txtKindergartenEmail") {
    txtKindergartenEmailWarning.textContent = "Netinkamo formato el. paštas";
  } else if (
    !target.validity.patternMismatch &&
    target.id === "txtKindergartenEmail"
  ) {
    txtKindergartenEmailWarning.textContent = "";
  }

  if (
    target.validity.patternMismatch &&
    target.id === "txtKindergartenBankName"
  ) {
    txtKindergartenBankNameWarning.textContent =
      "Netinkamo formato banko pavadinimas";
  } else if (
    !target.validity.patternMismatch &&
    target.id === "txtKindergartenBankName"
  ) {
    txtKindergartenBankNameWarning.textContent = "";
  }

  if (
    target.validity.patternMismatch &&
    target.id === "txtKindergartenAccountNumber"
  ) {
    txtKindergartenAccountNumberWarning.textContent =
      "Netinkamo formato sąskaitos numeris";
  } else if (
    !target.validity.patternMismatch &&
    target.id === "txtKindergartenAccountNumber"
  ) {
    txtKindergartenAccountNumberWarning.textContent = "";
  }

  if (
    target.validity.patternMismatch &&
    target.id === "txtKindergartenBankCode"
  ) {
    txtKindergartenBankCodeWarning.textContent =
      "Netinkamo formato banko kodas";
  } else if (
    !target.validity.patternMismatch &&
    target.id === "txtKindergartenBankCode"
  ) {
    txtKindergartenBankCodeWarning.textContent = "";
  }

  //###########################Compensation Application -> childinfoform#######################################//
  const txtChildPersonalCodeCompensationWarning = document.getElementById(
    "txtChildPersonalCodeCompensationWarning"
  );

  if (
    target.validity.patternMismatch &&
    target.id === "txtChildPersonalCodeCompensation"
  ) {
    txtChildPersonalCodeCompensationWarning.textContent =
      "Netinkamo formato asmens kodas";
  } else if (
    !target.validity.patternMismatch &&
    target.id === "txtChildPersonalCodeCompensation"
  ) {
    txtChildPersonalCodeCompensationWarning.textContent = "";
  }
}

export default InputValidator;
