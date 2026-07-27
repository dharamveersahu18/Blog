import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';

export default function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className='w-full'>
      {label && <label className='inline-block mb-1 pl-1'>{label}</label>}

      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Editor
            // 1. Setting this to 'no-api-key' triggers the free community edition
            apiKey='no-api-key' 
            value={value || defaultValue} 
            init={{
              height: 500,
              menubar: true,
              // 2. CRUCIAL: This flag tells TinyMCE 8 to bypass cloud validation checks completely
              license_key: 'gpl', 
              plugins: [
                // Core free plugins only
                'anchor', 'autolink', 'charmap', 'codesample', 'emoticons', 
                'link', 'lists', 'media', 'searchreplace', 'table', 
                'visualblocks', 'wordcount'
              ],
              toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}