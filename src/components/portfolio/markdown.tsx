import { cn } from "@/lib/utils";

export default function Markdown({
  html,
  variant = "portfolio",
  className,
}: {
  html: string;
  variant?: "portfolio" | "detail";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "min-w-0 leading-[1.85] [overflow-wrap:anywhere] [&>:first-child]:mt-0 [&>:last-child]:mb-0 [&_p]:mb-3 [&_:is(h3,h4,h5,h6)]:mt-[22px] [&_:is(h2,h3,h4,h5,h6)]:mb-2.5 [&_:is(h3,h4,h5,h6)]:text-[1.2em] [&_:is(h2,h3,h4,h5,h6)]:leading-[1.4] [&_:is(h2,h3,h4,h5,h6)]:font-[650] [&_:is(ul,ol)]:my-3 [&_:is(ul,ol)]:pl-[22px] [&_ul]:list-disc [&_ol]:list-decimal [&_a]:text-[var(--pf-accent,#a6d6b2)] [&_a]:underline [&_a]:underline-offset-3 [&_blockquote]:my-4 [&_blockquote]:border-l-2 [&_blockquote]:border-[var(--pf-accent,#a6d6b2)] [&_blockquote]:bg-[var(--pf-sage,#222824)] [&_blockquote]:px-4 [&_blockquote]:py-2 [&_img]:my-[18px] [&_img]:h-auto [&_img]:max-w-full [&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:rounded-[3px] [&_pre]:bg-[var(--pf-sage,#222824)] [&_pre]:p-4 [&_code]:font-[Consolas,monospace] [&_code]:text-[0.9em] [&_:not(pre)>code]:bg-[var(--pf-sage,#222824)] [&_:not(pre)>code]:px-1 [&_:not(pre)>code]:py-0.5 [&_table]:my-4 [&_table]:block [&_table]:w-full [&_table]:border-collapse [&_table]:overflow-x-auto [&_:is(th,td)]:border [&_:is(th,td)]:border-[var(--pf-line,#39443d)] [&_:is(th,td)]:px-3.5 [&_:is(th,td)]:py-2 [&_:is(th,td)]:text-left [&_:is(th,td)]:whitespace-nowrap [&_input[type=checkbox]]:mr-1.5",
        variant === "detail"
          ? "text-base [&_h2]:mt-10 [&_h2]:text-[1.6em]"
          : "[&_h2]:mt-[22px] [&_h2]:text-[1.2em]",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
