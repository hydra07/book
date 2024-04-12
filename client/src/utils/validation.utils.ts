

// Hàm kiểm tra số điện thoại hợp lệ
export const isPhoneValid = (phone: string | null): boolean => {
  if (phone === null) {
    return false; // hoặc có thể throw error
  }
  const phoneRegex = /^\d{10}$/; // 10 chữ số
  return phoneRegex.test(phone);
};

// Hàm kiểm tra địa chỉ email hợp lệ
export const isEmailValid = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

