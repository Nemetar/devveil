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

      const el = e.target;
      const componentName = el.getAttribute('hya-component-name');
      const vscodeUrl = el.getAttribute('hya-url');

      if (componentName && vscodeUrl) {
        el.classList.add('hya-highlighted');

        const tooltip = document.createElement('div');
        tooltip.classList.add('hya-tooltip');
        const link = document.createElement('a');
        link.href = vscodeUrl;
        link.textContent = \`\${componentName} [Open in VS Code]\`;
        link.addEventListener('click', (event) => {
          event.stopPropagation();
          const vsCodeUrl = encodeURIComponent(vscodeUrl);
          const command = \`vscode://file/\${vsCodeUrl}\`;
          const args = '';
          const remote = 'true';
          const url = \`vscode:\${command}?\${args}&remote=\${remote}\`;
          window.location.href = url;
        });
        tooltip.appendChild(link);
        el.appendChild(tooltip);

        // Positionner la popin en fonction de la position de la souris
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const tooltipHeight = tooltip.offsetHeight;
        const tooltipWidth = tooltip.offsetWidth;

        if (rect.top - tooltipHeight - 5 < 0) {
          // La popin dépasse du haut de la fenêtre
          tooltip.classList.add('bottom');
          tooltip.style.bottom = \`\${rect.bottom + 5}px\`;
        } else {
          // La popin est affichée au-dessus de l'élément
          tooltip.classList.add('top');
          tooltip.style.top = \`\${rect.top + 5}px\`;
        }

        if (rect.left - tooltipWidth - 5 < 0) {
          // La popin dépasse à gauche de la fenêtre
          tooltip.classList.add('right');
          tooltip.style.right = \`\${windowWidth - rect.right + 5}px\`;
        } else if (rect.right + tooltipWidth + 5 > windowWidth) {
          // La popin dépasse à droite de la fenêtre
          tooltip.classList.add('left');
          tooltip.style.left = \`\${rect.left - tooltipWidth - 5}px\`;
        } else {
          // La popin est centrée horizontalement par rapport à l'élément
          tooltip.style.left = \`\${rect.left + rect.width / 2 - tooltipWidth / 2}px\`;
        }

        const handleMouseOut = () => {
          setTimeout(() => {
            el.classList.remove('hya-highlighted');
            tooltip.remove();
            document.body.removeEventListener('mouseout', handleMouseOut);
          }, 1000000);
        };
        document.body.addEventListener('mouseout', handleMouseOut);
      }
    });
  });
`;
