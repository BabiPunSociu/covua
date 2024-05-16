/**
 * Đối tượng cung cấp các hàm tiện ích, xử lý chung.
 */
const NVDHelper = {
  /**
   * So sánh ngày được truyền vào với ngày hiện tại
   * @author NVDung (15-05-2024)
   * @param {Date} date
   * @returns true - Ngày hiện tại lớn hơn
   */
  compareDateWithNow: (date) => {
    const currentDate = new Date();
    const parsedInputDate = new Date(date);
    return currentDate > parsedInputDate;
  },

  /**
   * Format date về dạng bất kì với múi giờ Việt Nam (VN).
   * @author NVDung (15-05-2024)
   * @param {Date} dateInput
   * @param {String} formatType "dd/MM/yyyy" || ...
   * @returns {String}
   */
  formatDate(dateInput, formatType) {
    const date = new Date(dateInput);
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      timeZoneName: "short",
    };

    // Sử dụng toLocaleString() với các tùy chọn để định dạng và bảo tồn múi giờ Việt Nam (VN)
    const formattedDate = date.toLocaleString("vi-VN", options);

    // Lấy thông tin ngày, tháng, năm từ chuỗi định dạng
    const [, , dateOutput] = formattedDate.split(" ");
    const [day, month, year] = dateOutput.split("/");

    // Thay thế giá trị vào vị trí tương ứng trong formatType...
    let dateStringOut = formatType.replace("dd", day);
    dateStringOut = dateStringOut.replace("MM", month);
    dateStringOut = dateStringOut.replace("yyyy", year);

    return dateStringOut;
  },

  /**
   * Chuyển một string sang dạng capitalize
   * @author NVDung (15-05-2024)
   * @param {string} str
   * @returns {string}
   */
  capitalizeString: (str) => str[0].toUpperCase() + str.slice(1).toLowerCase(),

  /**
   * Hàm thực hiện trì hoãn thực hiện func trong thời gian delay
   * @author NVDung (15-05-2024)
   * @param {Function} func Callback function cần trì hoãn.
   * @param {Number} delay Thời gian hoãn thực hiện, mặc định là 200ms.
   * @returns {Function}
   */
  debounce(func, delay = 200) {
    let timer;
    return function () {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, arguments);
        console.log("debounce");
      }, delay);
    };
  },

  /**
   * Xóa dấu tiếng Việt (sắc, huyền, hỏi, ngã, nặng)
   * @author NVDung (15-05-2024)
   * @param {string} str
   * @returns {string} Chuỗi chữ thường, không dấu.
   */
  removeVietnameseTone(str) {
    if (!str) return str;
    return str
      .normalize("NFD") // Tách ra thành ký tự base và dấu
      .replace(/[\u0300-\u036f]/g, "") // Loại bỏ dấu
      .toLowerCase(); // Chuyển thành chữ thường
  },

  /**
   * Hàm viết tắt chuỗi.
   * Ví dụ: "nguyen van dung" -> "NVD"
   * @author NVDung (15-05-2024)
   * @param {string} inputString
   * @returns
   */
  abbreviateString(inputString) {
    if (!inputString) return "";
    // Tách chuỗi đầu vào thành mảng các từ
    const words = inputString.split(" ");

    // Khởi tạo biến để lưu kết quả viết tắt
    let abbreviation = "";

    // Lặp qua từng từ và lấy ký tự đầu tiên của mỗi từ
    for (const word of words) {
      abbreviation += word.charAt(0).toUpperCase(); // Chuyển ký tự đầu tiên thành chữ hoa
    }

    return abbreviation;
  },

  /**
   * Hàm chuyển các keys của object từ PasCalCase về camelCase.
   * @author NVDung (15-05-2024)
   * @param {Object} obj
   * @returns {object} - ở dạng camelCase
   */
  convertKeysToCamelCase(obj) {
    if (typeof obj !== "object" || obj === null) {
      return obj;
    }

    // Nếu là Array object thì map gọi đệ quy cho từng phần tử.
    if (Array.isArray(obj)) {
      return obj.map((item) => this.convertKeysToCamelCase(item));
    }

    const newObj = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        const camelCaseKey = key[0].toLowerCase() + key.slice(1);
        newObj[camelCaseKey] = this.convertKeysToCamelCase(obj[key]);
      }
    }

    return newObj;
  },
};

export default NVDHelper;
