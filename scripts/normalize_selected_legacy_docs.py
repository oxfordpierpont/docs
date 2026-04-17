#!/usr/bin/env python3
"""Normalize selected legacy docs into Mintlify-friendly MDX pages.

References:
- Local docs config: ./docs.json
- Local Mintlify starter guidance: ./README.md
- https://www.mintlify.com/docs/organize/pages
- https://www.mintlify.com/docs/components
"""

from __future__ import annotations

import re
from pathlib import Path


ROOT = Path(__file__).resolve().parent.parent
REPORT_PATH = ROOT / "selected-doc-normalization-report.md"

EXPLICIT_TARGETS = [
    "knowledge-base/aiconnected-apps-and-modules/5-year-ai-business-landscape.mdx",
    "knowledge-base/aiconnected-apps-and-modules/mac-engine-prd.mdx",
    "knowledge-base/aiconnected-apps-and-modules/original-aiConnected-engines.mdx",
    "knowledge-base/aiconnected-apps-and-modules/modules/aiConnected-contact.mdx",
    "knowledge-base/aiconnected-apps-and-modules/modules/aiConnected-webinar.mdx",
    "knowledge-base/aiconnected-apps-and-modules/modules/legacy-siteGuide-prd.mdx",
    "knowledge-base/aiconnected-apps-and-modules/modules/aiConnected-voice/GoToConnect-integration-spec.mdx",
    "knowledge-base/aiconnected-apps-and-modules/modules/aiConnected-voice/aiConnected-voice-credentials-checklist.mdx",
    "knowledge-base/aiconnected-apps-and-modules/modules/aiConnected-voice/aiConnected-voice-deep-dive.mdx",
    "knowledge-base/aiconnected-apps-and-modules/modules/aiConnected-voice/aiConnected-voice-investor-explaination.mdx",
    "knowledge-base/aiconnected-apps-and-modules/modules/aiConnected-voice/aiConnected-voice-junior-dev-prd.mdx",
    "knowledge-base/aiconnected-apps-and-modules/modules/aiConnected-voice/complete-infra-stack.mdx",
    "knowledge-base/aiconnected-apps-and-modules/modules/aiConnected-voice/dev-env-setup-guide.mdx",
    "knowledge-base/aiconnected-apps-and-modules/modules/aiConnected-voice/readme.mdx",
    "knowledge-base/aiconnected-apps-and-modules/modules/aiConnected-voice/system-architecture.mdx",
    "knowledge-base/aiconnected-apps-and-modules/modules/aiConnected-voice/voice-pipeline-architecture.mdx",
    "knowledge-base/aiconnected-apps-and-modules/modules/aiConnected-voice/webrtc-bridge-technical-design.mdx",
    "knowledge-base/aiconnected-apps-and-modules/modules/kb-generator/ai-knowledge-training-system.mdx",
    "knowledge-base/aiconnected-apps-and-modules/modules/kb-generator/kb-generator-prompts.mdx",
    "knowledge-base/aiconnected-apps-and-modules/modules/kb-generator/kb-generator-readme.mdx",
    "knowledge-base/aiconnected-apps-and-modules/modules/kb-generator/kb-generator-template-sample.mdx",
    "knowledge-base/aiconnected-business-platform/ai-services-business-directory.mdx",
    "knowledge-base/aiconnected-business-platform/legacy-aiConnected-marketplace.mdx",
    "knowledge-base/aiconnected-business-platform/legacy-business-platform-specification.mdx",
    "knowledge-base/aiconnected-business-platform/legacy-platform-redesign-spec.mdx",
    "knowledge-base/aiconnected-business-platform/legacy-platform-sidebar-spec.mdx",
    "knowledge-base/aiconnected-supporting-docs/persona-ide-system-prompt.mdx",
]

FOLDER_ROOTS = [
    "knowledge-base/aiconnected-apps-and-modules/modules/funnelChat",
    "knowledge-base/neurigraph-memory-architecture",
]


