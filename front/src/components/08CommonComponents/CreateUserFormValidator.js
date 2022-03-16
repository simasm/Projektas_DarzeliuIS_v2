
const CreateUserFormValidator = (
    e,
    formWarning,
    setFormWarning,


    formValid,
    setFormValid
) => {
    const targetName = e.target.name;

    

    switch (targetName) {
        case "name":
            if (!e.target.value.match(/^[A-ZĄČĘĖĮŠŲŪŽ]{1}[a-zA-Zą-ž\s-']+$/)) {
                setFormWarning({
                    ...formWarning,
                    [targetName]: "Neteisingas vardo formatas",
                });
                setFormValid({ ...formValid, [targetName]: false });
            } else {
                setFormWarning({ ...formWarning, [targetName]: "" });
                setFormValid({ ...formValid, [targetName]: true });
            }
            return formWarning.name;


        case "surname":
            if (!e.target.value.match(/^[A-ZĄČĘĖĮŠŲŪŽ]{1}[a-zA-Zą-ž\s-']+$/)) {
                setFormWarning({
                    ...formWarning,
                    [targetName]: "Neteisingas pavardės formatas",
                });
                setFormValid({ ...formValid, [targetName]: false });
            } else {
                setFormWarning({ ...formWarning, [targetName]: "" });
                setFormValid({ ...formValid, [targetName]: true });
            }
            return formWarning.surname;

        case "email":
            if (
                !e.target.value.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}/)
            ) {
                setFormWarning({
                    ...formWarning,
                    [targetName]: "Neteisingas el. pašto formatas",
                });
                setFormValid({ ...formValid, [targetName]: false });
            } else {
                setFormWarning({ ...formWarning, [targetName]: "" });
                setFormValid({ ...formValid, [targetName]: true });
            }
            return formWarning.email;


        case "newPassword":
            if ( e.target.validity.patternMismatch
            ) {
                setFormWarning({
                    ...formWarning,
                    [targetName]: "Neteisingas slaptažodžio formatas",
                });
                setFormValid({ ...formValid, [targetName]: false });
            } else {
                setFormWarning({ ...formWarning, [targetName]: "" });
                setFormValid({ ...formValid, [targetName]: true });
            }
            return formWarning.newPassword;    

            case "newPasswordRepeat":
                if ( e.target.validity.patternMismatch
                ) {
                    setFormWarning({
                        ...formWarning,
                        [targetName]: "Neteisingas slaptažodžio formatas",
                    });
                    setFormValid({ ...formValid, [targetName]: false });
                } else {
                    setFormWarning({ ...formWarning, [targetName]: "" });
                    setFormValid({ ...formValid, [targetName]: true });
                }
                return formWarning.newPasswordRepeat;    
    


        default:
            return setFormValid({ ...formValid, [targetName]: true });
    }

};
export default CreateUserFormValidator;
