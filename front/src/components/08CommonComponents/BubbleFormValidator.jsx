const BubbleFormValidator = (
  e,
  setBubbleWarning,
  setBubbleValid,
  bubbleWarning,
  bubbleValid
) => {
  const targetName = e.target.name;

  switch (targetName) {
    case "objectInput":
      if (!e.target.value.match(/^[A-ZĄČĘĖĮŠŲŪŽ]{1}[a-zA-Zą-ž\s-']+$/)) {
        setBubbleWarning({
          ...bubbleWarning,
          [targetName]: "BLOGAS ADRESAS",
        });
        setBubbleValid({ ...bubbleValid, [targetName]: false });
      } else {
        setBubbleWarning({ ...bubbleWarning, [targetName]: "" });
        setBubbleValid({ ...bubbleValid, [targetName]: true });
      }
      return bubbleValid.name;

    case "objectInput":
      if (!e.target.value.match(/^[A-ZĄČĘĖĮŠŲŪŽ]{1}[a-zA-Zą-ž\s-']+$/)) {
        setBubbleWarning({
          ...bubbleWarning,
          [targetName]: "BLOGAS SPINDULYS",
        });
        setBubbleValid({ ...bubbleValid, [targetName]: false });
      } else {
        setBubbleWarning({ ...bubbleWarning, [targetName]: "" });
        setBubbleValid({ ...bubbleValid, [targetName]: true });
      }
      return bubbleValid.name;

    default:
      return setBubbleValid({ ...bubbleValid, [targetName]: true });
  }
};
export default BubbleFormValidator;
