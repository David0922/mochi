export interface Color {
  bg: {
    primary: string;
    secondary: string;
  };
  border: string;
  text: {
    primary: string;
    secondary: string;
    error: string;
  };
  event: {
    primary: {
      border: string;
      bg: string;
    };
    secondary: {
      border: string;
      bg: string;
    };
  };
}

export const dark: Color = {
  bg: {
    primary: 'bg-neutral-800',
    secondary: 'neutral-700',
  },
  border: 'border-neutral-700',
  text: {
    primary: 'text-neutral-200',
    secondary: 'text-cyan-300',
    error: '',
  },
  event: {
    primary: {
      border: 'border-cyan-600',
      bg: 'bg-cyan-900',
    },
    secondary: {
      border: 'border-red-600',
      bg: 'bg-red-600',
    },
  },
};

export interface Theme {
  color: Color;
}