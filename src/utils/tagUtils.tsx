function determineTextColorBasedOnBgColor(bgColor: string): string {
  var color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // HexToR
  var g = parseInt(color.substring(2, 4), 16); // HexToG
  var b = parseInt(color.substring(4, 6), 16); // HexToB
  return r * 0.299 + g * 0.587 + b * 0.114 > 186 ? "#000" : "#fff";
}

export { determineTextColorBasedOnBgColor };
