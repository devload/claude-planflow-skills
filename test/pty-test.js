/**
 * node-pty를 사용한 Claude Code 자동화 테스트
 *
 * 설치: npm install node-pty
 * 실행: node pty-test.js
 */

const os = require('os');
const path = require('path');

async function main() {
    // Dynamic import for node-pty
    const pty = require('node-pty');

    const shell = os.platform() === 'win32' ? 'cmd.exe' : 'bash';
    const isWindows = os.platform() === 'win32';

    console.log('=== Claude Code PTY Test ===\n');

    const ptyProcess = pty.spawn(shell, [], {
        name: 'xterm-color',
        cols: 120,
        rows: 30,
        cwd: process.cwd(),
        env: process.env
    });

    let buffer = '';

    ptyProcess.onData((data) => {
        buffer += data;
        process.stdout.write(data);
    });

    // Helper function
    const sendAndWait = (cmd, waitMs = 3000) => {
        return new Promise((resolve) => {
            console.log(`\n>>> Sending: ${cmd}`);
            ptyProcess.write(cmd + '\r');
            setTimeout(() => resolve(buffer), waitMs);
        });
    };

    try {
        // Start claude
        await sendAndWait('claude', 5000);

        // Test /boot command
        await sendAndWait('/boot', 5000);

        // Test /planflow
        await sendAndWait('/planflow test "test feature"', 8000);

        // Answer first question
        await sendAndWait('no', 5000);

        // Exit
        await sendAndWait('/exit', 2000);

        console.log('\n\n=== Test Complete ===');

    } catch (err) {
        console.error('Error:', err);
    } finally {
        ptyProcess.kill();
    }
}

main().catch(console.error);
