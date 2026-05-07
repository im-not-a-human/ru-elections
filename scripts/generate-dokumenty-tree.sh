#!/bin/bash
# Generates assets/js/data/dokumenty-tree.json from research/compromat/05-evidence/
# Usage: bash scripts/generate-dokumenty-tree.sh

set -euo pipefail

cd "$(dirname "$0")/.."

ROOT="research/compromat/05-evidence"
OUT="assets/js/data/dokumenty-tree.json"

if [ ! -d "$ROOT" ]; then
  echo "ERROR: $ROOT not found" >&2
  exit 1
fi

mkdir -p "$(dirname "$OUT")"

python3 -c '
import json
import os
from pathlib import Path

root = Path("research/compromat/05-evidence")

def walk(p):
    if p.is_file():
        return {
            "name": p.name,
            "type": "file",
            "size": p.stat().st_size,
            "ext": p.suffix.lstrip(".").lower()
        }
    children = []
    for child in sorted(p.iterdir(), key=lambda x: (x.is_file(), x.name)):
        if child.name.startswith("."):
            continue
        children.append(walk(child))
    return {
        "name": p.name,
        "type": "dir",
        "children": children
    }

tree = walk(root)
with open("assets/js/data/dokumenty-tree.json", "w", encoding="utf-8") as f:
    json.dump(tree, f, ensure_ascii=False, indent=2)

# Print summary
def count(n):
    if n["type"] == "file":
        return 1
    return sum(count(c) for c in n.get("children", []))

top = len(tree["children"])
print(f"Tree generated: {count(tree)} files in {top} top-level dirs")
'

echo "Done. Run again after adding new evidence files."
