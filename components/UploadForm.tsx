"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Upload, Image, X, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

// Validation schema with Zod
const uploadFormSchema = z.object({
  pdfFile: z
    .instanceof(File)
    .refine(
      (file) => file.size <= 50 * 1024 * 1024,
      "PDF file must be 50MB or less",
    ),
  coverImage: z.instanceof(File).optional(),
  title: z
    .string()
    .min(1, "Title is required")
    .max(200, "Title must be 200 characters or less"),
  author: z
    .string()
    .min(1, "Author name is required")
    .max(100, "Author name must be 100 characters or less"),
  voiceId: z.enum(["dave", "daniel", "chris", "rachel", "sarah"], {
    errorMap: () => ({ message: "Please select a voice" }),
  }),
});

type UploadFormValues = z.infer<typeof uploadFormSchema>;

const MALE_VOICES = [
  { id: "dave", name: "Dave", description: "Young male, British-Essex" },
  { id: "daniel", name: "Daniel", description: "Middle-aged male, British-Essex" },
  { id: "chris", name: "Chris", description: "Male, casual & easy-going" },
];

const FEMALE_VOICES = [
  {
    id: "rachel",
    name: "Rachel",
    description: "Young female, American, calm & clear",
  },
  {
    id: "sarah",
    name: "Sarah",
    description: "Young female, American, soft & approachable",
  },
];

interface FileUploadFieldProps {
  label: string;
  hint: string;
  icon: React.ReactNode;
  file: File | null;
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  accept: string;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  label,
  hint,
  icon,
  file,
  onFileSelect,
  onFileRemove,
  accept,
}) => {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="form-label">{label}</label>

      {!file ? (
        <label
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`upload-dropzone ${file ? "upload-dropzone-uploaded" : ""}`}
        >
          <input
            type="file"
            accept={accept}
            onChange={handleChange}
            className="hidden"
          />
          <div className="upload-dropzone-icon">{icon}</div>
          <p className="upload-dropzone-text">Click to upload PDF</p>
          <p className="upload-dropzone-hint">{hint}</p>
        </label>
      ) : (
        <div className="upload-dropzone upload-dropzone-uploaded">
          <div className="flex items-center justify-between w-full px-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="upload-dropzone-icon">{icon}</div>
              <div>
                <p className="upload-dropzone-text text-left">{file.name}</p>
                <p className="upload-dropzone-hint text-left">
                  {(file.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onFileRemove}
              className="upload-dropzone-remove"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const UploadForm = () => {
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<UploadFormValues>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
      voiceId: "rachel",
    },
  });

  const selectedVoiceId = watch("voiceId");

  const onSubmit = async (data: UploadFormValues) => {
    try {
      setIsSubmitting(true);
      // TODO: Handle form submission
      console.log("Form submitted:", data);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="new-book-wrapper">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* PDF File Upload */}
        <FileUploadField
          label="Book PDF File"
          hint="PDF file (max 50MB)"
          icon={<Upload size={48} />}
          file={pdfFile}
          onFileSelect={(file) => {
            setPdfFile(file);
            setValue("pdfFile", file);
          }}
          onFileRemove={() => {
            setPdfFile(null);
            setValue("pdfFile", undefined as any);
          }}
          accept=".pdf"
        />

        {/* Cover Image Upload */}
        <FileUploadField
          label="Cover Image (Optional)"
          hint="Leave empty to auto-generate from PDF"
          icon={<Image size={48} />}
          file={coverImageFile}
          onFileSelect={(file) => {
            setCoverImageFile(file);
            setValue("coverImage", file);
          }}
          onFileRemove={() => {
            setCoverImageFile(null);
            setValue("coverImage", undefined as any);
          }}
          accept="image/*"
        />

        {/* Title Input */}
        <div className="space-y-2">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="ex: Rich Dad Poor Dad"
            className={cn(
              "form-input",
              errors.title &&
                "border-red-500 focus:border-red-500 focus:ring-red-500",
            )}
            {...register("title")}
          />
          {errors.title?.message && (
            <p className="text-sm text-red-500">{errors.title.message}</p>
          )}
        </div>

        {/* Author Input */}
        <div className="space-y-2">
          <label htmlFor="author" className="form-label">
            Author Name
          </label>
          <input
            id="author"
            type="text"
            placeholder="ex: Robert Kiyosaki"
            className="form-input"
            {...register("author")}
          />
          {errors.author && (
            <p className="text-sm text-red-500">{errors.author.message}</p>
          )}
        </div>

        {/* Voice Selector */}
        <div className="space-y-4">
          <label className="form-label">Choose Assistant Voice</label>

          {/* Male Voices */}
          <div>
            <p className="text-sm font-medium text-[#3d485e] mb-3">
              Male Voices
            </p>
            <div className="voice-selector-options">
              {MALE_VOICES.map((voice) => (
                <label key={voice.id} className="flex-1">
                  <input
                    type="radio"
                    value={voice.id}
                    {...register("voiceId")}
                    className="hidden"
                  />
                  <div
                    className={`voice-selector-option ${
                      selectedVoiceId === voice.id
                        ? "voice-selector-option-selected"
                        : "voice-selector-option-default"
                    } cursor-pointer`}
                  >
                    <BookOpen size={24} className="text-[#8B7355]" />
                    <div className="text-center">
                      <p className="font-semibold text-[#212a3b]">
                        {voice.name}
                      </p>
                      <p className="text-xs text-[#3d485e]">
                        {voice.description}
                      </p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Female Voices */}
          <div>
            <p className="text-sm font-medium text-[#3d485e] mb-3">
              Female Voices
            </p>
            <div className="voice-selector-options">
              {FEMALE_VOICES.map((voice) => (
                <label key={voice.id} className="flex-1">
                  <input
                    type="radio"
                    value={voice.id}
                    {...register("voiceId")}
                    className="hidden"
                  />
                  <div
                    className={`voice-selector-option ${
                      selectedVoiceId === voice.id
                        ? "voice-selector-option-selected"
                        : "voice-selector-option-default"
                    } cursor-pointer`}
                  >
                    <BookOpen size={24} className="text-[#8B7355]" />
                    <div className="text-center">
                      <p className="font-semibold text-[#212a3b]">
                        {voice.name}
                      </p>
                      <p className="text-xs text-[#3d485e]">
                        {voice.description}
                      </p>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {errors.voiceId && (
            <p className="text-sm text-red-500">{errors.voiceId.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="my-4 form-btn disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Processing..." : "Begin Synthesis"}
        </button>
      </form>

      {/* Loading Overlay */}
      {isSubmitting && (
        <div className="loading-wrapper">
          <div className="loading-shadow-wrapper bg-white">
            <div className="loading-shadow">
              <div className="loading-animation">
                <BookOpen size={48} className="text-[#663820]" />
              </div>
              <div className="loading-title">Creating Your Audiobook</div>
              <div className="loading-progress">
                <div className="loading-progress-item">
                  <div className="loading-progress-status"></div>
                  <span>Extracting text from PDF</span>
                </div>
                <div className="loading-progress-item">
                  <div className="loading-progress-status"></div>
                  <span>Generating audio synthesis</span>
                </div>
                <div className="loading-progress-item">
                  <div className="loading-progress-status"></div>
                  <span>Processing your request</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadForm;
