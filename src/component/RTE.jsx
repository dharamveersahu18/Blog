import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="mt-6 rounded-2xl overflow-hidden border border-slate-700">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
     
        name={name || "content"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey="no-api-key"
            value={value}
            onEditorChange={onChange}
            init={{
              height: 500,
                skin: "oxide-dark",
    content_css: "dark",

    content_style: `
        body {    
            background:#020617;
            color:white;
        }
    `,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | bold italic underline | alignleft aligncenter alignright | bullist numlist | link image",
              content_style: `
                body {
                  background-color: #0f172a;
                  color: #e2e8f0;
                  font-family: Inter, sans-serif;
                  font-size: 16px;
                  padding: 15px;
                }

                p {
                  color: #e2e8f0;
                }
              `,
            }}
          />
        )}
      />
    </div>
  );
}
