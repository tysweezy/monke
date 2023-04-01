import { readFileSync } from 'fs';
import * as path from 'path';
import { Tokenizer } from './tokenizer';

const stdLibFile = path.join(__dirname, '../std/main.mnk');

function sourceInput(filepath: string): string {
	return readFileSync(stdLibFile, 'utf-8');	
}

const input = sourceInput(stdLibFile);
const tokenizer = new Tokenizer(input);
console.log(tokenizer);
console.log('formatted tokens: ', tokenizer.tokenize());