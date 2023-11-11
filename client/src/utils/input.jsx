const preventMinus = (e) => {
  if (e.code === "Minus") {
    e.preventDefault();
  }
};

const preventPasteNegative = (e) => {
  const clipboardData = e.clipboardData || window.clipboardData;
  const pastedData = parseFloat(clipboardData.getData("text"));

  if (pastedData < 0) {
    e.preventDefault();
  }
};

export { preventMinus, preventPasteNegative };
