import { PropsWithChildren, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface Props {
  portalRoot?: HTMLElement;
}

export const Portal = (props: PropsWithChildren<Props>) => {
  const [portalRoot, setPortalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const defaultRoot = document.querySelector<HTMLElement>('#__portal');
    setPortalRoot(props.portalRoot ?? defaultRoot);
  }, [props.portalRoot]);

  if (!portalRoot) return null;

  return createPortal(props.children, portalRoot);
};
