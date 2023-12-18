const randomInterval = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const PhoneVariants = {
  animate: {
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
  initial: {
    scale: 0,
  },
};

export const SpheresVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: [0, -2, 0],
    transition: {
      y: {
        repeat: Infinity,
        ease: 'easeOut',
        duration: randomInterval(1.5, 2.5),
      },
      opacity: {
        delay: 1,
      },
    },
    duration: 1,
  },
};

export const StarsVariants = {
  initial: {
    opacity: 0,
    y: 100,
  },
  animate: {
    opacity: 1,
    y: [0, -10, 0],
    transition: {
      y: {
        repeat: Infinity,
        ease: 'easeOut',
        duration: 2,
      },
      opacity: {
        delay: 1,
      },
    },
    duration: 1,
  },
};

export const CoinsVariants = [
  {
    initial: {
      scale: 0,
      y: 100,
    },
    animate: {
      scale: 1,
      y: [0, -6, 0],
      transition: {
        y: {
          repeat: Infinity,
          ease: 'easeOut',
          duration: randomInterval(1, 2),
        },
        scale: {
          delay: 1,
        },
      },
      duration: 1,
    },
  },
  {
    initial: {
      scale: 0,
      y: 100,
    },
    animate: {
      scale: 1,
      y: [0, -6, 0],
      transition: {
        y: {
          repeat: Infinity,
          ease: 'easeOut',
          duration: randomInterval(1, 2),
        },
        scale: {
          delay: 1,
        },
      },
      duration: 1,
    },
  },
  {
    initial: {
      scale: 0,
      y: 100,
    },
    animate: {
      scale: 1,
      y: [0, -6, 0],
      transition: {
        y: {
          repeat: Infinity,
          ease: 'easeOut',
          duration: randomInterval(1, 2),
        },
        scale: {
          delay: 1,
        },
      },
      duration: 1,
    },
  },
];
