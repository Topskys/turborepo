import "element-plus/es/components/message/style/css";
import { ElMessage } from "element-plus";

interface MessageOptions {
  message: string;
  type: "success" | "warning" | "info" | "error";
  center?: boolean;
  duration?: number;
  showClose?: boolean;
}

/**
 * 封装element-plus的消息弹出提示（ELMessage），防止同一类型的消息在同一段时间内重复弹出
 *
 * @returns {showMessage: (options: MessageOptions) => void}
 */
export function useShowMessage() {
  let prevType = "";
  let prevInstance: any = null;

  /**
   * 展示消息弹出
   *
   * @param options 消息配置
   */
  function showMessage(options: MessageOptions) {
    const { type } = options;
    //判断弹窗的类型是不是一致，一致就不弹出
    if (prevInstance && prevType === type) {
      return;
    }
    prevType = type;

    if (prevInstance) {
      prevInstance.close();
    }

    prevInstance = ElMessage({
      ...options,
      onClose: () => {
        prevType = "";
      },
    });
  }

  return {
    showMessage,
  };
}

export default useShowMessage;