def main() -> None:
    targets = collect_targets()
    report_lines = [
        "# Selected Legacy Doc Normalization Report",
        "",
        "References:",
        "- `docs.json`",
        "- `README.md`",
        "- https://www.mintlify.com/docs/organize/pages",
        "- https://www.mintlify.com/docs/components",
        "",
        f"- Normalized files: {len(targets)}",
        "",
        "## Updated Files",
        "",
    ]

    for source in targets:
        original_text = source.read_text(encoding="utf-8", errors="ignore")
        body, existing_title = split_frontmatter(original_text)
        body = strip_existing_info_blocks(body)
        title = existing_title or extract_title(body, source)
        if title.lower().startswith("readme.md"):
            title = extract_title(body, source)
        title = sanitize_metadata_text(title)
        description = build_description(body, title)
        original_reference = source.relative_to(ROOT).as_posix()
        destination = source
        if source.suffix.lower() == ".md":
            destination = source.with_suffix(".mdx")
            original_reference = source.relative_to(ROOT).as_posix()

        normalized_body = normalize_markdown_for_mdx(body)
        frontmatter = [
            "---",
            f'title: "{yaml_escape(title)}"',
            f'description: "{yaml_escape(description)}"',
            "---",
            "",
            "<Info>",
            f"Normalized for Mintlify from `{original_reference}`.",
            "</Info>",
            "",
        ]

        destination.write_text("\n".join(frontmatter) + normalized_body.rstrip() + "\n", encoding="utf-8")
        if destination != source and source.exists():
            source.unlink()

        report_lines.append(
            f"- `{original_reference}` -> `{destination.relative_to(ROOT).as_posix()}`"
        )

    REPORT_PATH.write_text("\n".join(report_lines) + "\n", encoding="utf-8")
    print(f"Normalized {len(targets)} file(s).")


def collect_targets() -> list[Path]:
    paths = {ROOT / rel for rel in EXPLICIT_TARGETS}
    for folder in FOLDER_ROOTS:
        root = ROOT / folder
        for path in root.rglob("*"):
            if path.is_file() and path.suffix.lower() in {".md", ".mdx"}:
                paths.add(path)
    return sorted(paths)


def split_frontmatter(text: str) -> tuple[str, str | None]:
    if not text.startswith("---\n"):
        return text, None
    end = text.find("\n---\n", 4)
    if end == -1:
        return text, None
    header = text[4:end]
    body = text[end + 5 :]
    title_match = re.search(r'^title:\s*"?(.*?)"?$', header, re.M)
    title = title_match.group(1).strip() if title_match else None
    return body.lstrip("\n"), title


def extract_title(body: str, source: Path) -> str:
    for line in body.splitlines():
        stripped = line.strip()
        if stripped.startswith("# "):
            title = strip_markdown(stripped[2:].strip())
            title = re.sub(r"^readme\.md\s*[-:–—]?\s*", "", title, flags=re.IGNORECASE)
            title = re.sub(r"\s*\{[^{}]*\}\s*$", "", title)
            return title
    title = source.stem
    title = title.replace("aiConnected", "aiConnected ")
    title = title.replace("-", " ")
    title = re.sub(r"\s+", " ", title).strip()
    return title


def build_description(body: str, title: str) -> str:
    lines = []
    in_info = False
    for raw in body.splitlines():
        stripped = raw.strip()
        if stripped in {"&lt;Info&gt;", "&lt;/Info&gt;"}:
            continue
        if stripped == "<Info>":
            in_info = True
            continue
        if stripped == "</Info>":
            in_info = False
            continue
        if in_info:
            continue
        if not stripped or stripped.startswith("# "):
            continue
        if stripped.startswith("**Version:**") or stripped.startswith("**Author:**"):
            continue
        if stripped.startswith("---"):
            continue
        lines.append(strip_markdown(stripped))
        if len(" ".join(lines)) >= 220:
            break

    description = " ".join(lines)
    description = re.sub(r"\s+", " ", description).strip()
    if not description:
        description = f"Mintlify-normalized documentation page for {title}."
    if len(description) > 160:
        description = description[:157].rstrip() + "..."
    return sanitize_metadata_text(description)


def strip_existing_info_blocks(body: str) -> str:
    lines = body.splitlines()
    cleaned = []
    index = 0

    while index < len(lines):
        stripped = lines[index].strip()
        if not stripped:
            index += 1
            continue

        if stripped == "<Info>":
            index += 1
            while index < len(lines) and lines[index].strip() != "</Info>":
                index += 1
            if index < len(lines):
                index += 1
            while index < len(lines) and not lines[index].strip():
                index += 1
            continue

        if stripped == "&lt;Info&gt;":
            index += 1
            while index < len(lines) and lines[index].strip() not in {"</Info>", "&lt;/Info&gt;"}:
                index += 1
            if index < len(lines):
                index += 1
            while index < len(lines) and not lines[index].strip():
                index += 1
            continue

        break

    cleaned.extend(lines[index:])
    return "\n".join(cleaned).lstrip("\n")


def strip_markdown(text: str) -> str:
    text = re.sub(r"`([^`]*)`", r"\1", text)
    text = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", text)
    text = re.sub(r"[*_>#-]", " ", text)
    text = text.replace("\\", "")
    return re.sub(r"\s+", " ", text).strip()


