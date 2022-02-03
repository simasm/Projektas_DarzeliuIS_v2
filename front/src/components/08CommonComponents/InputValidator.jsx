function InputValidator(event) {
    const target = event.target;

    if (target.validity.valueMissing && target.name !== "birthdate" && target.name !== "phone") {
        target.setCustomValidity(target.placeholder + " yra privalomas laukelis")
    }
    else {
        if (target.name === "email" || target.name === "institutionEmail") {
            if (target.validity.patternMismatch) {
                target.setCustomValidity("Neteisingas el. pašto formatas")
            }
            else {
                target.setCustomValidity("")
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
        else if (target.name === "personalCode" || target.name === "childPersonalCode") {
            if (target.validity.patternMismatch) {
                target.setCustomValidity("Asmens koda sudaro 11 skaičių, įvesta skaičių: " + target.value.length)
            }
            else {
                target.setCustomValidity("")
            }
        }
        else if (target.name === "name" || target.name === "childName") {
            if (target.validity.patternMismatch) {
                target.setCustomValidity("Netinkamo formato vardas")
            }
            else {
                target.setCustomValidity("")
            }
        }
        else if (target.name === "surname" || target.name === "childSurname") {
            if (target.validity.patternMismatch) {
                target.setCustomValidity("Netinkamo formato pavardė")
            }
            else {
                target.setCustomValidity("")
            }
        }
        else if (target.name === "address") {
            if (target.validity.patternMismatch) {
                target.setCustomValidity("Netinkamo formato adresas.  Turi būti nuo 2 iki 64 simbolių, lietuviškos arba lotyniškos raidės. Galimi brūkšneliai, taškai bei tarpai")
            }
            else {
                target.setCustomValidity("")
            }
        }
        else if (target.name === "phone" || target.name === "institutionTelephone") {
            if (target.validity.valueMissing) {
                target.setCustomValidity("Telefono numeris yra privalomas laukelis")
            }
            else {
                if (target.value.includes('+')) {
                    if (target.validity.patternMismatch) {
                        target.setCustomValidity("Telefono numerį sudaro nuo 4 iki 19 skaičiai, įvesta skaičių: " + (0 + target.value.length - 1))
                    }
                    else {
                        target.setCustomValidity("");
                    }
                }
                else {
                    target.setCustomValidity('Formatas: +37000000000')
                }
            }
        }
        else if (target.id === "txtNewPassword" || target.id === "txtNewPasswordRepeat") {
            if (target.validity.patternMismatch) {
                target.setCustomValidity("Slaptažodis turi būti ne mažiau 8 simbolių ilgio, turėti bent vieną didžiąją ir mažąją raides ir bent vieną skaičių")
            }
            else {
                target.setCustomValidity("");
            }
        }
        else if (target.id === "txtOldPassword") {
            target.setCustomValidity("");
        }
        //Tomas Mockaitis tęsia kitų formų laukų validavimą:
        else if (target.name === "bankName") {
            if (target.validity.patternMismatch) {
                target.setCustomValidity("Neteisingai įvestas banko pavadinimas. Turi būti nuo 2 iki 32 simbolių ir lietuviškos arba lotyniškos raidės bei tarpai")
            }
            else {
                target.setCustomValidity("")
            }
        }
        else if (target.name === "institutionCode") {
            if (target.validity.patternMismatch) {
                target.setCustomValidity("Ugdymo įstaigos kodą sudaro 9 arba 7 skaitmenys. Įvesta skaičių: " + target.value.length)
            }
            else {
                target.setCustomValidity("")
            }
        }
        else if (target.name === "institutionAddress" || target.name === "institutionName") {
            if (target.validity.patternMismatch) {
                if (target.name === "institutionName") {
                    target.setCustomValidity("Neteisingai įvestas įstaigos pavadinimas. Turi būti nuo 2 iki 64 simbolių, lietuviškos arba lotyniškos raidės. Galimi brūkšneliai, taškai bei tarpai")
                }
                else if (target.name === "institutionAddress") {
                    target.setCustomValidity("Neteisingai įvestas adresas. Turi būti nuo 2 iki 64 simbolių, lietuviškos arba lotyniškos raidės. Galimi brūkšneliai, taškai bei tarpai")
                }
            }
            else {
                target.setCustomValidity("")
            }
        }
        else if (target.name === "accountNumber") {
            if (target.validity.patternMismatch) {
                target.setCustomValidity("Sąskaitos numeris tai tarptautinis IBAN formatio numeris nuo 20 iki 34 simbolių. Pirmi du simboliai būtinai didžiosios lotynų abėcėlės raidės, o toliau skaičiai. Įvesta simbolių: " + target.value.length)
            }
            else {
                target.setCustomValidity("")
            }
        }
        else if (target.name === "bankCode") {
            if (target.validity.patternMismatch) {
                target.setCustomValidity("Neteisingas banko kodas. Kodas turi būti iš 5 skaitmenų. Įvesta simbolių: " + target.value.length)
            }
            else {
                target.setCustomValidity("")
            }
        }
    }
}

export default InputValidator;