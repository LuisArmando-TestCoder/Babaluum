const ALLOWED = [/^\s*@ts-expect-error\s+\S+/];

export default {
  meta: {
    type: "suggestion",
    docs: { description: "Code explains itself. Fix the root cause instead of annotating a workaround." },
    messages: {
      noComment:
        "Comments are banned. Rename, extract a function, or encode the rule as a check. If this is a workaround, fix the root cause.",
    },
    schema: [],
  },
  create(context) {
    return {
      Program() {
        for (const comment of context.sourceCode.getAllComments()) {
          if (ALLOWED.some((pattern) => pattern.test(comment.value))) continue;
          context.report({ loc: comment.loc, messageId: "noComment" });
        }
      },
    };
  },
};
