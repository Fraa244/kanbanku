function baseProps({ size, ...rest }) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    ...rest,
  };
}

export function IconPlus({ size = 18, ...props }) {
  return (
    <svg {...baseProps({ size, ...props })}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

export function IconX({ size = 18, ...props }) {
  return (
    <svg {...baseProps({ size, ...props })}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

export function IconTrash({ size = 18, ...props }) {
  return (
    <svg {...baseProps({ size, ...props })}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
  );
}

export function IconPencil({ size = 18, ...props }) {
  return (
    <svg {...baseProps({ size, ...props })}>
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

export function IconSearch({ size = 18, ...props }) {
  return (
    <svg {...baseProps({ size, ...props })}>
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export function IconSun({ size = 18, ...props }) {
  return (
    <svg {...baseProps({ size, ...props })}>
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.2" y1="4.2" x2="5.6" y2="5.6" />
      <line x1="18.4" y1="18.4" x2="19.8" y2="19.8" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.2" y1="19.8" x2="5.6" y2="18.4" />
      <line x1="18.4" y1="5.6" x2="19.8" y2="4.2" />
    </svg>
  );
}

export function IconMoon({ size = 18, ...props }) {
  return (
    <svg {...baseProps({ size, ...props })}>
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z" />
    </svg>
  );
}

export function IconLogout({ size = 18, ...props }) {
  return (
    <svg {...baseProps({ size, ...props })}>
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

export function IconCheck({ size = 18, ...props }) {
  return (
    <svg {...baseProps({ size, ...props })}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export function IconChevronLeft({ size = 18, ...props }) {
  return (
    <svg {...baseProps({ size, ...props })}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

export function IconChevronRight({ size = 18, ...props }) {
  return (
    <svg {...baseProps({ size, ...props })}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export function IconDownload({ size = 18, ...props }) {
  return (
    <svg {...baseProps({ size, ...props })}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export function IconUpload({ size = 18, ...props }) {
  return (
    <svg {...baseProps({ size, ...props })}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

export function IconEye({ size = 18, ...props }) {
  return (
    <svg {...baseProps({ size, ...props })}>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function IconEyeOff({ size = 18, ...props }) {
  return (
    <svg {...baseProps({ size, ...props })}>
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a20.3 20.3 0 0 1 5.06-5.94" />
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a20.3 20.3 0 0 1-3.22 4.34" />
      <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export function IconCalendar({ size = 18, ...props }) {
  return (
    <svg {...baseProps({ size, ...props })}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

export function IconFlag({ size = 18, ...props }) {
  return (
    <svg {...baseProps({ size, ...props })}>
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1Z" />
      <line x1="4" y1="22" x2="4" y2="3" />
    </svg>
  );
}

export function IconChecklist({ size = 18, ...props }) {
  return (
    <svg {...baseProps({ size, ...props })}>
      <path d="m3 7 2 2 3-3" />
      <path d="m3 15 2 2 3-3" />
      <line x1="11" y1="8" x2="21" y2="8" />
      <line x1="11" y1="16" x2="21" y2="16" />
    </svg>
  );
}

export function IconWarning({ size = 18, ...props }) {
  return (
    <svg {...baseProps({ size, ...props })}>
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}
