function InputValidator(event) {
    const target = event.target;

    
    
        if (target.validity.valueMissing && target.name !== "birthdate" && target.name !== "phone") {
            target.setCustomValidity(target.placeholder + " yra privalomas laukelis")
        }
        else {
            if (target.name === "email") {
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
                target.setCustomValidity("");
            }
            else if (target.name === "phone") {
                if(target.validity.valueMissing) {
                    target.setCustomValidity("Telefono numeris yra privalomas laukelis")
                }
                else {
                    if(target.value.includes('+')) {
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
                if(target.validity.patternMismatch) {
                    target.setCustomValidity("Slaptažodis turi būti ne mažiau 8 simbolių ilgio, turėti bent vieną didžiąją ir mažąją raides ir bent vieną skaičių")
                }
                else {
                    target.setCustomValidity("");
                }
            }
            else if(target.id === "txtOldPassword") {
                target.setCustomValidity("");
            }
        }

        const txtGuardianNameWarning = document.getElementById('txtGuardianNameWarning')
        const txtGuardianSurnameWarning = document.getElementById('txtGuardianSurnameWarning')
        const txtGuardianIdWarning = document.getElementById('txtGuardianIdWarning')
        const txtGuardianPhoneWarning = document.getElementById('txtGuardianPhoneWarning')
        const txtGuardianEmailWarning = document.getElementById('txtGuardianEmailWarning')
        const txtGuardianAddressWarning = document.getElementById('txtGuardianAddressWarning')

       

        //###########################Compensation Application -> guardian form#######################################//
        if (target.validity.patternMismatch && target.id === 'txtGuardianName'){
            txtGuardianNameWarning.textContent = 'neteisingas vardas'
        } else {
            txtGuardianNameWarning.textContent = ''
        }

        if (target.validity.patternMismatch && target.id === 'txtGuardianSurname'){
            txtGuardianSurnameWarning.textContent = 'neteisinga pavarde'
        } else {
            txtGuardianSurnameWarning.textContent = ''
        }


        if (target.validity.patternMismatch && target.id === 'txtGuardianId'){
            txtGuardianIdWarning.textContent = 'neteisingas id'
        } else {
            txtGuardianIdWarning.textContent = ''
        }


        if (target.validity.patternMismatch && target.id === 'txtGuardianPhone'){
            txtGuardianPhoneWarning.textContent = 'neteisingas telefono numeris'
        } else {
            txtGuardianPhoneWarning.textContent = ''
        }


        if (target.validity.patternMismatch && target.id === 'txtGuardianEmail'){
            txtGuardianEmailWarning.textContent = 'neteisingas email'
        } else {
            txtGuardianEmailWarning.textContent = ''
        }


        if (target.validity.patternMismatch && target.id === 'txtGuardianAddress'){
            txtGuardianAddressWarning.textContent = 'neteisingas adresas'
        } else {
            txtGuardianAddressWarning.textContent = ''
        }
        //###########################Compensation Application -> kindergarten form#######################################//
        const txtKindergartenNameWarning = document.getElementById('txtKindergartenNameWarning')
        const txtKindergartenCodeWarning = document.getElementById('txtKindergartenCodeWarning')
        const txtKindergartenAddressWarning = document.getElementById('txtKindergartenAddressWarning')
        const txtKindergartenPhoneWarning = document.getElementById('txtKindergartenPhoneWarning')
        const txtKindergartenEmailWarning = document.getElementById('txtKindergartenEmailWarning')
        const txtKindergartenBankNameWarning = document.getElementById('txtKindergartenBankNameWarning')
        const txtKindergartenAccountNumberWarning = document.getElementById('txtKindergartenAccountNumberWarning')
        const txtKindergartenBankCodeWarning = document.getElementById('txtKindergartenBankCodeWarning')

        if (target.validity.patternMismatch){

            if(target.id === 'txtKindergartenName') {
                txtKindergartenNameWarning.textContent = 'neteisingas pavadinimas'
            } else {
                txtKindergartenNameWarning.textContent = ''
            }

         if (target.id === 'txtKindergartenCode'){

            txtKindergartenCodeWarning.textContent = 'neteisingas kodas'
        } else {
            txtKindergartenCodeWarning.textContent = ''
        
        }
        }



        // if (target.validity.patternMismatch && target.id === 'txtKindergartenName'){
        //     txtKindergartenNameWarning.textContent = 'neteisingas pavadinimas'
        // } else {
        //     txtKindergartenNameWarning.textContent = ''
        // }

        // if (target.validity.patternMismatch && target.id === 'txtKindergartenCode'){
        //     txtKindergartenCodeWarning.textContent = 'neteisingas kodas'
        // } else {
        //     txtKindergartenCodeWarning.textContent = ''
        // }

        // if (target.validity.patternMismatch && target.id === 'txtKindergartenAddress'){
        //     txtKindergartenAddressWarning.textContent = 'neteisingas adresas'
        // } else {
        //     txtKindergartenAddressWarning.textContent = ''
        // }

        // if (target.validity.patternMismatch && target.id === 'txtKindergartenPhone'){
        //     txtKindergartenPhoneWarning.textContent = 'neteisingas telefono numeris'
        // } else {
        //     txtKindergartenPhoneWarning.textContent = ''
        // }

        // if (target.validity.patternMismatch && target.id === 'txtKindergartenEmail'){
        //     txtKindergartenEmailWarning.textContent = 'neteisingas el. pastas'
        // } else {
        //     txtKindergartenEmailWarning.textContent = ''
        // }

        // if (target.validity.patternMismatch && target.id === 'txtKindergartenBankName'){
        //     txtKindergartenBankNameWarning.textContent = 'neteisingas banko pavadinimas'
        // } else {
        //     txtKindergartenBankNameWarning.textContent = ''
        // }

        // if (target.validity.patternMismatch && target.id === 'txtKindergartenAccountNumber'){
        //     txtKindergartenAccountNumberWarning.textContent = 'neteisingas saskaitos numeris'
        // } else {
        //     txtKindergartenAccountNumberWarning.textContent = ''
        // }

        // if (target.validity.patternMismatch && target.id === 'txtKindergartenBankCode'){
        //     txtKindergartenBankCodeWarning.textContent = 'neteisingas banko kodas'
        // } else {
        //     txtKindergartenBankCodeWarning.textContent = ''
        // }

}

export default InputValidator;