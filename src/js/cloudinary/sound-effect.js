/**
 * Phát âm thanh
 * @param {String} urlSoundFile URL âm thanh từ cloudinary
 *
 * @author: NVDung (19-02-2024)
 */
function playSoundEffect(urlSoundFile) {
  try {
    // Tạo và phát âm thanh
    const audio = new Audio(urlSoundFile);
    audio.play();
  } catch (error) {
    console.error("Lỗi khi phát âm thanh", error);
  }
}

export default playSoundEffect;
