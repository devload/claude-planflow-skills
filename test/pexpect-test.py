"""
wexpect를 사용한 Claude Code 자동화 테스트 (Windows)

설치: pip install wexpect
실행: python pexpect-test.py
"""

import sys
import time

def test_with_wexpect():
    import wexpect

    print("=== Claude Code wexpect Test ===\n")

    # Start Claude Code
    child = wexpect.spawn('claude')

    # Wait for prompt
    time.sleep(3)
    print(child.before if hasattr(child, 'before') else "Started...")

    # Test /boot
    print("\n>>> Testing /boot")
    child.sendline('/boot')
    time.sleep(5)

    # Test /planflow
    print("\n>>> Testing /planflow")
    child.sendline('/planflow test "test feature"')
    time.sleep(8)

    # Answer question
    print("\n>>> Answering 'no'")
    child.sendline('no')
    time.sleep(5)

    # Exit
    child.sendline('/exit')
    time.sleep(2)

    print("\n=== Test Complete ===")
    child.close()


def test_with_subprocess():
    """Fallback using subprocess"""
    import subprocess

    print("=== Claude Code Subprocess Test ===\n")
    print("Note: This is limited - interactive mode may not work well\n")

    # Simple command test
    result = subprocess.run(
        ['claude', '--help'],
        capture_output=True,
        text=True,
        timeout=10
    )

    print("STDOUT:", result.stdout[:500] if result.stdout else "None")
    print("STDERR:", result.stderr[:500] if result.stderr else "None")


if __name__ == '__main__':
    try:
        test_with_wexpect()
    except ImportError:
        print("wexpect not installed. Install with: pip install wexpect")
        print("Falling back to subprocess test...\n")
        test_with_subprocess()
    except Exception as e:
        print(f"Error: {e}")
        test_with_subprocess()
