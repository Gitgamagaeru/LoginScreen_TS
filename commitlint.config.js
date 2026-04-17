module.exports = {
  /* Conventional Commits の標準的なルールを継承します */
  extends: ['@commitlint/config-conventional'],
  /* 必要に応じてルールをカスタマイズできます（現時点では空） */
  rules: {
    // 例: 主題（subject）を常に小文字で始める必要はないなど
    // 'subject-case': [0],
  },
};
