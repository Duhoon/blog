export default function Markdown({ html }: { html: string }) {
  return (
    <div className="pf-prose" dangerouslySetInnerHTML={{ __html: html }} />
  );
}
