/**
 * Claude Code Planflow Skills 테스트 스크립트
 *
 * 사용법:
 *   node test-commands.js
 *
 * 주의: 이 스크립트는 Claude Code CLI가 설치되어 있어야 합니다.
 */

const { spawn } = require('child_process');
const readline = require('readline');

class ClaudeCodeTester {
    constructor() {
        this.process = null;
        this.output = [];
    }

    async start() {
        return new Promise((resolve, reject) => {
            console.log('Starting Claude Code...');

            this.process = spawn('claude', [], {
                stdio: ['pipe', 'pipe', 'pipe'],
                shell: true
            });

            this.process.stdout.on('data', (data) => {
                const text = data.toString();
                this.output.push(text);
                process.stdout.write(text);
            });

            this.process.stderr.on('data', (data) => {
                process.stderr.write(data.toString());
            });

            this.process.on('error', (err) => {
                reject(err);
            });

            // Wait for Claude to be ready
            setTimeout(resolve, 3000);
        });
    }

    async sendCommand(command) {
        return new Promise((resolve) => {
            console.log(`\n>>> Sending: ${command}\n`);
            this.process.stdin.write(command + '\n');

            // Wait for response
            setTimeout(() => {
                resolve(this.output.slice(-5).join(''));
            }, 5000);
        });
    }

    async sendInput(input) {
        return new Promise((resolve) => {
            console.log(`>>> Input: ${input}`);
            this.process.stdin.write(input + '\n');
            setTimeout(resolve, 2000);
        });
    }

    stop() {
        if (this.process) {
            this.process.stdin.write('/exit\n');
            this.process.kill();
        }
    }
}

async function runTests() {
    const tester = new ClaudeCodeTester();

    try {
        await tester.start();

        console.log('\n=== Test 1: /boot command ===\n');
        await tester.sendCommand('/boot');

        console.log('\n=== Test 2: /planflow command ===\n');
        await tester.sendCommand('/planflow test-feature "테스트 기능"');

        // Respond to first question
        await tester.sendInput('no');

        console.log('\n=== Tests completed ===\n');

    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        tester.stop();
    }
}

// Run if called directly
if (require.main === module) {
    runTests().catch(console.error);
}

module.exports = { ClaudeCodeTester };
