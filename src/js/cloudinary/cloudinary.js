import { Cloudinary } from "@cloudinary/js";

const cloudinary = new Cloudinary({
  cloudName: "YOUR_CLOUD_NAME",
  apiKey: "YOUR_API_KEY",
  apiSecret: "YOUR_API_SECRET",
});

function playSoundEffect(soundName) {
  try {
    // Lấy URL của file âm thanh
    const url = cloudinary.url(soundName, {
      resourceType: "video",
      format: "mp3",
    });

    // Tạo và phát âm thanh
    const audio = new Audio(url);
    audio.play();
  } catch (error) {
    console.log("Lỗi khi phát âm thanh", error);
  }
}
