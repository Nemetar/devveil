export const js = `
  document.addEventListener('DOMContentLoaded', () => {
    const switchBtn = document.createElement('button');
    let activated = false;
    switchBtn.innerText = 'Devveil';
    switchBtn.classList.add('hya-switch-btn');
    switchBtn.addEventListener('click', () => {
      activated = !activated;
      document.body.classList.toggle('hya-enabled');
      if (activated) {
          switchBtn.classList.add('activated');
        } else {
          switchBtn.classList.remove('activated');
        }
    });
    switchBtn.click();
    document.body.appendChild(switchBtn);

    document.body.addEventListener('mouseover', (e) => {
      if (!document.body.classList.contains('hya-enabled')) return;

      const el = e.target;
      const componentName = el.getAttribute('hya-component-name');
      const vscodeUrl = el.getAttribute('hya-url');

      if (componentName && vscodeUrl) {
        el.classList.add('hya-highlighted');

        const tooltip = document.createElement('div');
        tooltip.classList.add('hya-tooltip');
        const container = document.createElement('div');
        const title = document.createElement('p');
        const name = document.createElement('strong');
        const link = document.createElement('a');

        title.textContent = \`Component - \`;
        name.textContent = \` \${componentName}\`;
        link.href = vscodeUrl;
        link.textContent = \`[Open in VS Code]\`;
        link.addEventListener('click', (event) => {
          event.stopPropagation();
          const vsCodeUrl = encodeURIComponent(vscodeUrl);
          const command = \`vscode://file/\${vsCodeUrl}\`;
          const args = '';
          const remote = 'true';
          const url = \`vscode:\${command}?\${args}&remote=\${remote}\`;
          window.location.href = url;
        });
        container.appendChild(title);
        container.appendChild(name);
        tooltip.appendChild(container);
        tooltip.appendChild(link);
        el.appendChild(tooltip);
        const handleTooltipMouseLeave = () => {
          setTimeout(() => {
            el.classList.remove('hya-highlighted');
            tooltip.remove();
            tooltip.removeEventListener('mouseleave', handleTooltipMouseLeave);
          }, 200);
        };

        tooltip.addEventListener('mouseleave', handleTooltipMouseLeave);
      }
    });
  });
`;
