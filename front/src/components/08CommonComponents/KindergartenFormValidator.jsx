const KindergartenFormValidator = (
  e,
  setKindergartenWarning,
  kindergartenWarning,
  setKindergartenValid,
  kindergartenValid
) => {
  const targetName = e.target.name;

  switch (targetName) {
    case "name":
      if (!e.target.value.match(/^[A-ZĄ-Ž]{1}[\S\s]{1,64}$/)) {
        setKindergartenWarning({
          ...kindergartenWarning,
          [targetName]: "blogas pavadinimas",
        });
        setKindergartenValid({ ...kindergartenValid, [targetName]: false });
      } else {
        setKindergartenWarning({ ...kindergartenWarning, [targetName]: "" });
        setKindergartenValid({ ...kindergartenValid, [targetName]: true });
      }
      return kindergartenValid.name;

    case "code":
      if (!e.target.value.match(/[\d]{9}|[\d]{7}/)) {
        setKindergartenWarning({
          ...kindergartenWarning,
          [targetName]: "blogas darzelio kodas",
        });
        setKindergartenValid({ ...kindergartenValid, [targetName]: false });
      } else {
        setKindergartenWarning({ ...kindergartenWarning, [targetName]: "" });
        setKindergartenValid({ ...kindergartenValid, [targetName]: true });
      }
      return kindergartenValid.code;

    case "address":
      if (!e.target.value.match(/^[A-ZĄ-Ž]{1}[\S\s]{1,64}$/)) {
        setKindergartenWarning({
          ...kindergartenWarning,
          [targetName]: "blogas adresas",
        });
        setKindergartenValid({ ...kindergartenValid, [targetName]: false });
      } else {
        setKindergartenWarning({ ...kindergartenWarning, [targetName]: "" });
        setKindergartenValid({ ...kindergartenValid, [targetName]: true });
      }
      return kindergartenValid.address;

    case "phone":
      if (!e.target.value.match(/[+]{1}[0-9]{11}|[852]{3}[0-9]{6}/)) {
        setKindergartenWarning({
          ...kindergartenWarning,
          [targetName]: "blogas tel nr",
        });
        setKindergartenValid({ ...kindergartenValid, [targetName]: false });
      } else {
        setKindergartenWarning({ ...kindergartenWarning, [targetName]: "" });
        setKindergartenValid({ ...kindergartenValid, [targetName]: true });
      }
      return kindergartenValid.phone;

    case "email":
      if (
        !e.target.value.match(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}/)
      ) {
        setKindergartenWarning({
          ...kindergartenWarning,
          [targetName]: "blogas email",
        });
        setKindergartenValid({ ...kindergartenValid, [targetName]: false });
      } else {
        setKindergartenWarning({ ...kindergartenWarning, [targetName]: "" });
        setKindergartenValid({ ...kindergartenValid, [targetName]: true });
      }
      return kindergartenValid.email;

    case "bankName":
      if (!e.target.value.match(/^[A-Z]+[a-zA-Z\s]*$/)) {
        setKindergartenWarning({
          ...kindergartenWarning,
          [targetName]: "blogas banko pavadinimas",
        });
        setKindergartenValid({ ...kindergartenValid, [targetName]: false });
      } else {
        setKindergartenWarning({ ...kindergartenWarning, [targetName]: "" });
        setKindergartenValid({ ...kindergartenValid, [targetName]: true });
      }
      return kindergartenValid.bankName;

    case "accountNumber":
      if (!e.target.value.match(/^[A-Z]{2}[A-Z0-9]{14,32}$/)) {
        setKindergartenWarning({
          ...kindergartenWarning,
          [targetName]: "blogas saskaitos nr",
        });
        setKindergartenValid({ ...kindergartenValid, [targetName]: false });
      } else {
        setKindergartenWarning({ ...kindergartenWarning, [targetName]: "" });
        setKindergartenValid({ ...kindergartenValid, [targetName]: true });
      }
      return kindergartenValid.accountNumber;

    case "bankCode":
      if (!e.target.value.match(/[0-9]{5}/)) {
        setKindergartenWarning({
          ...kindergartenWarning,
          [targetName]: "blogas banko kodas",
        });
        setKindergartenValid({ ...kindergartenValid, [targetName]: false });
      } else {
        setKindergartenWarning({ ...kindergartenWarning, [targetName]: "" });
        setKindergartenValid({ ...kindergartenValid, [targetName]: true });
      }
      return kindergartenValid.bankCode;
    default:
      return setKindergartenValid({ ...kindergartenValid, [targetName]: true });
  }
};
export default KindergartenFormValidator;
