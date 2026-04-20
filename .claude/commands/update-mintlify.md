# Update Mintlify Skill

You are helping the user publish a new document to the Mintlify docs site at oxfordpierpont/docs. The user has written a document (typically as a Claude artifact) and wants it pushed to GitHub and registered in the navigation.

## Step 1 — Collect placement information

Ask the user the following questions **together in a single message** so they can answer all at once:

1. **Document title** — What should the page be titled? (Used for the navigation label if the markdown frontmatter doesn't define one.)
2. **Filename / slug** — What should the file be named? (e.g. `my-new-doc`, no extension, no spaces.) If the user isn't sure, suggest a kebab-case version of the title.
3. **Folder path** — Which folder in the repo should this file live in? Show the user the top-level knowledge-base folders as options:
   - `knowledge-base/aiconnected-business-platform/`
   - `knowledge-base/aiconnected-business-platform/industry-templates/`
   - `knowledge-base/aiconnected-os/`
   - `knowledge-base/aiconnected-apps-and-modules/`
   - `knowledge-base/neurigraph-memory-architecture/`
   - `knowledge-base/aiconnected-supporting-docs/`
   - `knowledge-base/papers-and-research/`
   - Or a custom path they specify.
4. **Navigation placement** — Which tab and group in `docs.json` should this page appear under? Show the user the Knowledge Base tab groups as options (Business Platform, aiConnected OS, Apps & Modules, Industry Templates, Neurigraph Memory Architecture, Supporting Documentation, Papers & Research, etc.) and ask whether it should be added at the end of an existing group or inside a nested subgroup.
5. **Document content** — Ask the user to paste the full markdown content of the document (the artifact).

## Step 2 — Confirm before acting

Summarize what you are about to do in a short list:
- File path that will be created
- Where in `docs.json` the page reference will be added

Ask: "Does this look right? I'll go ahead once you confirm."

## Step 3 — Execute

Once confirmed, perform all of the following:

### 3a. Create the file in GitHub

Use `mcp__github__create_or_update_file` with:
- `owner`: `oxfordpierpont`
- `repo`: `docs`
- `path`: the full file path (e.g. `knowledge-base/aiconnected-business-platform/industry-templates/my-new-doc.md`)
- `message`: `Add [document title] to [folder name]`
- `content`: the markdown content base64-encoded
- `branch`: `claude/update-docs-navigation-TZiTA`

### 3b. Update docs.json locally

Read `/home/user/docs/docs.json`, add the new page slug to the correct group in the `navigation.tabs` array, then write the file.

The page slug format is the file path **without** the `.md` extension (e.g. `knowledge-base/aiconnected-business-platform/industry-templates/my-new-doc`).

### 3c. Commit and push docs.json

```
git add docs.json
git commit -m "Add [document title] to Mintlify navigation"
git push -u origin claude/update-docs-navigation-TZiTA
```

## Step 4 — Confirm completion

Tell the user:
- The file was created at `[full path]`
- The navigation entry was added under `[Tab > Group]`
- Changes are pushed to branch `claude/update-docs-navigation-TZiTA`