def sanitize_metadata_text(text: str) -> str:
    text = re.sub(r"<[^>]+>", " ", text)
    text = text.replace("&#123;", " ").replace("&#125;", " ")
    text = text.replace("&lt;", " ").replace("&gt;", " ")
    text = text.replace("{", " ").replace("}", " ")
    text = text.replace("|", " ")
    text = re.sub(r"\s+", " ", text).strip()
    return text


def yaml_escape(value: str) -> str:
    return value.replace("\\", "\\\\").replace('"', '\\"')


def normalize_markdown_for_mdx(body: str) -> str:
    lines = body.splitlines()
    result = []
    in_fence = False
    index = 0

    while index < len(lines):
        line = lines[index]
        stripped = line.strip()

        if stripped.startswith("```") or stripped.startswith("~~~"):
            in_fence = not in_fence
            result.append(line)
            index += 1
            continue

        if not in_fence and is_code_block_start(lines, index):
            block_lines, next_index = collect_code_block(lines, index)
            result.append("```text")
            result.extend(block_lines)
            result.append("```")
            index = next_index
            continue

        result.append(line if in_fence else escape_text_line(line))
        index += 1

    return "\n".join(result)


def is_code_block_start(lines: list[str], index: int) -> bool:
    stripped = lines[index].strip()
    if not stripped:
        return False
    snippet = "\n".join(lines[index : min(len(lines), index + 6)])
    if re.match(r"^\s*<([A-Za-z][\w:-]*)(\s+[^>]*)?>.*</\1>\s*$", stripped):
        return True
    if re.match(r"^\s*<(script|style|div|section|header|footer|main)\b", stripped):
        return True
    if stripped in {"{", "}", "};"}:
        return True
    if re.match(r'^\s*"[^"]+"\s*:\s*', stripped):
        return True
    if re.match(r"^\s*(const|let|var|function|return|if|for|import|export|from|class|def)\b", stripped):
        return True
    if re.match(r"^\s*[A-Z_][A-Z0-9_]*\s*=", stripped):
        return True
    if re.match(r"^\s*with\s+\w+", stripped):
        return True
    if re.match(r"^\s*[@.#][\w:-]+\s*\{", stripped):
        return True
    if re.match(r"^\s*\d+% \{", stripped):
        return True
    if "{" in stripped and (":" in stripped or "=>" in stripped or "..." in stripped):
        return True
    if stripped.startswith("{") and ("\n" in snippet or ":" in snippet):
        return True
    return False


def collect_code_block(lines: list[str], index: int) -> tuple[list[str], int]:
    block = []
    cursor = index
    blank_count = 0

    while cursor < len(lines):
        line = lines[cursor]
        stripped = line.strip()
        if not stripped:
            blank_count += 1
            if blank_count > 1:
                break
            block.append(line)
            cursor += 1
            continue

        blank_count = 0
        if cursor != index and not looks_like_code_continuation(stripped):
            break
        block.append(line)
        cursor += 1

    return block, cursor


def looks_like_code_continuation(stripped: str) -> bool:
    if re.match(r"^\s*(```|~~~)", stripped):
        return False
    if re.match(r"^\s*<([A-Za-z][\w:-]*)(\s+[^>]*)?>.*", stripped):
        return True
    if stripped in {"{", "}", "};"}:
        return True
    if re.match(r'^\s*"[^"]+"\s*:\s*', stripped):
        return True
    if re.match(r"^\s*[@.#][\w:-]+\s*\{", stripped):
        return True
    if re.match(r"^\s*\d+% \{", stripped):
        return True
    if re.match(r"^\s*(const|let|var|function|return|if|for|import|export|from|class|def)\b", stripped):
        return True
    if re.match(r"^\s*[A-Z_][A-Z0-9_]*\s*=", stripped):
        return True
    if re.match(r"^\s*with\s+\w+", stripped):
        return True
    if re.match(r"^\s*[)\]}],?\s*$", stripped):
        return True
    if stripped.endswith("{") or stripped.endswith("}") or stripped.endswith("};"):
        return True
    if stripped.endswith(";"):
        return True
    return False


def escape_text_line(line: str) -> str:
    placeholders = []

    def hold(match: re.Match[str]) -> str:
        placeholders.append(match.group(0))
        return f"@@PLACEHOLDER{len(placeholders) - 1}@@"

    protected = re.sub(r"`[^`]*`", hold, line)
    protected = re.sub(r"\[([^\]]+)\]\(([^)]+)\)", hold, protected)
    protected = protected.replace("{", "&#123;").replace("}", "&#125;")
    protected = re.sub(
        r"<([A-Za-z][^>\n]*)>",
        lambda match: "&lt;" + match.group(1) + "&gt;",
        protected,
    )

    for idx, original in enumerate(placeholders):
        protected = protected.replace(f"@@PLACEHOLDER{idx}@@", original)
    return protected


if __name__ == "__main__":
    main()
