import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

const ScrollButton = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowScrollButton(true);
    } else {
      setShowScrollButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    showScrollButton && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-16 right-10 bg-green-500 hover:bg-green-600 text-white rounded-full h-12 w-12 flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 animate-fade-in"
        title="Back to Top"
        style={{
          opacity: showScrollButton ? 1 : 0,
          visibility: showScrollButton ? "visible" : "hidden",
        }}
      >
        <FontAwesomeIcon icon={faArrowUp} />
      </button>
    )
  );
};

export default ScrollButton;
