export const css = `
.hya-switch-btn {
  position: fixed;
  top: 10px;
  right: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  z-index: 1000;
}

.hya-highlighted {
  border: 2px solid red !important;
  position: relative;
}

.hya-tooltip {
  position: absolute;
  background-color: white;
  color: black;
  border: 1px solid black;
  padding: 4px;
  top: -40px;
  left: 0;
  white-space: nowrap;
  z-index: 1000;
  font-size: 12px;
  pointer-events: none; /* to allow clicks on the link inside the tooltip */
}

.hya-tooltip a {
  color: #4CAF50;
  text-decoration: none;
}

.hya-tooltip a:hover {
  text-decoration: underline;
}

/* add some space at the top of the body to make room for the switch button */
body {
  padding-top: 30px;
}
`;