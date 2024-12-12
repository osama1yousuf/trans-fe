import { useRouter } from "next/navigation";
import { useEffect } from "react";

const useHandleNavigation = (url) => {
  const router = useRouter();

  const handleBackAction = () => {
    if (window.confirm("Are you sure you want to leave this page?")) {
      // Navigate to the static page
      router.push(url);
    } else {
      // Prevent navigation by restoring the current path
      window.history.pushState(null, "", router.asPath);
    }
  };

  useEffect(() => {
    const handlePopState = (event) => {
      handleBackAction();
    };

    // Push a dummy state to ensure `popstate` triggers
    window.history.pushState(null, "", router.asPath);

    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);
};

export default useHandleNavigation;
