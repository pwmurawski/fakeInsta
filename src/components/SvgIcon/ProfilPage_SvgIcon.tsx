const defaultProps = {
  color: "#8e8e8e",
  width: "100%",
  height: "100%",
};

export function PostsSvg({
  color,
  width,
  height,
}: {
  color?: string;
  width?: string;
  height?: string;
}) {
  return (
    <svg
      aria-label=""
      className="_8-yf5 "
      color={color}
      fill={color}
      height={height}
      role="img"
      viewBox="0 0 24 24"
      width={width}
    >
      <rect
        fill="none"
        height="18"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        width="18"
        x="3"
        y="3"
      />
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="9.015"
        x2="9.015"
        y1="3"
        y2="21"
      />
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="14.985"
        x2="14.985"
        y1="3"
        y2="21"
      />
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="21"
        x2="3"
        y1="9.015"
        y2="9.015"
      />
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="21"
        x2="3"
        y1="14.985"
        y2="14.985"
      />
    </svg>
  );
}
PostsSvg.defaultProps = defaultProps;

export function SavedSvg({
  color,
  width,
  height,
}: {
  color?: string;
  width?: string;
  height?: string;
}) {
  return (
    <svg
      aria-label=""
      className="_8-yf5 "
      color={color}
      fill={color}
      height={height}
      role="img"
      viewBox="0 0 24 24"
      width={width}
    >
      <polygon
        fill="none"
        points="20 21 12 13.44 4 21 4 3 20 3 20 21"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
SavedSvg.defaultProps = defaultProps;

export function TaggedSvg({
  color,
  width,
  height,
}: {
  color?: string;
  width?: string;
  height?: string;
}) {
  return (
    <svg
      aria-label=""
      className="_8-yf5 "
      color={color}
      fill={color}
      height={height}
      role="img"
      viewBox="0 0 24 24"
      width={width}
    >
      <path
        d="M10.201 3.797L12 1.997l1.799 1.8a1.59 1.59 0 001.124.465h5.259A1.818 1.818 0 0122 6.08v14.104a1.818 1.818 0 01-1.818 1.818H3.818A1.818 1.818 0 012 20.184V6.08a1.818 1.818 0 011.818-1.818h5.26a1.59 1.59 0 001.123-.465z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M18.598 22.002V21.4a3.949 3.949 0 00-3.948-3.949H9.495A3.949 3.949 0 005.546 21.4v.603"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <circle
        cx="12.072"
        cy="11.075"
        fill="none"
        r="3.556"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}
TaggedSvg.defaultProps = defaultProps;
