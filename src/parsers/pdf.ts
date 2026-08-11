import type { ParseOptions, ParseResult, FileMeta } from "../types.ts"
import { createResult, cleanText } from "../utils/normalize.ts"

export async function parsePdf(buffer: Uint8Array, fileName: string, fileSize: number, options: ParseOptions): Promise<ParseResult> {
  const pdfParse = await importPdfParse()
  const data = await pdfParse(Buffer.from(buffer), {
    max: options.maxPages ?? 0,
  })

  const info = (data.info ?? {}) as Record<string, string | undefined>
  const meta: FileMeta = {
    title: info.Title,
    author: info.Author,
    created: info.CreationDate,
    modified: info.ModDate,
    pages: data.numpages,
    format: "PDF",
  }

  const text = cleanText(data.text ?? "")

  return createResult("pdf", fileName, fileSize, meta, text, {
    maxChars: options.maxChars,
  })
}

async function importPdfParse() {
  const mod = await import("pdf-parse")
  const fn = (mod as { default?: unknown }).default ?? (mod as unknown)
  return fn as typeof import("pdf-parse").default
}