import { not } from 'ramda';
import { useId, useState } from 'react';

import useClickOutsideListenerRef from '../use-click-outside-listener-ref';

interface UseToggleOutsideProps {
  id?: string;
  onClose?: () => void;
  defaultValue?: boolean;
}

const useToggleOutside = ({
  onClose,
  defaultValue,
  id: inferredId,
}: UseToggleOutsideProps) => {
  const reactId = useId();
  const id = inferredId ?? reactId;

  const [state, setState] = useState(defaultValue ?? false);

  const toggle = () => setState(not);

  const close = (event: any) => {
    if (
      event?.path?.some((node: any) => node?.id == id) ||
      event?.composedPath()?.some((node: any) => node?.id == id)
    )
      return;

    setState(false);
    onClose?.();
  };

  const ref = useClickOutsideListenerRef<HTMLDivElement>(close);

  return {
    id,
    ref,
    state,
    toggle,
    setState,
  };
};

export default useToggleOutside;
