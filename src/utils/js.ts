export const js = `
document.addEventListener('DOMContentLoaded', () => {
  const elements = document.querySelectorAll('[hya-component-name]');

  elements.forEach(el => {
    const handleMouseOver = (e) => {
      const componentName = el.getAttribute('hya-component-name');
      const vscodeUrl = el.getAttribute('hya-url');

      el.classList.add('hya-highlighted');

      const tooltip = document.createElement('div');
      tooltip.classList.add('hya-tooltip');
      tooltip.innerText = \`\${componentName} \n [Open in VS Code](\${vscodeUrl})\`;
      el.appendChild(tooltip);
    };

    const handleMouseOut = () => {
      el.classList.remove('hya-highlighted');
      const tooltip = el.querySelector('.hya-tooltip');
      tooltip && el.removeChild(tooltip);
    };

    el.addEventListener('mouseover', handleMouseOver);
    el.addEventListener('mouseout', handleMouseOut);
  });
});
`;