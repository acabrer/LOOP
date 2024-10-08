import React from 'react';
import PropTypes from 'prop-types';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { cn } from '../../utils/classNames'; // Adjust the import path as needed

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;
const DialogPortal = DialogPrimitive.Portal;
const DialogClose = DialogPrimitive.Close;

const DialogOverlay = React.forwardRef(function DialogOverlay(props, ref) {
  const { className, ...otherProps } = props;
  return (
    <DialogPrimitive.Overlay
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "dialog-overlay", // Add this class
        className
      )}
      {...otherProps}
    />
  );
});

DialogOverlay.propTypes = {
  className: PropTypes.string
};

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = React.forwardRef(function DialogContent(props, ref) {
  const { className, children, ...otherProps } = props;
  
  return (
    <DialogPortal>
      <DialogOverlay className="dialog-overlay" />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "dialog-content",
          "fixed left-[50%] top-[50%] z-[2001] w-full max-w-lg translate-x-[-50%] translate-y-[-50%] rounded-md bg-background p-6 shadow-lg duration-200",
          "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]",
          className
        )}
        style={{
          backgroundColor: 'var(--surface-color)',
          color: 'var(--text-primary)',
          border: '1px solid var(--primary-color)',
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2001, // this is a hack to ensure the dialog is above the overlay should be in css styles file 
          visibility: 'visible',
          opacity: 1,
        }}
        {...otherProps}
      >
        {children}
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  );
});

DialogContent.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node
};

DialogContent.displayName = DialogPrimitive.Content.displayName;
function DialogHeader(props) {
  const { className, ...otherProps } = props;
  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 text-center sm:text-left",
        "dialog-header", // Add this class
        className
      )}
      {...otherProps}
    />
  );
}

DialogHeader.propTypes = {
  className: PropTypes.string
};

DialogHeader.displayName = "DialogHeader";

function DialogFooter(props) {
  const { className, ...otherProps } = props;
  return (
    <div
      className={cn(
        "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
      {...otherProps}
    />
  );
}

DialogFooter.propTypes = {
  className: PropTypes.string
};

DialogFooter.displayName = "DialogFooter";

const DialogTitle = React.forwardRef(function DialogTitle(props, ref) {
  const { className, ...otherProps } = props;
  return (
    <DialogPrimitive.Title
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        "dialog-title", // Add this class
        className
      )}
      {...otherProps}
    />
  );
});

DialogTitle.propTypes = {
  className: PropTypes.string
};

DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = React.forwardRef(function DialogDescription(props, ref) {
  const { className, ...otherProps } = props;
  return (
    <DialogPrimitive.Description
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...otherProps}
    />
  );
});

DialogDescription.propTypes = {
  className: PropTypes.string
};

DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogPortal,
  DialogOverlay,
  DialogClose,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
};