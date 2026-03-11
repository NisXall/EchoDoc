'use client';
import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';

interface FormData {
  pdfFile: File | null;
  coverImage: File | null;
  title: string;
  author: string;
  voice: string;
}

interface FormErrors {
  pdfFile?: string;
  title?: string;
  author?: string;
  voice?: string;
}

interface UploadingFile {
  name: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
}

const voiceOptions = [
  {
    id: 'dave',
    name: 'Dave',
    description: 'Young male, British, Crisp, energetic & conversational',
    type: 'male',
  },
  {
    id: 'daniel',
    name: 'Daniel',
    description: 'Middle-aged male, Aged, Sophisticated but warm',
    type: 'male',
  },
  {
    id: 'chris',
    name: 'Chris',
    description: 'Male, casual & very going',
    type: 'male',
  },
  {
    id: 'rachel',
    name: 'Rachel',
    description: 'Young female, American, calm & clear',
    type: 'female',
  },
  {
    id: 'sarah',
    name: 'Sarah',
    description: 'Young female, American, soft & approachable',
    type: 'female',
  },
];

const UploadForm = () => {
  const [formData, setFormData] = useState<FormData>({
    pdfFile: null,
    coverImage: null,
    title: '',
    author: '',
    voice: 'rachel', // Default to Rachel
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.pdfFile) {
      newErrors.pdfFile = 'PDF file is required';
    }
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.author.trim()) {
      newErrors.author = 'Author name is required';
    }
    if (!formData.voice) {
      newErrors.voice = 'Please select a voice';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid =
    formData.pdfFile &&
    formData.title.trim() &&
    formData.author.trim() &&
    formData.voice;

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 50 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          pdfFile: 'File size must be less than 50MB',
        }));
        return;
      }
      if (file.type !== 'application/pdf') {
        setErrors((prev) => ({
          ...prev,
          pdfFile: 'Please upload a PDF file',
        }));
        return;
      }
      setFormData((prev) => ({ ...prev, pdfFile: file }));
      setErrors((prev) => ({ ...prev, pdfFile: undefined }));
    }
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert('Cover image size must be less than 10MB');
        return;
      }
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      setFormData((prev) => ({ ...prev, coverImage: file }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handlePdfDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file?.type === 'application/pdf') {
      setFormData((prev) => ({ ...prev, pdfFile: file }));
      setErrors((prev) => ({ ...prev, pdfFile: undefined }));
    }
  };

  const handleCoverDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (file?.type.startsWith('image/')) {
      setFormData((prev) => ({ ...prev, coverImage: file }));
    }
  };

  const removePdf = () => {
    setFormData((prev) => ({ ...prev, pdfFile: null }));
    if (pdfInputRef.current) {
      pdfInputRef.current.value = '';
    }
  };

  const removeCover = () => {
    setFormData((prev) => ({ ...prev, coverImage: null }));
    if (coverInputRef.current) {
      coverInputRef.current.value = '';
    }
  };

  // Simulate file upload with progress
  const simulateUpload = (fileName: string): Promise<void> => {
    return new Promise((resolve) => {
      const fileUpload: UploadingFile = {
        name: fileName,
        progress: 0,
        status: 'uploading',
      };

      setUploadingFiles((prev) => [...prev, fileUpload]);

      const interval = setInterval(() => {
        setUploadingFiles((prev) =>
          prev.map((file) => {
            if (file.name === fileName) {
              const newProgress = Math.min(file.progress + Math.random() * 30, 90);
              return { ...file, progress: newProgress };
            }
            return file;
          })
        );
      }, 300);

      setTimeout(() => {
        clearInterval(interval);
        setUploadingFiles((prev) =>
          prev.map((file) =>
            file.name === fileName
              ? { ...file, progress: 100, status: 'completed' }
              : file
          )
        );
        setTimeout(() => resolve(), 500);
      }, 2000);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setUploadingFiles([]);

    try {
      // Simulate uploading PDF
      if (formData.pdfFile) {
        await simulateUpload(formData.pdfFile.name);
      }

      // Simulate uploading cover if provided
      if (formData.coverImage) {
        await simulateUpload(formData.coverImage.name);
      }

      // Here you would normally send the data to your backend
      console.log('Form submitted:', formData);

      // Show success
      alert('Book uploaded successfully!');

      // Reset form
      setFormData({
        pdfFile: null,
        coverImage: null,
        title: '',
        author: '',
        voice: 'rachel',
      });
      if (pdfInputRef.current) pdfInputRef.current.value = '';
      if (coverInputRef.current) coverInputRef.current.value = '';
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload book. Please try again.');
    } finally {
      setIsSubmitting(false);
      setUploadingFiles([]);
    }
  };

  return (
    <div className="new-book">
      <div className="new-book-wrapper">
        {/* Form Title */}
        <div className="text-center mb-8">
          <h1 className="page-title">Add a New Book</h1>
          <p className="page-description">
            Upload a PDF to generate your interactive interview
          </p>
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            0 of 1 book used <span className="text-[var(--color-brand)]">(Upgrade)</span>
          </p>
        </div>

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* PDF Upload */}
          <div>
            <label className="form-label">Book PDF File</label>
            <div
              className={`upload-dropzone ${
                formData.pdfFile ? 'upload-dropzone-uploaded' : ''
              } border-2 border-dashed border-[var(--border-subtle)]`}
              onDragOver={handleDragOver}
              onDrop={handlePdfDrop}
              onClick={() => pdfInputRef.current?.click()}
            >
              {formData.pdfFile ? (
                <div className="file-upload-shadow w-full">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Upload className="upload-dropzone-icon text-[var(--color-brand)]" />
                      <div className="text-left">
                        <p className="upload-dropzone-text">
                          {formData.pdfFile.name}
                        </p>
                        <p className="upload-dropzone-hint">
                          {(formData.pdfFile.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removePdf();
                      }}
                      className="upload-dropzone-remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="file-upload-shadow">
                  <Upload className="upload-dropzone-icon" />
                  <p className="upload-dropzone-text">Click to upload PDF</p>
                  <p className="upload-dropzone-hint">PDF file (max 50 MB)</p>
                </div>
              )}
              <input
                ref={pdfInputRef}
                type="file"
                accept=".pdf"
                onChange={handlePdfUpload}
                className="hidden"
              />
            </div>
            {errors.pdfFile && (
              <p className="text-red-500 text-sm mt-2">{errors.pdfFile}</p>
            )}
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="form-label">Cover Image (Optional)</label>
            <div
              className={`upload-dropzone ${
                formData.coverImage ? 'upload-dropzone-uploaded' : ''
              } border-2 border-dashed border-[var(--border-subtle)]`}
              onDragOver={handleDragOver}
              onDrop={handleCoverDrop}
              onClick={() => coverInputRef.current?.click()}
            >
              {formData.coverImage ? (
                <div className="file-upload-shadow w-full">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="upload-dropzone-icon text-[var(--color-brand)]" />
                      <div className="text-left">
                        <p className="upload-dropzone-text">
                          {formData.coverImage.name}
                        </p>
                        <p className="upload-dropzone-hint">
                          {(formData.coverImage.size / (1024 * 1024)).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCover();
                      }}
                      className="upload-dropzone-remove"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="file-upload-shadow">
                  <ImageIcon className="upload-dropzone-icon" />
                  <p className="upload-dropzone-text">Click to upload cover image</p>
                  <p className="upload-dropzone-hint">
                    Leave empty to auto-generate from PDF
                  </p>
                </div>
              )}
              <input
                ref={coverInputRef}
                type="file"
                accept="image/*"
                onChange={handleCoverUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* Title Input */}
          <div>
            <label className="form-label">Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="ex: Harry Potter"
              value={formData.title}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, title: e.target.value }));
                setErrors((prev) => ({ ...prev, title: undefined }));
              }}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-2">{errors.title}</p>
            )}
          </div>

          {/* Author Input */}
          <div>
            <label className="form-label">Author Name</label>
            <input
              type="text"
              className="form-input"
              placeholder="ex: J.K. Rowling"
              value={formData.author}
              onChange={(e) => {
                setFormData((prev) => ({ ...prev, author: e.target.value }));
                setErrors((prev) => ({ ...prev, author: undefined }));
              }}
            />
            {errors.author && (
              <p className="text-red-500 text-sm mt-2">{errors.author}</p>
            )}
          </div>

          {/* Voice Selector */}
          <div>
            <label className="form-label">Choose Assistant Voice</label>

            {/* Male Voices */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-3">
                Male Voices
              </h3>
              <div className="voice-selector-options grid grid-cols-1 sm:grid-cols-3 gap-3">
                {voiceOptions
                  .filter((v) => v.type === 'male')
                  .map((voice) => (
                    <label
                      key={voice.id}
                      className={`voice-selector-option cursor-pointer p-4 rounded-lg border-2 transition-all ${
                        formData.voice === voice.id
                          ? 'voice-selector-option-selected border-[var(--color-brand)] bg-[var(--accent-light)]'
                          : 'border-[var(--border-subtle)] hover:border-[var(--text-secondary)]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="voice"
                        value={voice.id}
                        checked={formData.voice === voice.id}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            voice: e.target.value,
                          }))
                        }
                        className="hidden"
                      />
                      <p className="font-semibold text-[var(--text-primary)] text-sm">
                        {voice.name}
                      </p>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">
                        {voice.description}
                      </p>
                    </label>
                  ))}
              </div>
            </div>

            {/* Female Voices */}
            <div>
              <h3 className="text-sm font-semibold text-[var(--text-secondary)] mb-3">
                Female Voices
              </h3>
              <div className="voice-selector-options grid grid-cols-1 sm:grid-cols-2 gap-3">
                {voiceOptions
                  .filter((v) => v.type === 'female')
                  .map((voice) => (
                    <label
                      key={voice.id}
                      className={`voice-selector-option cursor-pointer p-4 rounded-lg border-2 transition-all ${
                        formData.voice === voice.id
                          ? 'voice-selector-option-selected border-[var(--color-brand)] bg-[var(--accent-light)]'
                          : 'border-[var(--border-subtle)] hover:border-[var(--text-secondary)]'
                      }`}
                    >
                      <input
                        type="radio"
                        name="voice"
                        value={voice.id}
                        checked={formData.voice === voice.id}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            voice: e.target.value,
                          }))
                        }
                        className="hidden"
                      />
                      <p className="font-semibold text-[var(--text-primary)] text-sm">
                        {voice.name}
                      </p>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">
                        {voice.description}
                      </p>
                    </label>
                  ))}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="form-btn disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Processing...' : 'Begin Synthesis'}
          </button>
        </form>
      </div>

      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="loading-wrapper">
          <div className="loading-shadow-wrapper bg-white">
            <div className="loading-shadow bg-white">
              <div className="loading-animation">
                <svg
                  className="w-16 h-16 text-[var(--color-brand)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3v-6"
                  />
                </svg>
              </div>

              <h2 className="loading-title">Processing Your Book</h2>

              <div className="loading-progress">
                {uploadingFiles.map((file) => (
                  <div key={file.name} className="loading-progress-item">
                    <span className="text-xs text-[var(--text-secondary)]">
                      {file.name}
                    </span>
                    <div className="ml-auto flex items-center gap-2">
                      <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[var(--color-brand)] transition-all duration-300"
                          style={{ width: `${file.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-[var(--text-secondary)] w-8">
                        {Math.round(file.progress)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadForm;