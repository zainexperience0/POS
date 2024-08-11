import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { MemoizedReactMarkdown } from "./markdownMemo";
import { CodeBlock } from "./codeblock";
import { cn } from "@/lib/utils";

interface Props {
  content: string;
  customClassName?: string;
}
export const MarkdownViewer = ({ content, customClassName }: Props) => {
  return (
    <MemoizedReactMarkdown
      className={cn(
        "prose prose-neutral prose-table:overflow-x-auto prose-table:block prose-headings:font-bold break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0 prose-img:rounded-xl prose-a:text-blue-500 max-w-6xl",
        customClassName
      )}
      remarkPlugins={[remarkGfm, remarkMath]}
      components={{
        p({ children }) {
          return <p className="mb-2 last:mb-0">{children}</p>;
        },
        code({ node, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");

          return (
            <CodeBlock
              key={Math.random()}
              language={(match && match[1]) || ""}
              value={String(children).replace(/\n$/, "")}
              {...props}
            />
          );
        },
      }}
    >
      {content}
    </MemoizedReactMarkdown>
  );
};
