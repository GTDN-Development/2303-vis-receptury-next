type Props = React.ComponentPropsWithRef<"svg"> & {
  size?: number;
  ariaHidden?: boolean;
  [key: string]: any;
};

export default function TuneIcon({
  size = 20,
  ariaHidden = true,
  ...props
}: Props) {
  return (
    <svg
      height={size}
      width={size}
      viewBox="0 -960 960 960"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={ariaHidden}
      {...props}
    >
      <path
        d="M466.001-154.001v-219.998h51.998v84h288v51.998h-288v84h-51.998Zm-312-84v-51.998h219.998v51.998H154.001Zm144-132v-84h-144v-51.998h144v-84h51.998v219.998h-51.998Zm144-84v-51.998h363.998v51.998H442.001Zm144-132v-219.998h51.998v84h168v51.998h-168v84h-51.998Zm-432-84v-51.998h363.998v51.998H154.001Z"
        fill="currentColor"
      />
    </svg>
  );
}
