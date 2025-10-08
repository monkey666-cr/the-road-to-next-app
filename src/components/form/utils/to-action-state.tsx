import { ZodError } from "zod";

export type ActionState = {
  status?: "SUCCESS" | "ERROR";
  message: string;
  payload?: FormData;
  fieldErrors?: Record<string, string[] | undefined>;
  timestamp: number;
};

export const EMPTY_ACTION_STATE: ActionState = {
  message: "",
  timestamp: Date.now(),
};

/**
 * 将 ZodError 的 issues 数组转换为扁平化的字段错误对象
 * 输出结构与 error.flatten().fieldErrors 一致
 */
function formatZodErrorToFieldErrors(
  error: ZodError
): Record<string, string[] | undefined> {
  const fieldErrors: Record<string, string[]> = {};

  for (const issue of error.issues) {
    // 将路径数组转换为点分隔的字符串路径（如：'user.profile.name'）
    const path = issue.path.join(".");

    if (!fieldErrors[path]) {
      fieldErrors[path] = [];
    }

    // 使用自定义错误消息或默认消息
    fieldErrors[path].push(issue.message || `Validation failed for ${path}`);
  }

  return fieldErrors;
}

export const fromErrorToActionState = (
  error: unknown,
  formData?: FormData
): ActionState => {
  if (error instanceof ZodError) {
    return {
      status: "ERROR",
      message: "",
      fieldErrors: formatZodErrorToFieldErrors(error),
      payload: formData,
      timestamp: Date.now(),
    };
  } else if (error instanceof Error) {
    return {
      status: "ERROR",
      message: error.message,
      payload: formData,
      timestamp: Date.now(),
    };
  } else {
    return {
      status: "ERROR",
      message: "Something went wrong.",
      payload: formData,
      timestamp: Date.now(),
    };
  }
};

export const toActionState = (
  status: ActionState["status"],
  message: string,
  formData?: FormData
): ActionState => {
  return {
    status,
    message,
    payload: formData,
    timestamp: Date.now(),
  };
};
