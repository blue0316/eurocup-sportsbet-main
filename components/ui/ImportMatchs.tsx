import { useState } from "react";
import { useChainId } from "wagmi";

const ImportMatches = ({ onImport }: { onImport: () => void }) => {
  const [file, setFile] = useState<File | null>(null);
  const [base64File, setBase64File] = useState<string | null>(null);
  const [message, setMessage] = useState("");
  const chainId = useChainId();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      const reader = new FileReader();
      reader.onload = () => {
        setBase64File(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleImport = async () => {
    if (!file || !base64File) {
      setMessage("Please select a file.");
      return;
    }

    try {
      const response = await fetch("/api/importMatches", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ file: base64File, chainId: chainId }),
      });

      const data = await response.json();
      if (data.success) {
        setMessage("Matches imported successfully!");
        onImport();
      } else {
        setMessage(data.message || "Error importing matches.");
      }
    } catch (error) {
      setMessage("Error importing matches.");
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
      <h3 className="text-2xl font-bold mb-2">Import Matches</h3>
      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        className="mb-4"
      />
      <button
        onClick={handleImport}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Import
      </button>
      {message && <p className="mt-2 text-red-500">{message}</p>}
    </div>
  );
};

export default ImportMatches;
