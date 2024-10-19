import { message } from "antd";
import { ArgsProps } from "antd/es/message";
import { MessageType, NoticeType } from "antd/es/message/interface";

/**
 * 封装antd的消息弹出提示（message），防止同一类型的消息在同一段时间内重复弹出
 */
export function useShowMessage() {
  let prevType: NoticeType | string = "";
  let prevInstance: MessageType | null = null;

  /**
   * 展示消息弹出
   *
   * @param options 消息配置
   */
  function showMessage(options: ArgsProps) {
    const { type = "" } = options;
    //判断弹窗的类型是不是一致，一致就不弹出
    if (prevInstance && prevType === type) {
      return;
    }
    prevType = type;

    if (prevInstance) return

    prevInstance = message.open({
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
