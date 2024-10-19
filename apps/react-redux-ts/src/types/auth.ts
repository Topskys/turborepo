/**
 * 登录返回值类型
 */
export type LoginResult = {
  token: string;
  refreshToken: string;
};

/**
 * 用户信息类型
 */
export type UserInfo = {
  id: string;
  name?: string;
  avatar?: string;
  email?: string;
  phone?: string;
  permissions?: string[];
  roles?: string[];
};

/**
 * store验证模块初始值的类型
 */
export type AuthStateType = LoginResult & {
  userInfo?: UserInfo;
};

export type RouteMeta = {
  title?: string;
  icon?: string;
  hideInMenu?: boolean;
  hideInTab?: boolean;
  hideInBreadcrumb?: boolean;
  keepAlive?: boolean;
  affix?: boolean;
  path?: string;
  component?: string;
  redirect?: string;
  children?: RouteMeta[];
};

export type RouteItem = {
  path: string;
  name: string;
  meta: RouteMeta;
  children?: RouteItem[];
};

export type DynamicRoutes = RouteItem[];
