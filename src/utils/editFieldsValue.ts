/***
 * 渡された文字列をDiscordのembedsのfieldのvalueの最大文字数に合わせて編集し特殊文字をエスケープ
 * @param {string} value - Discordで送る文字列
 * @return {string} - 色々処理した文字列
 */
const editFieldsValue = (value: string): string =>
  [...value].length > 1017
    ? `\`\`\`\n${[...value].slice(0, 1013).join('')}...\`\`\``
    : `\`\`\`\n${value}\`\`\``;

export default editFieldsValue;
