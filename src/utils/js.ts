export const js = `
document.addEventListener('DOMContentLoaded', () => {
  const switchBtn = document.createElement('button');
  switchBtn.innerText = 'Devveil';
  switchBtn.classList.add('hya-switch-btn');
  switchBtn.addEventListener('click', () => {
    document.body.classList.toggle('hya-enabled');
  });
  document.body.appendChild(switchBtn);

  document.body.addEventListener('mouseover', (e) => {
    if (!document.body.classList.contains('hya-enabled')) return;

    const el = e.target as HTMLElement;
    const componentName = el.getAttribute('hya-component-name');
    const vscodeUrl = el.getAttribute('hya-url');

    if (componentName && vscodeUrl) {
      el.classList.add('hya-highlighted');

      const tooltip = document.createElement('div');
      tooltip.classList.add('hya-tooltip');
      tooltip.innerText = \`\${componentName} \n [Open in VS Code](\${vscodeUrl})\`;
      el.appendChild(tooltip);

      const handleMouseOut = () => {
        el.classList.remove('hya-highlighted');
        tooltip.remove();
        document.body.removeEventListener('mouseout', handleMouseOut);
      };

      document.body.addEventListener('mouseout', handleMouseOut);
    }
  });
});
`;