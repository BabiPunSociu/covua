/**
 * Khai báo lớp toast để cung cấp các thông tin cho toast message.
 * @author NVDung (18-04-2024)
 */
class toast {
  /**
   * Hàm tạo đối tượng Toast.
   * @param {Number} id ToastId.
   * @param {string} type Loại Toast: success, error, warning, info.
   * @param {boolean} showButtonUndo Hiển thị button 'HOÀN TÁC' không?
   * @param {string} title Tiêu đề toast message.
   * @param {string} message Nội dung thông báo cần hiển thị.
   */
  constructor(id = 0, type, showButtonUndo = true, title, message) {
    this.id = id;
    this.type = type ??= "success";
    this.showButtonUndo = showButtonUndo;
    this.title = title;
    this.message = message;
  }
}

export default toast;
