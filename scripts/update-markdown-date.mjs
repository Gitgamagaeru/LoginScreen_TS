import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

/**
 * Markdownのフロントマターにある 'updated: YYYY-MM-DD' を今日の日付に更新するスクリプト
 */

// 今日の日付を取得 (YYYY-MM-DD 形式)
const today = new Date().toISOString().split('T')[0];

// コマンド引数からファイルパスのリストを取得
const files = process.argv.slice(2);

files.forEach((file) => {
  try {
    const content = readFileSync(file, 'utf8');
    
    // updated: YYYY-MM-DD というパターンを探して置換
    // (gフラグなしで最初の1つだけ、または必要に応じて全体を置換)
    const updatedContent = content.replace(
      /updated:\s*\d{4}-\d{2}-\d{2}/,
      `updated: ${today}`
    );

    // 内容が変わった場合のみ書き込み
    if (content !== updatedContent) {
      writeFileSync(file, updatedContent, 'utf8');
      console.log(`[updated] ${file}`);
    }
  } catch (err) {
    console.error(`[error] Failed to process ${file}:`, err.message);
  }
});
