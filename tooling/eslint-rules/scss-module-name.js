export default {
  meta: {
    type: "problem",
    docs: { description: "A component imports only its own sibling SCSS module." },
    messages: {
      foreignModule:
        "Import only the sibling '{{expected}}'. Shared styling belongs in src/styles mixins or a reusable primitive.",
    },
    schema: [],
  },
  create(context) {
    const filename = context.filename.replace(/\\/g, "/");
    const base = filename.split("/").pop()?.replace(/\.tsx?$/, "") ?? "";
    const expected = `./${base}.module.scss`;
    return {
      ImportDeclaration(node) {
        const source = String(node.source.value);
        if (!source.endsWith(".module.scss")) return;
        if (source === expected) return;
        context.report({ node, messageId: "foreignModule", data: { expected } });
      },
    };
  },
};
