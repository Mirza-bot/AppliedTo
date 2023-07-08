import { useDocumentsStore } from "../../features/store/documents";
import { PDFViewer, Page } from "@react-pdf/renderer";
import { UserDocument } from "../../../shared/types";
import { useEffect, useState } from "react";

interface DocumentData {
  pdf: number[];
  name: string;
  id: string;
}

function DocumentsView() {
  const loadDocuments = useDocumentsStore((state) => state.load);

  const documentsData: UserDocument[] | null = useDocumentsStore(
    (state) => state.documents
  );
  const [document, setDocument] = useState<DocumentData>();

  useEffect(() => {
    const displayDocument = async () => {
      if (documentsData) {
        for (const document of documentsData) {
          setDocument({
            pdf: document.file.data,
            name: document.name,
            id: document.id,
          });
        }
      }
    };

    displayDocument();
  }, []);

  return (
    <div>
      <PDFViewer>
        <Page></Page>
      </PDFViewer>
    </div>
  );
}
export default DocumentsView;
