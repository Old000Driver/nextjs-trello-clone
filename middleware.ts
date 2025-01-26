import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware

// 默认导出一个经过配置的认证中间件
export default authMiddleware({
  // 配置公开路由，即不需要认证即可访问的路由
  publicRoutes: ["/", "/api/webhook"],
  // 认证后执行的回调函数，用于处理认证后的逻辑
  afterAuth(auth, req) {
    // 当用户已认证且访问的是公开路由时，重定向用户到组织选择页面或特定的组织页面
    if (auth.userId && auth.isPublicRoute) {
      let path = "/select-org";

      // 如果用户已选择组织，重定向到特定的组织页面
      if (auth.orgId) {
        path = `/organization/${auth.orgId}`;
      }

      // 创建重定向响应，引导用户到组织选择或特定组织页面
      const orgSelection = new URL(path, req.url);
      return NextResponse.redirect(orgSelection);
    }

    // 当用户未认证且访问的不是公开路由时，重定向用户到登录页面
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // 当用户已认证但未选择组织，且访问的不是组织选择页面时，重定向用户到组织选择页面
    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org") {
      return NextResponse.redirect(new URL("/select-org", req.url));
    }

    return {}
  },
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
