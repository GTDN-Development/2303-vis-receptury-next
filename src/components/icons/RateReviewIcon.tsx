type Props = React.ComponentPropsWithRef<"svg"> & {
  size?: number;
  ariaHidden?: boolean;
  [key: string]: any;
};

export default function RateReviewIcon({
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
        d="M247.693-391.693h96.076l214.385-214.385q5.076-5.628 7.615-12.285 2.538-6.657 2.538-13.109 0-6.451-2.735-12.736-2.735-6.284-7.418-11.946l-45.385-45q-4.077-5.076-10.761-8.115-6.685-3.038-13.592-3.038-6.492 0-13.336 2.538-6.844 2.539-12.617 7.615l-214.77 215.385v95.076Zm284.923-239.538-45-45.385 45 45.385ZM283.384-427.384v-45l148.463-147.463 20.231 21.769 23.385 23.615-147.079 147.079h-45Zm168.694-170.694 23.385 23.615-43.616-45.384 20.231 21.769Zm-19.385 206.385h279.614v-51.998H484.692l-51.999 51.998ZM116.001-134.464v-645.227q0-27.008 18.65-45.658 18.65-18.65 45.658-18.65h599.382q27.008 0 45.658 18.65 18.65 18.65 18.65 45.658v455.382q0 27.008-18.65 45.658-18.65 18.65-45.658 18.65H241.539L116.001-134.464Zm104-177.536h559.69q4.616 0 8.463-3.846 3.846-3.847 3.846-8.463v-455.382q0-4.616-3.846-8.463-3.847-3.846-8.463-3.846H180.309q-4.616 0-8.463 3.846-3.846 3.847-3.846 8.463v520.076L220.001-312ZM168-312v-480V-312Z"
        fill="currentColor"
      />
    </svg>
  );
}