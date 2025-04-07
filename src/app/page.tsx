"use client";

import { useState } from "react";

export default function Home() {
  const [formData, setFormData] = useState({
    email: "",
    appPassword: "",
    subject: "",
    body: "",
    cv: null as File | null,
    referenceLetter: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.appPassword); // backend expects `password`, not `appPassword`
    data.append("subject", formData.subject);
    data.append("body", formData.body);

    if (formData.cv) {
      data.append("cv", formData.cv, formData.cv.name);
    }

    if (formData.referenceLetter) {
      data.append("reference_letter", formData.referenceLetter, formData.referenceLetter.name);
    }

    try {
      const res = await fetch("http://localhost:8000/send-mails", {
        method: "POST",
        headers: {
          "Authorization": "Bearer supersecrettoken123", // like in your curl request
          // ❌ DO NOT set "Content-Type" here — let fetch set it with the proper boundary
        },
        body: data,
      });

      if (res.ok) {
        alert("Emails sent successfully!");
      } else {
        const errorText = await res.text();
        console.error("Server error:", errorText);
        alert("Server error: " + errorText);
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("Request failed: " + error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center">Bulk Email Sender</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Your Gmail Address"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />
          <input
            type="password"
            name="appPassword"
            placeholder="App Password"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />
          <input
            type="text"
            name="subject"
            placeholder="Email Subject"
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />
          <textarea
            name="body"
            placeholder="Email Body"
            rows={6}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={handleChange}
          />
          <div>
            <label className="block mb-1 font-medium">Upload CV (PDF)</label>
            <input
              type="file"
              name="cv"
              accept=".pdf"
              required
              onChange={handleFileChange}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Upload Reference Letter (PDF)</label>
            <input
              type="file"
              name="referenceLetter"
              accept=".pdf"
              required
              onChange={handleFileChange}
              className="w-full"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg"
          >
            Send Bulk Email
          </button>
        </form>
      </div>
    </div>
  );
}
