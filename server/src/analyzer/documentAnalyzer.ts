/**
 * Document Analyzer
 * Analyzes Jyro documents for errors and extracts symbols
 */

import { Diagnostic, DiagnosticSeverity } from 'vscode-languageserver/node';
import { getAllFunctionNames } from '../../../shared';

export interface SymbolInfo {
    name: string;
    type?: string;
    line: number;
    character: number;
}

export interface AnalyzerOptions {
    warnOnHostFunctions: boolean;
}

export class DocumentAnalyzer {
    private text: string;
    private uri: string;
    private lines: string[];
    private diagnostics: Diagnostic[] = [];
    private symbols: SymbolInfo[] = [];
    private options: AnalyzerOptions;

    // Keywords and tokens
    private readonly keywords = [
        'var', 'if', 'then', 'else', 'elseif', 'end', 'switch', 'do', 'case', 'default',
        'while', 'foreach', 'in', 'return', 'fail', 'break', 'continue',
        'true', 'false', 'null', 'and', 'or', 'not', 'is', 'Data'
    ];

    private readonly typeKeywords = ['number', 'string', 'boolean', 'object', 'array'];
    private readonly functionNames = getAllFunctionNames();

    constructor(text: string, uri: string, options: AnalyzerOptions = { warnOnHostFunctions: true }) {
        this.text = text;
        this.uri = uri;
        this.options = options;
        // Split on \n and remove any trailing \r (Windows line endings)
        this.lines = text.split('\n').map(line => line.replace(/\r$/, ''));
    }

    /**
     * Analyze the document and return diagnostics
     */
    public analyze(): Diagnostic[] {
        this.diagnostics = [];
        this.symbols = [];

        this.checkSyntax();
        this.extractSymbols();
        this.validateSemantics();

        return this.diagnostics;
    }

    /**
     * Get extracted symbols
     */
    public getSymbols(): SymbolInfo[] {
        if (this.symbols.length === 0) {
            this.extractSymbols();
        }
        return this.symbols;
    }

