import {
  useState,
  useEffect,
  MutableRefObject,
  Dispatch,
  SetStateAction,
  useRef,
} from 'react';

type HookReturnType = {
  menuRef: MutableRefObject<any>;
  anchorRef: MutableRefObject<any>;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
};

// 2 seters problem
// both handlers triggered on first click
const useDetectOutsideClick = (): HookReturnType => {
  const menuRef = useRef(null);
  // anchorRef is optional
  const anchorRef = useRef(null);
  // state and setter must be exposed outside of hook
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const onClick = (e) => {
      const isInsideAnchor =
        anchorRef.current !== null && anchorRef.current.contains(e.target);

      const isOutsideMenu =
        menuRef.current !== null && !menuRef.current.contains(e.target);

      if (!isInsideAnchor && isOutsideMenu) {
        setIsActive(false); // only closes
      }
    };

    // only if menu is open listen for clicks outside
    if (isActive) {
      window.addEventListener('click', onClick);
    }

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, [isActive, menuRef, anchorRef]);

  return { menuRef, anchorRef, isActive, setIsActive };
};

export default useDetectOutsideClick;
