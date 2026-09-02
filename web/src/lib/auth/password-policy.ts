export const PASSWORD_MIN_LENGTH = 12;
export const PASSWORD_MAX_LENGTH = 128;

export function validatePassword(password: string) {
  if (password.length < PASSWORD_MIN_LENGTH) {
    return `비밀번호는 ${PASSWORD_MIN_LENGTH}자 이상으로 설정해주세요.`;
  }

  if (password.length > PASSWORD_MAX_LENGTH) {
    return `비밀번호는 ${PASSWORD_MAX_LENGTH}자 이하로 설정해주세요.`;
  }

  const characterGroups = [
    /[a-z]/.test(password),
    /[A-Z]/.test(password),
    /\d/.test(password),
    /[^A-Za-z0-9\s]/.test(password),
  ].filter(Boolean).length;

  if (characterGroups < 3) {
    return "영문 대문자·소문자·숫자·특수문자 중 3가지 이상을 조합해주세요.";
  }

  return null;
}
