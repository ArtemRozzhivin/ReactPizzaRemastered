import React from 'react';
import cx from 'clsx';

type InputProps = {
  ref?: HTMLInputElement;
  className?: string;
  value?: string;
  type: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, placeholder, value, onChange }, ref) => {
    return (
      <input
        ref={ref}
        value={value}
        onChange={onChange}
        className={cx({}, className)}
        placeholder={placeholder}
      />
    );
  },
);

export default Input;
