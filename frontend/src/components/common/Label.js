import React from 'react';
import PropTypes from 'prop-types';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva } from 'class-variance-authority';
import { cn } from '../../utils/classNames'; // Adjust the import path as needed

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef(function Label(props, ref) {
  const { className, ...otherProps } = props;
  
  return (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      {...otherProps}
    />
  );
});

Label.propTypes = {
  className: PropTypes.string
};

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
