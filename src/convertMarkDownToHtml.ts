import marked from 'marked';
import hljs from 'highlight.js';

export default function convertMarkDownToHtml(markDownString: string): string {
  const renderer = new marked.Renderer();

  renderer.code = (code, languageName) => {
    // if the given language is not available in highlight.js, fall back to plaintext
    const language = languageName && hljs.getLanguage(languageName) ? languageName : 'plaintext';

    return `<pre><code class="hljs ${language}">${hljs.highlight(code, {language}).value}</code></pre>`;
  };

  marked.setOptions({renderer});

  const htmlString = marked(markDownString);

  return `
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    ${htmlString}
  </body>
</html>
  `;
}
