export function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);

  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
}

export function uint8ArrayToClientReadyImage(
  uint8Array: Uint8Array<ArrayBufferLike>
): string {
  const buffer = Buffer.from(uint8Array);
  const base64Image = buffer.toString('base64');
  const picture = base64ToDataURL(base64Image);

  return picture;
}

export function base64ToDataURL(
  base64: string,
  mimeType: string = 'image/png'
): string {
  return `data:${mimeType};base64,${base64}`;
}

export function dataURLToBase64(dataURL: string): string {
  return dataURL.replace(/^data:image\/\w+;base64,/, '');
}
