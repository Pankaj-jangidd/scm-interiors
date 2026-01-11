import { ReactNode, useEffect, useState } from "react";
import "./pageTransition.css"; // ✅ We'll create this CSS next

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay for smoother fade-in
    const timeout = setTimeout(() => setIsVisible(true), 10);
    return () => {
      clearTimeout(timeout);
      setIsVisible(false);
    };
  }, []);

  return (
    <div className={`page-transition ${isVisible ? "fade-in" : "fade-out"}`}>
      {children}
    </div>
  );
};

export default PageTransition;
