import { FC } from 'react';

import { SVGProps } from './svg.types';

const SuiLogo: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxHeight, maxWidth }}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <path
      d="M0 12C0 5.37258 5.37258 0 12 0C18.6274 0 24 5.37258 24 12C24 18.6274 18.6274 24 12 24C5.37258 24 0 18.6274 0 12Z"
      fill="#6FBCF0"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M7.46503 16.8932C8.41101 18.5234 10.1108 19.5 12.0028 19.5C13.8947 19.5 15.5945 18.5234 16.5405 16.8932C17.4865 15.2631 17.4865 13.3172 16.5405 11.687L12.5497 4.81392C12.3058 4.39536 11.6998 4.39536 11.4559 4.81392L7.46503 11.687C6.51166 13.3172 6.51166 15.2631 7.46503 16.8932ZM10.8794 8.08157L11.7293 6.61296C11.8476 6.40736 12.158 6.40736 12.2762 6.61296L15.5502 12.2524C16.1488 13.2878 16.2671 14.4847 15.8902 15.5862C15.8532 15.4099 15.7941 15.2263 15.7202 15.0428C15.2694 13.9046 14.2421 13.0308 12.6753 12.4433C11.5963 12.0395 10.909 11.4373 10.6355 10.6663C10.2808 9.66767 10.6577 8.5809 10.8794 8.08157ZM9.4235 10.5782L8.45535 12.2524C7.7163 13.5301 7.7163 15.0501 8.45535 16.3278C9.1944 17.6055 10.5247 18.3618 12.0028 18.3618C12.9857 18.3618 13.9021 18.024 14.6264 17.4293C14.7225 17.1943 15.0107 16.3351 14.6486 15.4466C14.316 14.6242 13.5178 13.9707 12.2688 13.5007C10.8646 12.972 9.94822 12.1423 9.54914 11.0408C9.49741 10.8866 9.46045 10.7324 9.4235 10.5782Z"
      fill="white"
    />
  </svg>
);

export default SuiLogo;
