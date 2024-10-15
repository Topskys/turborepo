import { useCheckLogin } from "./useCheckLogin";

export function usePermission() {
  const {} = useCheckLogin();
  const hasPermission = (permissions: string[], key: string[]) => {
    return permissions.some((item) => key.includes(item));
  };

  return {
    hasPermission,
  };
}
