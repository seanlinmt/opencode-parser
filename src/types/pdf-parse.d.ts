declare module "pdf-parse" {
  interface PdfParseOptions {
    max?: number
    [key: string]: unknown
  }
  interface PdfParseResult {
    numpages?: number
    numrender?: number
    info?: Record<string, unknown>
    metadata?: Record<string, unknown>
    text?: string
    version?: string
  }
  type PdfParse = (
    data: Buffer | Uint8Array | string,
    options?: PdfParseOptions,
  ) => Promise<PdfParseResult>
  const pdfParse: PdfParse
  export default pdfParse
}