import { FC } from 'react';

import { SVGProps } from './svg.types';

const TURBOS: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 16 23"
    fill="none"
    {...props}
  >
    <mask
      id="mask0_942_470"
      style={{ maskType: 'luminance' }}
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="16"
      height="23"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.2045 5.72727L8 0.75L1.88719 10.2444C1.01373 11.4705 0.5 12.9707 0.5 14.5909C0.5 18.733 3.8579 22.0909 8 22.0909C12.1421 22.0909 15.5 18.733 15.5 14.5909C15.5 12.6705 13.9432 11.1136 12.0227 11.1136C10.1023 11.1136 8.5455 12.6705 8.5455 14.5909C8.5455 16.5114 10.1023 18.0682 12.0227 18.0682C12.7823 18.0682 13.485 17.8246 14.057 17.4113C13.2566 18.3554 12.0619 18.9545 10.7273 18.9545C8.3173 18.9545 6.3636 17.0009 6.3636 14.5909C6.3636 13.8241 6.5614 13.1034 6.9088 12.4772L11.2045 5.72727Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0_942_470)">
      <path
        d="M-5.85059 2.79272L13.9722 -3.64453L21.6562 20.0043L1.83333 26.4416L-5.85059 2.79272Z"
        fill="url(#paint0_radial_942_470)"
      />
      <path
        d="M-0.179688 22.0164L0.416273 0.775391L15.9844 1.21008L15.3933 22.456L-0.179688 22.0164Z"
        fill="url(#paint1_radial_942_470)"
      />
      <path
        d="M21.1088 19.457L2.95173 27.6672L-5.30371 9.42507L12.8583 1.21484L21.1088 19.457Z"
        fill="url(#paint2_radial_942_470)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9628 10.7734C9.91906 10.8047 8.27246 12.4718 8.27246 14.5234C8.27246 16.5947 9.95076 18.2734 12.022 18.2734C14.0938 18.2734 15.7725 16.5947 15.7725 14.5234C15.7725 12.4718 14.1255 10.8047 12.0807 10.7734H11.9628Z"
        fill="#F41504"
      />
    </g>
    <defs>
      <radialGradient
        id="paint0_radial_942_470"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(1.74597 13.1892) rotate(-17.9956) scale(14.0177 15.092)"
      >
        <stop stopColor="#EDEBE0" />
        <stop offset="0.2117" stopColor="#EDEBE0" />
        <stop offset="0.2616" stopColor="#EAEBDC" />
        <stop offset="0.3099" stopColor="#E3EAD0" />
        <stop offset="0.3575" stopColor="#D6E9BD" />
        <stop offset="0.4048" stopColor="#C4E8A2" />
        <stop offset="0.4518" stopColor="#ACE67E" />
        <stop offset="0.4986" stopColor="#8FE353" />
        <stop offset="0.5444" stopColor="#6EE021" />
        <stop offset="0.5519" stopColor="#68E018" />
        <stop offset="0.5919" stopColor="#4AD255" />
        <stop offset="0.6458" stopColor="#23C0A1" />
        <stop offset="0.6844" stopColor="#0BB5D2" />
        <stop offset="0.7035" stopColor="#02B1E4" />
        <stop offset="0.8701" stopColor="#006CDA" />
        <stop offset="0.9542" stopColor="#2542B1" />
        <stop offset="1" stopColor="#35309F" />
      </radialGradient>
      <radialGradient
        id="paint1_radial_942_470"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(1.07529 20.5287) rotate(-88.3975) scale(15.7036 11.7152)"
      >
        <stop stopColor="#FFE004" />
        <stop offset="0.4087" stopColor="#FFE004" />
        <stop offset="0.4511" stopColor="#FEE320" />
        <stop offset="0.6311" stopColor="#FAEE93" />
        <stop offset="0.7108" stopColor="#F9F3C1" />
        <stop offset="0.9022" stopColor="#FDFCEE" stopOpacity="0.01" />
        <stop offset="1" stopColor="white" stopOpacity="0.01" />
      </radialGradient>
      <radialGradient
        id="paint2_radial_942_470"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(14.1362 18.4145) rotate(155.667) scale(14.3898 10.1542)"
      >
        <stop stopColor="#F51605" />
        <stop offset="0.316" stopColor="#F51605" />
        <stop offset="0.3514" stopColor="#F43005" />
        <stop offset="0.4578" stopColor="#F27A04" />
        <stop offset="0.5462" stopColor="#F0AF04" />
        <stop offset="0.612" stopColor="#EFD004" />
        <stop offset="0.648" stopColor="#EFDD04" />
        <stop offset="1" stopColor="#EFDD04" stopOpacity="0.01" />
      </radialGradient>
    </defs>
  </svg>
);

export default TURBOS;
