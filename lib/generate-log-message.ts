import { ACTION, AuditLog } from "@prisma/client";

export const generateLogMessage = (log: AuditLog) => {
  const { action, entityTitle, entityType } = log;

  const type = (() => {
    switch (entityType) {
      case "BOARD":
        return "面板";
      case "LIST":
        return "列表";
      case "CARD":
        return "卡片";
      default:
        return "未知";
    }
  })();

  switch (action) {
    case ACTION.CREATE:
      return `已创建 ${type} "${entityTitle}"`;
    case ACTION.UPDATE:
      return `已更新 ${type} "${entityTitle}"`;
    case ACTION.DELETE:
      return `已删除 ${type} "${entityTitle}"`;
    default:
      return `Unknown action ${type} "${entityTitle}"`;
  }
};
