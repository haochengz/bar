import fs from 'node:fs';
import path from 'node:path';

/**
 * Recursively finds all files ending with the specified suffix under the given directory.
 * @param dir The base directory to start searching from
 * @param suffix file suffix to match, e.g., '.ts' or '.js'
 * @returns An array of mached file paths
 */
export default function findBySuffix(dir: string, suffix: string): string[] {
  let files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(findBySuffix(fullPath, suffix)); // Recursively search in subdirectories
    } else if (entry.isFile() && entry.name.endsWith(suffix)) {
      files.push(fullPath); // Add file if it matches the suffix
    }
  }
  return files;
}
