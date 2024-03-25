export const css = `
.hya-switch-btn {
  position: fixed;
  top: 1rem;
  right: 1rem;
  color: #FFF;
  border: none;
  padding: 6px;
  background-color: red;
  border-radius: 4px;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  z-index: 1000;
}

.hya-switch-btn.activated {
  background-color: #22a559;
}

.hya-highlighted {
  border: 1px solid #22a55947 !important;
  border-radius: 6px;
  position: relative;
}

.hya-tooltip {
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #FFF;
  color: #000;
  border: 1px solid #22a55947;
  padding: 12px 12px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  z-index: 1000;
  box-shadow: #22a55919 0px 3px 8px;
}

.hya-tooltip a {
  color: #1E40AF;
  text-decoration: none;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.hya-tooltip div {
  display: flex;
  gap: 6px;
  justify-content: space-between;
}

.hya-tooltip div strong {
  color: #22a559;
  font-weight: 600;
}

.hya-tooltip div p {
  font-weight: 600;
}

.hya-tooltip a:hover {
  text-decoration: underline;
}
`
