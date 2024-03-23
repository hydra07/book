import { useState } from 'react';

export default function useSelectContent() {
  const [selectedContent, setSelectedContent] = useState();

  const handleSelect = (content: string) => {
    console.log(content);
  };
  return {
    selectedContent,
    setSelectedContent,
    handleSelect,
  };
}
