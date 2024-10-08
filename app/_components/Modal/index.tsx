import React, { useEffect, useCallback } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  isClosable?: boolean;
};

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  isClosable = true,
}) => {
  // Handle body scroll lock when modal is open
  useEffect(() => {
    const handleBodyOverflow = () => {
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    handleBodyOverflow();
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle 'Escape' key to close the modal if closable
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isClosable) {
        onClose();
      }
    },
    [onClose, isClosable]
  );

  useEffect(() => {
    if (isOpen && isClosable) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown, isClosable]);

  // Prevent rendering if modal is not open
  if (!isOpen) return null;

  return (
    <div
      className='fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black bg-opacity-50 pb-[400px]'
      onClick={isClosable ? onClose : undefined}
      aria-modal='true'
      role='dialog'
    >
      <div
        className='relative m-[20px] w-full max-w-lg rounded-lg bg-white p-6 shadow-lg'
        onClick={(e) => e.stopPropagation()}
      >
        {isClosable && (
          <button
            className='absolute right-3 top-3 text-2xl font-bold text-gray-700 hover:text-gray-900 focus:outline-none'
            onClick={onClose}
            aria-label='Close modal'
          >
            &times;
          </button>
        )}
        {children}
      </div>
    </div>
  );
};

export default Modal;
