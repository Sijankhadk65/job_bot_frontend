import { useState } from "react";

interface FileUploaderProps {
  label: string;
  onFilesChange: (files: File[]) => void;
}

const FileUploader = ({ label, onFilesChange }: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const selectedFiles = Array.from(e.target.files);
    const uniqueFiles = [...files, ...selectedFiles].filter(
      (file, index, self) =>
        index ===
        self.findIndex((f) => f.name === file.name && f.size === file.size)
    );

    setFiles(uniqueFiles);
    onFilesChange(uniqueFiles);
    e.target.value = ""; // allow selecting same file again
  };

  const handleRemove = (fileToRemove: File) => {
    const updated = files.filter((f) => f !== fileToRemove);
    setFiles(updated);
    onFilesChange(updated);
  };
  return (
    <div className="mb-6 border border-dashed border-gray-300 rounded-md p-4">
      <label
        htmlFor={label}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {label}
      </label>

      <label
        htmlFor={label}
        className="cursor-pointer text-sm text-gray-600 hover:text-black"
      >
        <input
          id={label}
          type="file"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="text-center">
          📎 Click to upload file(s)
          <div className="text-xs text-gray-500 mt-1">
            (PDF, DOCX, JPG, etc.)
          </div>
        </div>
      </label>

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex justify-between items-center bg-gray-100 px-3 py-2 rounded-md text-sm"
            >
              <span className="truncate">{file.name}</span>
              <button
                type="button"
                onClick={() => handleRemove(file)}
                className="text-red-500 text-xs hover:underline ml-2"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
