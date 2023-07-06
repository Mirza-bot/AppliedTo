import { useDocumentsStore } from "../../features/store/documents";
import { useEffect } from "react";

function DocumentsView() {
  const loadDocuments = useDocumentsStore((state) => state.load);
  const documents = useDocumentsStore((state) => state.documents);

  useEffect(() => {
    loadDocuments();
  }, []);

  return <div>{documents}</div>;
}
export default DocumentsView;
