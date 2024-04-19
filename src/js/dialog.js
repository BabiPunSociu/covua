/**
 * Khai báo lớp dialog để cung cấp các thông tin cho dialog hiển thị.
 * @author NVDung (18-04-2024)
 */
class dialog {
  /**
   * Hàm tạo đối tượng Dialog.
   * @param {String} title Tiêu đề dialog message.
   * @param {String} content Nội dung dialog message.
   * @param {String} iconClass Class icon: 'mi-success', 'mi-warning', 'mi-info', 'mi-error'.
   * @param {Number} totalButton Tổng số lượng button.
   * @param {String} buttonPrimaryText Text của nút chính.
   * @param {String} buttonSecondary1Text Text của nút phụ 1.
   * @param {String} buttonSecondary2Text Text của nút phụ 2.
   */
  constructor(
    title,
    content,
    iconClass,
    totalButton,
    buttonPrimaryText,
    buttonSecondary1Text = "",
    buttonSecondary2Text = ""
  ) {
    this.title = title;
    this.content = content;
    this.iconClass = iconClass;
    this.totalButton = totalButton;
    this.buttonPrimaryText = buttonPrimaryText;
    this.buttonSecondary1Text = buttonSecondary1Text;
    this.buttonSecondary2Text = buttonSecondary2Text;
  }
}

export default dialog;
