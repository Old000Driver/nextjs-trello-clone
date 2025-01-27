import { Button } from "@/components/ui/button";
import { Medal } from "lucide-react";
import localFont from "next/font/local";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const headingFont = localFont({ src: "../../public/fonts/font.woff2" });

const textFont = Poppins({
  weight: [
    "100",
    "200",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
  subsets: ["latin"],
});

const MarketingPage = () => {
  return (
    <div className="flex items-center justify-center flex-col">
      <div
        className={cn(
          "flex items-center justify-center flex-col",
          headingFont.className
        )}
      >
        <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full uppercase">
          <Medal className="h-6 w-6 mr-2" />
          No 1 任务管理
        </div>
        <h1 className="text-3xl md:text-4xl flex text-center text-neutral-800 mb-6">
          Taskify 帮助团队前进
        </h1>
        <div className="text-3xl md:text-4xl text-center bg-gradient-to-r from-fuchsia-600 to-pink-600 text-white px-4 rounded-md p-4 w-fit">
          持续前进
        </div>
        <div
          className={cn(
            "text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto",
            textFont.className
          )}
        >
          协作、管理项目并达到新的生产力高峰。从高楼大厦到家庭办公室，您的团队工作方式是独特的——使用 Taskify 完成一切。
        </div>
      </div>

      <Button className="mt-6" size="lg" asChild>
        <Link href="/sign-up">免费获取 Taskify</Link>
      </Button>
    </div>
  );
};

export default MarketingPage;
