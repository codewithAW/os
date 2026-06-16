import{A as e}from"./vendor-Cadn7ow-.js";var t=e();function n({children:e,className:n=``,interactive:r=!1,elevated:i=!1}){return(0,t.jsx)(`div`,{className:`
        surface-card
        transition-interactive
        ${r?`hover:bg-[var(--surface-elevated)] hover:shadow-md cursor-pointer`:``}
        ${n}
      `,children:e})}function r({title:e,subtitle:n,action:r,children:i,className:a=``}){return(0,t.jsx)(`div`,{className:`px-6 py-4 border-b border-[var(--border)] ${a}`,children:i||(0,t.jsxs)(`div`,{className:`flex items-center justify-between gap-4`,children:[(0,t.jsxs)(`div`,{className:`flex-1 min-w-0`,children:[e&&(0,t.jsx)(`h3`,{className:`text-lg font-semibold text-primary truncate`,children:e}),n&&(0,t.jsx)(`p`,{className:`text-sm text-muted mt-1 truncate`,children:n})]}),r&&(0,t.jsx)(`div`,{className:`flex-shrink-0`,children:r})]})})}function i({children:e,className:n=``}){return(0,t.jsx)(`div`,{className:`px-6 py-4 ${n}`,children:e})}export{i as n,r,n as t};