export const css = `
  .hya-switch-btn {
    position: fixed;
    top: 1rem;
    right: 1rem;
    background-color: #1E40AF;
    color: #FFF;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: bold;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    z-index: 1000;
  }

  .hya-highlighted {
    border: 2px solid #FF6347 !important;
    position: relative;
  }

  .hya-tooltip {
    position: absolute;
    background-color: #FFF;
    color: #000;
    border: 1px solid #D1D5DB;
    padding: 8px 12px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    white-space: nowrap;
    z-index: 1000;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    pointer-events: none;
  }

  .hya-tooltip a {
    color: #1E40AF;
    text-decoration: none;
    font-weight: 500;
    display: flex;
    align-items: center;
  }

  .hya-tooltip a:hover {
    text-decoration: underline;
  }

  /* add some space at the top of the body to make room for the switch button */
  body {
    padding-top: 3rem;
  }
`;
