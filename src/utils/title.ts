import { useEffect } from 'react';

const useTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} - Chem Tutor`;
  }, [title]);
};

export default useTitle;