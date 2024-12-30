const key = "NVDChessAudio";

export const audioLocalStorage = {
  /**
   * Thiết lập danh sách Audio vào local storage.
   * @param {object} objAudio Audio
   * @returns {void} Không có giá trị trả về.
   * @author NVDung (30-12-2024)
   */
  setListAudio: (objAudio) => {
    try {
      // Chuyển Obj -> JSON
      const jsonObjAudio = JSON.stringify(objAudio);
      // Thêm vào localStorage
      localStorage.setItem(key, jsonObjAudio);
    } catch (error) {
      console.error("Error while set Audio to local storage", error);
    }
  },

  /**
   * Lấy URL audio theo audioName.
   * @param {string} audioName Tên âm thanh
   * @returns {string} URL audio.
   * @author NVDung (30-12-2024)
   */
  getAudio: (audioName) => {
    try {
      const jsonObjAudio = localStorage.getItem(key);

      if (jsonObjAudio) {
        // Chuyển Json thành Object
        let objAudio = JSON.parse(jsonObjAudio);

        return objAudio[audioName];
      }
    } catch (error) {
      console.error("Error while get Audio from local storage", error);
    }
  },
};
