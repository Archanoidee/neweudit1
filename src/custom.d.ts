// custom.d.ts
declare namespace JSX {
    interface IntrinsicElements {
      'box-icon': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        type?: 'solid' | 'regular' | 'logos';
        name?: string;
        color?: string;
        size?: string;
        animation?: string; // Optional animation attribute
      };
    }
  }