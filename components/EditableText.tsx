import { useState, useRef, useEffect } from "react";

interface EditableTextProps {
  value: string;
  onSave: (newValue: string) => void;
  className?: string;
  placeholder?: string;
  tag?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

const EditableText = ({
  value,
  onSave,
  className = "",
  placeholder = "Click to edit...",
  tag = "span",
}: EditableTextProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const [showEditIcon, setShowEditIcon] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Detectar si el texto tiene múltiples líneas
  const hasMultipleLines = value.includes("\n") || value.length > 50;

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  useEffect(() => {
    if (isEditing) {
      // Usar setTimeout para asegurar que el DOM esté listo
      setTimeout(() => {
        if (hasMultipleLines && textareaRef.current) {
          textareaRef.current.focus();
          // Mover el cursor al final del texto
          const length = textareaRef.current.value.length;
          textareaRef.current.setSelectionRange(length, length);
        } else if (inputRef.current) {
          inputRef.current.focus();
          // Mover el cursor al final del texto
          const length = inputRef.current.value.length;
          inputRef.current.setSelectionRange(length, length);
        }
      }, 0);
    }
  }, [isEditing, hasMultipleLines]);

  const handleEditClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editValue.trim() !== value) {
      onSave(editValue.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditValue(value);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    handleSave();
  };

  // Determinar qué fuente usar basándose en el tag
  const fontClass =
    tag === "h1" ||
    tag === "h2" ||
    tag === "h3" ||
    tag === "h4" ||
    tag === "h5" ||
    tag === "h6"
      ? "font-display"
      : "font-sans";

  // Detectar si tiene gradiente para ajustar el color del cursor
  const hasGradient = className.includes("gradient-text");
  const caretColor = hasGradient ? "#3b82f6" : "currentColor"; // Color primario para gradientes

  const Tag = tag as keyof JSX.IntrinsicElements;
  const isBlock =
    className.includes("block") ||
    tag === "div" ||
    tag === "h1" ||
    tag === "h2" ||
    tag === "h3" ||
    tag === "p";

  // Detectar si está dentro de un botón
  const isInButton = className.includes("btn-") || className.includes("inline");

  return (
    <div
      className={`relative group ${
        isBlock ? "block" : "inline-block"
      } hover:bg-gray-50 dark:hover:bg-gray-800/20 rounded px-1 py-0.5 transition-all duration-200`}
      style={{
        ...(isInButton && {
          overflow: "visible",
          position: "relative",
          zIndex: 1,
        }),
        ...(isEditing && {
          display: "inline-block",
          width: "fit-content",
        }),
      }}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Tag
        className={`${className} group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200 ${
          isEditing ? "opacity-0" : ""
        }`}
      >
        {value || placeholder}
      </Tag>

      {/* Input/Textarea superpuesto cuando está en modo edición */}
      {isEditing &&
        (hasMultipleLines ? (
          <textarea
            ref={textareaRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className={`${className} bg-transparent border-none focus:outline-none ${fontClass} cursor-text absolute inset-0 resize-none`}
            placeholder={placeholder}
            style={{
              textAlign: "center",
              width: "100%",
              caretColor: caretColor,
              margin: 0,
              padding: 0,
              lineHeight: "inherit",
              height: "100%",
              minHeight: "100%",
              resize: "none",
              overflow: "hidden",
              zIndex: 10,
              fontSize: "inherit",
              fontWeight: "inherit",
              fontFamily: "inherit",
              color: "inherit",
              letterSpacing: "inherit",
              wordSpacing: "inherit",
              textTransform: "inherit",
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              maxWidth: "100%",
            }}
          />
        ) : (
          <input
            ref={inputRef}
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            className={`${className} bg-transparent border-none focus:outline-none ${fontClass} cursor-text absolute inset-0`}
            placeholder={placeholder}
            style={{
              textAlign: "center",
              width: "100%",
              caretColor: caretColor,
              margin: 0,
              padding: 0,
              lineHeight: "inherit",
              height: "100%",
              minHeight: "100%",
              resize: "none",
              overflow: "visible",
              zIndex: 10,
              fontSize: "inherit",
              fontWeight: "inherit",
              fontFamily: "inherit",
              color: "inherit",
              letterSpacing: "inherit",
              wordSpacing: "inherit",
              textTransform: "inherit",
              whiteSpace: "normal",
              wordWrap: "break-word",
              overflowWrap: "break-word",
              maxWidth: "100%",
            }}
          />
        ))}

      {/* Edit Icon - Siempre visible */}
      <button
        onClick={handleEditClick}
        className="absolute -top-1 -right-6 p-1 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-600 transition-all duration-200 opacity-100 scale-100 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:scale-110 group-hover:bg-primary-100 dark:group-hover:bg-primary-900/30"
        title="Click to edit"
        style={{
          zIndex: 9999,
          position: "absolute",
          right: isInButton ? "-80px" : "-40px",
          top: "-10px",
        }}
      >
        <svg
          className="w-3 h-3 text-gray-600 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
          />
        </svg>
      </button>
    </div>
  );
};

export default EditableText;
