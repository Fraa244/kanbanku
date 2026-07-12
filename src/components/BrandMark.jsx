export default function BrandMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="3" y="18" width="6" height="11" rx="2" fill="var(--primary)" />
      <rect x="13" y="10" width="6" height="19" rx="2" fill="var(--secondary)" />
      <rect x="23" y="3" width="6" height="26" rx="2" fill="var(--signal)" />
    </svg>
  );
}
