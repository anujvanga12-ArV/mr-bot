export interface FileIndicator {
  id: string;
  label: string;
  detail: string;
  severity: "info" | "caution" | "warning";
}

export interface FileMetadataInput {
  name: string;
  size: number;
  type: string;
}

export interface FileAnalysisResult {
  name: string;
  size: number;
  declaredType: string;
  extensionChain: string[];
  finalExtension: string | null;
  hasDoubleExtensionRisk: boolean;
  indicators: FileIndicator[];
}

const EXECUTABLE_EXTENSIONS = new Set([
  "exe",
  "scr",
  "bat",
  "cmd",
  "com",
  "pif",
  "vbs",
  "js",
  "jar",
  "msi",
  "ps1",
  "sh",
]);

const DOCUMENT_LOOKING_EXTENSIONS = new Set([
  "pdf",
  "doc",
  "docx",
  "xls",
  "xlsx",
  "ppt",
  "pptx",
  "txt",
  "jpg",
  "jpeg",
  "png",
  "gif",
  "mp3",
  "mp4",
]);

/**
 * Analyzes a file's name, extension, and size only — this never inspects
 * file contents, so it cannot detect malicious code and doesn't claim to.
 * A real antivirus signature scan is a fundamentally different (and much
 * harder) problem this tool isn't attempting to solve.
 */
export function analyzeFileMetadata(file: FileMetadataInput): FileAnalysisResult {
  const parts = file.name.split(".");
  const extensionChain = parts.length > 1 ? parts.slice(1).map((part) => part.toLowerCase()) : [];
  const finalExtension =
    extensionChain.length > 0 ? extensionChain[extensionChain.length - 1] : null;
  const precedingExtension =
    extensionChain.length >= 2 ? extensionChain[extensionChain.length - 2] : undefined;

  const indicators: FileIndicator[] = [];

  const hasDoubleExtensionRisk = Boolean(
    finalExtension &&
    EXECUTABLE_EXTENSIONS.has(finalExtension) &&
    precedingExtension &&
    DOCUMENT_LOOKING_EXTENSIONS.has(precedingExtension),
  );

  if (hasDoubleExtensionRisk && finalExtension) {
    indicators.push({
      id: "double-extension",
      label: `Name ends in ".${precedingExtension}.${finalExtension}"`,
      detail: `This is actually a ".${finalExtension}" program, not a ".${precedingExtension}" document — the earlier extension is just part of the file name, a common trick to look harmless at a glance.`,
      severity: "warning",
    });
  } else if (finalExtension && EXECUTABLE_EXTENSIONS.has(finalExtension)) {
    indicators.push({
      id: "executable-extension",
      label: `This is a ".${finalExtension}" file — a program, not a document`,
      detail:
        "Running it executes code on your device. Only run files like this from sources you specifically trust.",
      severity: "caution",
    });
  }

  if (file.size === 0) {
    indicators.push({
      id: "empty-file",
      label: "This file is empty (0 bytes)",
      detail:
        "An unexpectedly empty file can mean a download didn't finish, or occasionally is a placeholder used to test delivery before a real payload follows.",
      severity: "caution",
    });
  }

  if (indicators.length === 0) {
    indicators.push({
      id: "no-flags",
      label: "No structural red flags found in the name or size",
      detail:
        "This only checks the file's name, extension, and size — it doesn't scan the actual contents for malicious code. Treat this as one input among several, not a verdict.",
      severity: "info",
    });
  }

  return {
    name: file.name,
    size: file.size,
    declaredType: file.type || "(not reported by your browser)",
    extensionChain,
    finalExtension,
    hasDoubleExtensionRisk,
    indicators,
  };
}

/**
 * Computes a real SHA-256 hash via the Web Crypto API — useful for
 * comparing against a hash a trusted source has already published, which
 * is the honest, limited thing a client-side tool can actually offer here
 * (there's no signature database behind this to check against).
 */
export async function computeSha256(file: Blob): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}
