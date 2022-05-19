import { ISvgProps } from "../../interfaces/interfaces";

const defaultProps = {
  color: "#262626",
  width: "18",
  height: "18",
};

export default function ExitSvg({ color, width, height }: ISvgProps) {
  return (
    <svg
      aria-label="Zamknij"
      className="_8-yf5 "
      color={color}
      fill={color}
      height={height}
      role="img"
      viewBox="0 0 24 24"
      width={width}
    >
      <polyline
        fill="none"
        points="20.643 3.357 12 12 3.353 20.647"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <line
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        x1="20.649"
        x2="3.354"
        y1="20.649"
        y2="3.354"
      />
    </svg>
  );
}

ExitSvg.defaultProps = defaultProps;
