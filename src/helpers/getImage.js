export default function getImage (img, quality = false) {
  if (!img || !img.data.attributes.formats) {
    console.log('else');
    return;
  }
  if (quality === true) {
    return img.data.attributes.url
  }
  if (img.data.attributes.formats.small) {
    return img.data.attributes.formats.small.url
  } else if (img.data.attributes.formats.thumbnail) {
    return img.data.attributes.formats.thumbnail.url
  }
  return img.data.attributes.url
}