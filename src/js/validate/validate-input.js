/**
 * Đối tượng chứa các hàm thực thi VALIDATE.
 */
const validator = {
  /**
   * Kiểm tra chuỗi rỗng
   * @author NVDUNG (17-04-2024)
   * @param {String} value Giá trị input
   * @returns True nếu "input" không rỗng, False nếu input rỗng.
   */
  required: (value) => !!value,

  /**
   * Kiểm tra min length
   * @author NVDUNG (17-04-2024)
   * @param {String} value Giá trị input.
   * @param {Number} minLength Giá trị min length.
   * @returns True nếu thỏa mãn, False nếu không thỏa mãn.
   */
  minLength: (value, minLength) => value.length >= minLength,

  /**
   * Kiểm tra max length
   * @author NVDUNG (17-04-2024)
   * @param {String} value Giá trị input.
   * @param {Number} maxLength Giá trị max length.
   * @returns True nếu thỏa mãn, False nếu không thỏa mãn.
   */
  maxLength: (value, maxLength) => value.length <= maxLength,

  /**
   * Kiểm tra định dạng email
   * @author NVDUNG (17-04-2024)
   * @param {String} value Giá trị input.
   * @returns True nếu thỏa mãn, False nếu không thỏa mãn.
   */
  email: (value) => {
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return pattern.test(value);
  },

  /**
   * Validate số điện thoại
   * @author NVDUNG (17-04-2024)
   * @param {String} value Giá trị input.
   * @returns  True nếu thỏa mãn, False nếu không thỏa mãn.
   */
  phone: (value) => {
    const pattern = /^(0[1-9][0-9]{8,9})$/;
    return pattern.test(value);
  },

  /**
   * Validate số chứng minh thư CMND / CCCD
   * @author NVDUNG (17-04-2024)
   * @param {String} value Giá trị input.
   * @returns  True nếu thỏa mãn, False nếu không thỏa mãn.
   */
  identityNumber(value) {
    const pattern = /^(\d{9}|\d{12})$/;
    return pattern.test(value);
  },

  /**
   * Validate mã nhân viên phải kết thúc bằng số.
   * @author NVDUNG (17-04-2024)
   * @param {String} value Giá trị input.
   * @returns  True nếu thỏa mãn, False nếu không thỏa mãn.
   */
  codeEndWithNumber(value) {
    const pattern = /^.*\d$/;
    return pattern.test(value);
  },

  /**
   * Hàm validate ngày input phải nhỏ hơn ngày hiện tại.
   * @param {Date} value Giá trị input.
   * @returns True nếu value nhỏ hơn hiện tại, False ngược lại.
   * @author NVDUNG (17-04-2024)
   */
  dateTimeLessThanNow(value) {
    var inputDate = new Date(value);
    var dateNow = new Date();
    return inputDate.getTime() < dateNow.getTime();
  },
};

export default validator;