    /**
     * Basic syntax checking
     */
    private checkSyntax(): void {
        let blockStack: Array<{ type: string; line: number }> = [];
        let inLoop = 0;

        this.lines.forEach((line, lineIndex) => {
            const trimmed = line.trim();

            // Skip comments and empty lines
            if (trimmed.startsWith('#') || trimmed.length === 0) {
                return;
            }

            // Remove comments and string literals for keyword detection to avoid false positives
            const withoutComments = trimmed.replace(/#.*$/, '');
            const trimmedWithoutStrings = withoutComments.replace(/"[^"]*"/g, '""');

            // Check for unclosed strings
            const stringMatches = line.match(/"/g);
            if (stringMatches && stringMatches.length % 2 !== 0) {
                this.addDiagnostic(
                    lineIndex, 0, lineIndex, line.length,
                    'Unclosed string literal',
                    DiagnosticSeverity.Error
                );
            }

            // Check for unmatched brackets/parentheses/braces
            const openParen = (line.match(/\(/g) || []).length;
            const closeParen = (line.match(/\)/g) || []).length;
            const openBrace = (line.match(/\{/g) || []).length;
            const closeBrace = (line.match(/\}/g) || []).length;
            const openBracket = (line.match(/\[/g) || []).length;
            const closeBracket = (line.match(/\]/g) || []).length;

            // Check block structure (elseif is a continuation, not a new block)
            const startsWithElseif = /^\s*elseif\b/i.test(trimmed);
            if (!startsWithElseif && /\b(if|while|foreach|switch)\b/.test(trimmedWithoutStrings)) {
                const match = trimmedWithoutStrings.match(/\b(if|while|foreach|switch)\b/);
                if (match) {
                    blockStack.push({ type: match[1], line: lineIndex });
                    if (match[1] === 'while' || match[1] === 'foreach') {
                        inLoop++;
                    }
                }
            }

            if (/\bend\b/.test(trimmedWithoutStrings)) {
                if (blockStack.length === 0) {
                    this.addDiagnostic(
                        lineIndex, 0, lineIndex, trimmed.length,
                        'Unexpected "end" without matching block start',
                        DiagnosticSeverity.Error
                    );
                } else {
                    const block = blockStack.pop()!;
                    if (block.type === 'while' || block.type === 'foreach') {
                        inLoop--;
                    }
                }
            }

            // Check for break/continue outside loops
            if (/\b(break|continue)\b/.test(trimmedWithoutStrings) && inLoop === 0) {
                this.addDiagnostic(
                    lineIndex, 0, lineIndex, trimmed.length,
                    `"${trimmedWithoutStrings.includes('break') ? 'break' : 'continue'}" can only be used inside loops`,
                    DiagnosticSeverity.Error
                );
            }

            // Check for invalid type annotations (only in var declarations)
            // Pattern: var name: type - must start with 'var' to be a type annotation
            if (/^\s*var\s+/.test(trimmed)) {
                const typeAnnotMatch = trimmed.match(/^var\s+\w+\s*:\s*(\w+)/);
                if (typeAnnotMatch && !this.typeKeywords.includes(typeAnnotMatch[1])) {
                    const pos = line.indexOf(typeAnnotMatch[1]);
                    this.addDiagnostic(
                        lineIndex, pos, lineIndex, pos + typeAnnotMatch[1].length,
                        `Unknown type "${typeAnnotMatch[1]}". Expected: number, string, boolean, object, or array`,
                        DiagnosticSeverity.Error
                    );
                }
            }

            // Check for common operator errors
            if (/=[^=]/.test(trimmed) && /==/.test(trimmed)) {
                // Mix of = and ==, might be confusing but not necessarily an error
            }

            // Check for undefined functions (basic check)
            // PascalCase functions not in stdlib are likely host-provided, so show as Information
            // Pattern: any PascalCase identifier (starts with uppercase) followed by opening paren
            if (this.options.warnOnHostFunctions) {
                const funcCallPattern = /\b([A-Z][a-zA-Z0-9]*)\s*\(/g;
                let funcMatch;
                while ((funcMatch = funcCallPattern.exec(trimmedWithoutStrings)) !== null) {
                    const funcName = funcMatch[1];
                    // Skip keywords that happen to be PascalCase (like Data)
                    if (this.keywords.includes(funcName)) {
                        continue;
                    }
                    if (!this.functionNames.includes(funcName)) {
                        // Calculate correct position: leading whitespace + match position in trimmed
                        const leadingWhitespace = line.length - line.trimStart().length;
                        const pos = leadingWhitespace + funcMatch.index;
                        this.addDiagnostic(
                            lineIndex, pos, lineIndex, pos + funcName.length,
                            `Referenced function "${funcName}" will need to be made available at runtime`,
                            DiagnosticSeverity.Information
                        );
                    }
                }
            }
        });

        // Check for unclosed blocks
        if (blockStack.length > 0) {
            const unclosed = blockStack[blockStack.length - 1];
            this.addDiagnostic(
                unclosed.line, 0, unclosed.line, this.lines[unclosed.line].length,
                `Unclosed "${unclosed.type}" block - missing "end"`,
                DiagnosticSeverity.Error
            );
        }
    }

    /**
     * Extract variable declarations and other symbols
     */
    private extractSymbols(): void {
        const seenProps = new Set<string>();  // Track property assignments across entire document

        this.lines.forEach((line, lineIndex) => {
            const trimmed = line.trim();

            // Skip comments and empty lines
            if (trimmed.startsWith('#') || trimmed.length === 0) {
                return;
            }

            // Extract ALL variable declarations on the line (can be multiple or mid-line)
            const varPattern = /\bvar\s+(\w+)(?:\s*:\s*(\w+))?/g;
            let varMatch;
            while ((varMatch = varPattern.exec(trimmed)) !== null) {
                const varName = varMatch[1];
                const varType = varMatch[2];
                const pos = line.indexOf(varName, varMatch.index);

                this.symbols.push({
                    name: varName,
                    type: varType,
                    line: lineIndex,
                    character: pos
                });
            }

            // Extract foreach variables
            const foreachMatch = trimmed.match(/\bforeach\s+(\w+)\s+in\b/);
            if (foreachMatch) {
                const varName = foreachMatch[1];
                const pos = line.indexOf(varName);

                this.symbols.push({
                    name: varName,
                    type: 'iterator',
                    line: lineIndex,
                    character: pos
                });
            }

            // Extract property assignments (first assignment is the definition)
            // Pattern: identifier.property = (captures the full path like Data.orders)
            const propAssignPattern = /\b([a-zA-Z_]\w*(?:\.[a-zA-Z_]\w*)+)\s*=/g;
            let propMatch;
            while ((propMatch = propAssignPattern.exec(trimmed)) !== null) {
                const propPath = propMatch[1];  // e.g., "Data.orders"

                // Only track first assignment as the definition
                if (!seenProps.has(propPath)) {
                    seenProps.add(propPath);
                    const pos = line.indexOf(propPath);

                    this.symbols.push({
                        name: propPath,
                        type: 'property',
                        line: lineIndex,
                        character: pos
                    });
                }
            }
        });
    }

    /**
     * Validate semantics (undefined variables, etc.)
     */
    private validateSemantics(): void {
        const declaredVars = new Set<string>(this.symbols.map(s => s.name));
        declaredVars.add('Data'); // Data is always available

        this.lines.forEach((line, lineIndex) => {
            const trimmed = line.trim();

            // Skip comments and empty lines
            if (trimmed.startsWith('#') || trimmed.length === 0) {
                return;
            }

            // Remove string literals from the line before checking for variables
            // This prevents false positives for identifiers inside strings like "orderId"
            const lineWithoutStrings = line.replace(/"[^"]*"/g, '""');

            // Remove inline comments (everything after # when not in a string)
            const lineWithoutComments = lineWithoutStrings.replace(/#.*$/, '');

            // Find variable usage (simple pattern matching)
            // This is a basic implementation - a full solution would use the parser
            const varPattern = /\b([a-zA-Z_]\w*)\b/g;
            let match;
            while ((match = varPattern.exec(lineWithoutComments)) !== null) {
                const varName = match[1];
                const pos = match.index;
                const endPos = pos + varName.length;

                // Skip property access (identifiers after a dot)
                // In Jyro, any property can be auto-added to objects
                if (pos > 0 && lineWithoutComments[pos - 1] === '.') {
                    continue;
                }

                // Skip function calls (identifier followed by parenthesis)
                // PascalCase function calls are handled separately with Information severity in checkSyntax
                const afterIdent = lineWithoutComments.substring(endPos).match(/^\s*\(/);
                if (afterIdent) {
                    continue;
                }

                // Skip keywords and function names
                if (this.keywords.includes(varName) ||
                    this.typeKeywords.includes(varName) ||
                    this.functionNames.some((f: string) => f.toLowerCase() === varName.toLowerCase())) {
                    continue;
                }

                // Check if variable is declared
                if (!declaredVars.has(varName)) {
                    this.addDiagnostic(
                        lineIndex, pos, lineIndex, pos + varName.length,
                        `Undefined variable "${varName}"`,
                        DiagnosticSeverity.Warning
                    );
                }
            }
        });
    }

    /**
     * Add a diagnostic
     */
    private addDiagnostic(
        startLine: number,
        startChar: number,
        endLine: number,
        endChar: number,
        message: string,
        severity: DiagnosticSeverity
    ): void {
        this.diagnostics.push({
            severity,
            range: {
                start: { line: startLine, character: startChar },
                end: { line: endLine, character: endChar }
            },
            message,
            source: 'jyro'
        });
    }
}
