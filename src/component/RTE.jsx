import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div>
      {label && <label className="mb-2 block">{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { onChange, value } }) => (
          <Editor
            apiKey={import.meta.env.VITE_TINYMCE_API_KEY}
            value={value}
            onEditorChange={onChange}
            init={{
              height: 500,
              skin: "oxide-dark",
              content_css: "dark",

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
                  background-color: #020617;
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