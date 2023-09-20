import { useEffect, useState } from 'react';

type hookProps = {
  inputRef: React.MutableRefObject<HTMLInputElement | null>;
  elementRendered: boolean;
};
/**
 * Used to automatically focus inputs that don't render on the initial page
 */
const useFocus = ({ inputRef, elementRendered }: hookProps): void => {
  const [shouldFocus, setShouldFocus] = useState(false);
  useEffect(() => {
    elementRendered && inputRef.current && shouldFocus && inputRef.current.focus();
    setShouldFocus(false);
  }, [elementRendered, shouldFocus, inputRef]);

  useEffect(() => {
    elementRendered && setShouldFocus(true);
  }, [elementRendered]);
};

export { useFocus };
