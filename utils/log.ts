import { TestInfo } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export class Log {
  static msg(message: string, testInfo?: TestInfo) {
    const timestamp = new Date();
    const logLine = `[${timestamp}] ${message}\n`;

    if (testInfo) {
      const filePath = path.join(testInfo.outputPath(), 'log.txt');
      fs.appendFileSync(filePath, logLine, 'utf8');

      if (!testInfo.attachments.some((att) => att.name === 'log')) {
        testInfo.attachments.push({
          name: 'log',
          path: filePath,
          contentType: 'text/plain',
        });
      }
    }

    console.log(logLine.trim());
  }

  static object(obj: unknown, testInfo?: TestInfo) {
    this.msg(JSON.stringify(obj, null, 2), testInfo);
  }
}
