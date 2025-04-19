import { useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(
  ref: React.RefObject<HTMLDivElement | null>,
  handleClickOutsideCallback: (event: MouseEvent) => void // Updated callback to accept event parameter
) {
  useEffect(() => {
    /**
     * Handle click outside of the element
     */
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handleClickOutsideCallback(event); // Pass the event to the callback
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, handleClickOutsideCallback]); // Added handleClickOutsideCallback to the dependency array
}

export default useOutsideAlerter;
