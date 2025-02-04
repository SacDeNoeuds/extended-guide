export const MimeType = {
  Json: 'application/json',
  OctetStream: 'application/octet-stream',
  Text: 'text/plain',
  Html: 'text/html',
  Png: 'image/png',
  Jpeg: 'image/jpeg',
  Xml: 'application/xeml',
} as const
export type MimeTypeName = keyof typeof MimeType
export type MimeType = (typeof MimeType)[MimeTypeName]
