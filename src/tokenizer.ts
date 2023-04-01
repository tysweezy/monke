enum TokenType {
	NAME = 'NAME',
	FUNCTION = 'FUNCTION',
	LPAREN = 'LPAREN',
	RPAREN = 'RPAREN',
	FNBLOCK = 'FNBLOCK',
	WHITESPACE = 'WHITESPACE',
	NEWLINE = 'NEWLINE'
};

type Token = {
	type: string,
	value: string,
};

export class Tokenizer {
	private input: string;
	private position: number = 0;

	constructor (input: string) {
		this.input = input;
	}

	tokenize(): Token[] {
		const tokens: Token[] = [];

		while ( this.position < this.input.length ) {
			const char = this.input[this.position]
			if ( char === 'fn' ) {
				tokens.push({ type: TokenType.FUNCTION, value: 'fn' });
				this.position++;
			} else if (char === ':') {
				tokens.push({ type: TokenType.FNBLOCK, value: ':' });
				this.position++;	
			}  else if ( char === '(' ) {
				tokens.push({ type: TokenType.LPAREN, value: '(' });
				this.position++;	
			} else if ( char === ')' ) {
				tokens.push({ type: TokenType.RPAREN, value: ')' });
				this.position++;
			} else if ( char === '\n' )  {
				tokens.push({ type: TokenType.NEWLINE, value: '\n' });
				this.position++;	
			} else if ( /[a-z]+/.test(char) ) {
				const value = this.readName()
				tokens.push({ type: TokenType.NAME, value })
			} else if ( /\s/g.test(char) ) {
				// check for white space
				tokens.push({ type: TokenType.WHITESPACE, value: 'WHITESPACE' })
				this.position++;
			} else {
				throw new Error('Unexpected character: ' + char);
			}
		}

		return tokens;
	}

	readName(): string {
		let value = ''
		while (/[a-z]+/.test(this.input[this.position])) {
		  value += this.input[this.position]
		  this.position++
		}
		return value
	  }
}