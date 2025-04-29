import React, { useEffect, useState } from "react";
import TextEditor from "./TextEditor";
import FilterSelector from "./FilterSelector";
import axios from "axios";
import FileUploader from "./FileUploader";

interface Category {
  _id: string;
  category: string;
  codes: string[];
}

interface Region {
  _id: string;
  region: string;
}

const Form = () => {
  const steps = ["Sender Info", "Filters", "Content"];

  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [subject, setSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [locationFilters, setLocationFilters] = useState<string[]>([]);
  const [locationOptions, setLocationOptions] = useState<string[]>([]);
  const [categoriesFilters, setCategoriesFilters] = useState<string[]>([]);
  const [categoriesOptions, setCategoriesOptions] = useState<string[]>([]);
  const [attachments, setAttachments] = useState<File[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRequest = await axios.get(
          "http://127.0.0.1:8000/categories"
        );
        setCategoriesOptions(
          categoriesRequest.data.data.map(
            (category: Category) => category.category
          )
        );
      } catch (err) {
        console.error("Failed to load locations:", err);
      }
    };

    const fetchRegions = async () => {
      try {
        const regionsRequest = await axios.get("http://127.0.0.1:8000/regions");
        setLocationOptions(
          regionsRequest.data.data.map((region: Region) => region.region)
        );
      } catch (err) {
        console.error("Failed to load locations:", err);
      }
    };

    fetchCategories();
    fetchRegions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Sending http request");
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);
    formData.append("subject", subject);
    formData.append("body", emailBody);

    categoriesFilters.forEach((category) => {
      formData.append("categories", category);
    });

    locationFilters.forEach((region) => {
      formData.append("regions", region);
    });

    attachments.forEach((file) => {
      formData.append("attachments", file);
    });

    try {
      await axios.post("http://127.0.0.1:8000/send_emails", formData, {
        headers: {
          Authorization: "Bearer supersecrettoken123",
        },
      });
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto mt-12 px-4 space-y-6"
    >
      <div className="flex items-center justify-center gap-4 mb-8">
        {steps.map((label, index) => {
          const isActive = step === index + 1;
          const isComplete = step > index + 1;

          return (
            <div key={index} className="flex items-center gap-2">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all
            ${
              isComplete
                ? "bg-black text-white"
                : isActive
                ? "bg-gray-800 text-white"
                : "bg-gray-300 text-gray-700"
            }
          `}
              >
                {index + 1}
              </div>
              <span
                className={`text-sm transition-colors ${
                  isActive ? "text-black font-medium" : "text-gray-500"
                }`}
              >
                {label}
              </span>
              {index < steps.length - 1 && (
                <div className="w-6 h-[2px] bg-gray-300" />
              )}
            </div>
          );
        })}
      </div>
      {step === 1 && (
        <div className="space-y-4 border border-gray-200 rounded-md px-4 pt-2 pb-4 hover:border-gray-300 hover:shadow-md transition">
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border-b border-gray-300 focus:border-black focus:outline-none text-sm px-1 py-1 bg-transparent"
          />
          <input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border-b border-gray-300 focus:border-black focus:outline-none text-sm px-1 py-1 bg-transparent"
          />
        </div>
      )}

      {step === 2 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border border-gray-200 rounded-md px-4 pt-2 pb-4 hover:border-gray-300 hover:shadow-md transition">
          <FilterSelector
            options={locationOptions}
            filterList={locationFilters}
            setFilterList={setLocationFilters}
          />
          <FilterSelector
            options={categoriesOptions}
            filterList={categoriesFilters}
            setFilterList={setCategoriesFilters}
          />
        </div>
      )}

      {step === 3 && (
        <>
          <div className="border border-gray-200 rounded-md px-4 pt-2 pb-4 hover:border-gray-300 hover:shadow-md transition">
            <input
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full border-b border-gray-300 focus:border-black focus:outline-none text-sm px-1 py-1 bg-transparent"
            />
          </div>

          <TextEditor editorContent={emailBody} onChange={setEmailBody} />
          <FileUploader label="Attachments" onFilesChange={setAttachments} />
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-md text-sm"
          >
            Send Emails
          </button>
        </>
      )}

      <div className="flex justify-between">
        {step > 1 && (
          <button
            type="button"
            onClick={() => setStep(step - 1)}
            className="text-sm text-gray-600 hover:underline"
          >
            ← Back
          </button>
        )}
        {step < 3 ? (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            className="bg-black text-white px-4 py-2 rounded-md text-sm"
          >
            Next →
          </button>
        ) : (
          <div></div>
        )}
      </div>
    </form>
  );
};

export default Form;
