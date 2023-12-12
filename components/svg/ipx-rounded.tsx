import { FC } from 'react';

import { SVGProps } from './svg.types';

const IPXRoundedSVG: FC<SVGProps> = ({ maxWidth, maxHeight, ...props }) => (
  <svg
    style={{ maxWidth, maxHeight }}
    viewBox="0 0 16 16"
    fill="none"
    {...props}
  >
    <rect width="16" height="16" rx="8" fill="url(#pattern0)" />
    <defs>
      <pattern
        id="pattern0"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0_2050_6740" transform="scale(0.0125)" />
      </pattern>
      <image
        id="image0_2050_6740"
        width="80"
        height="80"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAUhSURBVHgB7Z2xb9tGFMbfUXLdxq7BFHWKooMpIBmKDlaXzNbcAlGbtOhmey8Qe+oo6S+oA7RzlK0o0lQdOktZkyHyUASoA4gZuihBo6ROi1QSL/eOom3RlETxyBMVvx9gS5SOtPjxvbvvnqwTg7AUH5gAb+fByOYB2DowLra5JZ4x3QbMgrmC24M7HfHaO8CZ2Ob74PSaUPu4EfIgwCa2+OahBa/YDhiZTTgS641HCMpr4PQrQkx7XMPRAmLEGcsl0WIHzjIcynDnUmXU08ECYtR1M/X5S8uE4CLdnX4hKBqNU42/+jNP4vlgzBJdWF1q439qaIsibzwBkTgcgSTeeLxIlI7E5VjALw9KJF4IpIhLpaNN+VumbrYFRHj6vRymshuBXaMMxHQwJu2dG4FXHz0TPeRZMclx0YH+Yc6A4sMNEi8SJmSX84Y7tyUi4fSFgIyTgJHJrotBhK0BEQ3WP4+jMPV/kTHWhIDOeSCiwblpAKGEgWEIRDTEtI4iUBESUBESUBESUJEsaGTnMxOuXF4aeqzz0oHf7h1CtfEPTMPGJ+/AdXE8c2k4Bu7+8R+Uf/4bdKFVwHxuUZ64n6IQdd1ahN3q0zCHge+335cXIwj7SRd0kpoU3vnchK2Ndye229pYGSneLEhVH1i8vDyxzWZhssg6SZWA/v5sHtD6ipv2K0ia/db/oBOtAlbrL6DzrwNJgceu3T8EnWgVEC3L7s2niYiIx9y9+QTsdg90EquNwRHSD6btydTFKGwIr4YjrnVh+M+fPHnznBE4qKDPe+yzKrjf3u8deYFOkhfWCH/8VBsvIC4YXD3gEBP89sXAx1G0aSJvnM8rlP6SF2AcKP6v330Y6DkRdu0RxIWWFN4qrMgTCkPp6/eUfd7e9upI8eJGWx+IJxTmpNBQq4Apq9Mrah1ErNXxXS6ePKafCkF9XpLEKqDq6BrGSPsHimlR3d9PrAI2W8kaZSwUqJrxuH1irAJu/9gWJ5mcD8ORXAW8AJWYS12xCmi3u9Jm3JqytjcJ9H543Nq9lxAF7Fq8Y8RttGP1gZOofvsBbPpKVpj26OswMsL2oTjQXJflr5VTZhxN8vYPbdCF1oJqEFhk9QqtGCFhRKxXPpL7pIHU1I9QkDAeEKMuLeIhqSrAhfFwVFAdAxVUJ6CjoHp3QqEhbrQXVJP0iejzGm+ygDiNkl4sARFRvCR83iS0+sCT4HvB5rnM0GPo6dZ8vu75oSOjqnbfNdFod6zVhaE2s4g8j5kJGASKgx4vCDTcYX2iTuZm2EPvh5XqtDFXvgEr26r1wriZO+NlXViANJEqAcOMzmkz2+kSsD270TQqqUvhpIuycTPzcpYfryhbFm9v5q23TnnFtJEqHziP0P9IK0ICKkICKkICKoKf1nwMRDQ4tykCFcFPaz4DIhqMdSiFVeD8uSFXbyQiYrQM4KwJRER6+4boBUnAqBiZpgG9bJPSOBIduH2pYUAt1wHHuQXEdHBWwxvXBy4u7AExHU5GLkzrCvhTzhZpfAOIcDCoiMy13bsexZYJmf6DweLaxChwwe47F3Pe5vFUDvvChUxBaGoDEQyK56BGxwzPhTGVjcwXJGIAKF5GaDNIXY8RC3G3LOj265TOA7zI84mHBFdjMBJ/EXmOneWZh98Q4n0aJB4S4ssIMBq7ZaH1lbOzVChzvTEX9m6EcEctYRquHWyAA3lRhciLPS3AtQeZJ+q8LWI2qEJxIRbDFOV425RTW5yd4aAagtcJBeGVt4QYbgAAAABJRU5ErkJggg=="
      />
    </defs>
  </svg>
);

export default IPXRoundedSVG;
