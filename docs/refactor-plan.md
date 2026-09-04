# Codebase Component Refactor
Your task fully depends on you strictly adhering and following all the instructions provided below.

## In Brief:
You will go through each page screen file inside `src/apps` directory that has been inefficiently refactored failing to meet several expectations. each app page screen file one by one per `strict chain process` and fix everything that fails the rules exactly as instructed in the `strict chain process` below.

`Strict expectations` from every single resulting refactored component:
: Must be highly tailored and curated specifically to the purpose within the healthcare industry.
: Must be readily apparent on exact nature, utility, priority, urgency, data, state and activity.
: Must be intentionally planned with direct and clear data with no room for misinterpretations.
: Must be structurally segregated into multiple abstract and specific sub component layers using existing or new components if required.
: Must be operationally bounded into layers of shared data and dynamic state across dependency, using only the data/state and communication pathways that already existed before the refactor.
: Must preserve any cross-component data or state relationships exactly as they existed before refactor. Never introduce new shared context, event bus, subscription, or communication pathways that did not already exist. If components must share data or state, it must be wired using the same mechanism (props, existing context, existing store) that was already present in the original page, never a new one invented during refactor.

`Strict scope boundary`:
: Must never read, explore, reference, or modify any directory other than `src/apps`, `src/components`, `src/data`, and `docs` (docs only for logging to `refactor_map`).
: Must never assume a shared utility, hook, or dependency lives outside these directories. If something appears to be missing from within these directories, it must be treated as something to build within `src/components` or `src/data`, never fetched from elsewhere.

`Strict conditions` for how you must respond in this conversation:
: Never break this response structure: Any Explanation (Plain Text) —> Any Code/Command (Code Block)
: Never recite anything back to me as long breakdown summaries.
: Never use sed awk bash python or any other shortcuts commands.
: Never give any instructions back to me. Follow the `strict chain process`.
: Never write ``` or ```bash or plain text in between any code blocks.
: Never output any internal monologies or self doubt inside responses.
: Never write header or footer plain text for any code blocks in response.

---

`Strict chain process` to follow:
The `strict chain process` is a back and forth process where you strictly follow each stage exactly as proposed looping through their conditional instructions until completed to move on to each next stage exactly as instructed. No excuses or shortcuts ever allowed. Breaking any procedure will result in rejection over the entire response even if the contents within the response are correct.

[INITIAL STAGE]: (Response 1):

## Pre-Checks:
- [IF] the exact tree for `src/apps`, `src/components` and `src/data` was already fetched earlier in this same conversation and no file within it has since been created, moved, or deleted, must not re-run initial stage. Must read from memory and immediately jump to the discovery stage skipping the stage instructions entirely.
- [IF] the tree does not meet the exact condition above due to fresh chat, heavy compression, memory corruption, context rot, or any file having since been created/moved/deleted, must not assume anything, Must immediately proceed with the stage instructions.

## Stage Instructions:
- Use `tree` + `xclip` command on `src/apps`, `src/components`, and `src/data` directories to fetch the full file trees of the code file hierarchy. Never assume directories or files.
- Absorb the src trees into your context memory as the **apps list**, **components list** and the **data list**.

## Post-Checks:
None. Proceed to response.

## Response Expected:
- Crisply summarized explanation of the understanding gained from the fully absorbed file trees.
- Code block with `find` + `xclip` command to fetch the page as required from `src/apps`/[app] directory.

> Note: Must wait for the code requested. Must not rush into any assumptions.

[DISCOVER STAGE]: (Response 2):

## Pre-Checks:
- Analyze the fetched page screen file completely to understand its current state clearly.

## Stage Instructions:
- Build a current **in-use list** from the components, data, seed and other files used in the file. Ignore all vendor or library imports.
    
## Post-Checks:
- [IF] the exact code from all required files was already fetched earlier in this same conversation and has not since been modified, must not re-run discovery stage again. Must read from memory and immediately jump to the analysis stage skipping the response entirely.
- [IF] the code from required files does not meet the exact condition above due to fresh chat, heavy compression, memory corruption, context rot, or having since been modified, must not assume anything, Must immediately proceed with the response.

## Response Expected:
- Crisply summarized explanation of the understanding gained from the full current file state analysis.
- Code block with `find` + `xclip` command to fetch the files required as per the current **in-use list** from `src/components` and `src/data` directories using the paths from the **components list** the **data list** as planned.

> Note: Must wait for all the code requested. Must not rush into any assumptions.

[ANALYSIS STAGE]: (Response 3):

Prechecks:
- Analyze all the files fetched and audit everything ruthlessly against the `strict expectations`.

## Stage Instructions:
- Build the **refactor plan** for a full list of component and seed data files to be extracted and rebuilt from all the files audited.
- Compare the **refactor plan** against the **components list** and the **data list** to speculate if any already exist that can be utilized.
- Build a **speculation list** of the required components based on the comparitive analysis conducted.

## Post-Checks:
- [IF] the exact code from all required files was already fetched earlier in this same conversation and has not since been modified, must not re-run discovery stage again. Must read from memory and immediately jump to the cross check stage skipping the response entirely.
- [IF] the code from required files does not meet the exact condition above due to fresh chat, heavy compression, memory corruption, context rot, or having since been modified, must not assume anything, Must immediately proceed with the response.

## Response Expected:
- Crisply summarized explanation of the understanding gained from the full audit analysis.
- Code block with `find` + `xclip` command to fetch all the files required as per the **speculation list** from `src/components` and `src/data` directories using the paths from the **components list** and the **data list** as planned.

> Note: Must wait for the code requested. Must not rush into any assumptions.

[CROSS CHECK STAGE]: (Response 4):

## Pre-Checks:
None. Proceed with stage instructions.

## Stage Instructions:
- Directly cross check the code of the fetched list against the requirements of the **refactor plan**.

## Post-Checks:
- [IF] any of the fetched components can be utilized for any components from the **refactor plan** via merging, altering or appending them directly, then rewrite the **refactor plan** accordingly.
- [ELSE] maintain the **refactor plan** as it stays completely discarding the **speculation list** and proceed on ahead with the response.

## Response Expected:
- Full final **refactor plan** detailed with all requirements clearly described.

> Note: Must not rush into implementation stage until I confirm everything with "Proceed". Must not rush into any assumptions.

[IMPLEMENTATION STAGE]: (Response 5):

## Pre-Checks:
None. Proceed to the stage instructions.

## Stage Instructions:
- Strongly enforce the implementation conditions listed below while strictly following the response expected.
  - Code must render the exact same results as before refactor. This applies to what the result produces and renders, not to which file the code physically lives in.
  - Code must be never be iterated on or modified over style, design, structure, animation, effect, content, preference or logic that alters output.
  - Component file names and containing directory names must be fully normalized to a proper component focused structure not specific purpose or page focused.
  - Code must never retain a single comment, developer note or reference information anywhere in any component, data, or page file.

## Response Expected:
- Code block with `mkdir` command to create the directories required if related directories are missing as per the **refactor plan**.
- Code block with `cat > path << 'EOF' ... EOF` wrapped commands to rebuild the components exactly as per the **refactor plan** into the proper directory structure with all code inside a single code block.
- Code block with `cat > path << 'EOF' ... EOF` wrapped commands to alter or rebuild the required seed or dynamic data into the files within the `src/data` directory as per the **refactor plan**.
- Code block with `cat > path << 'EOF' ... EOF` wrapped commands to restructure the app screen page file from the resulting component and seed data file structure.

## Post-Checks:
None. Proceed to wait.

> Note: Must not rush into the wrapper check stage until I confirm everything with "Proceed". Must not rush into any assumptions.

[WRAPPER CHECK STAGE]: (Response 6):

## Pre-Checks:
- [IF] this is the 3rd consecutive time re-entering this stage for the same page file, must not loop back to implementation again regardless of outcome. Must stop, flag the specific unresolved conflict plainly, and wait for my direction before proceeding.
- [ELSE] proceed with the stage instructions.

## Stage Instructions:
- First classify each new component as either "presentational/atomic" (a component whose sole job is mapping props directly to markup with no meaningful local decision-making, e.g. a badge, icon, label, status dot) or "behavioral" (anything else). Apply the checks below according to this classification.
- Analyze the new component files to check if any of them fail a single one of these conditions:
  - [IF] Contains page level logic, defined as logic that orchestrates more than one sibling component, or handles routing, or handles top-level data fetching for the page, transfer it back to the page file.
  - [IF] Classified as "behavioral" and contains no state, computed values, conditional logic, or local behavior, add what is required. Never apply this to a component classified as "presentational/atomic" — those are permitted and expected to have no local state or logic.
  - [IF] Contains just a thin wrapper or a massive code dump, Reform **refactor plan** properly for fixes. and re-run once agian back from implementation stage.
  - [IF] Classified as "behavioral" and contains only JSX and forwarded props, merge it with its related component layers.

## Post-Checks:
- Re-Run the stage instructions until all conditions are satisfied, subject to the 3-attempt cap in Pre-Checks.

## Response Expected: 
[IF] **Refactor plan** is rebuit:
  - Fixed **refactor plan** with all the expected fixes sastisfying all conditions.
  - Re-run of the full implementation stage with rewritten **refactor plan**.
[ELSE]:
  - Crisp summarized explanation of the complete analysis. 

> Note: Must not rush into hygiene stage until I confirm everything with "Proceed". Must not rush into any assumptions.

[HYGIENE CHECK STAGE]: (Response 7):

## Pre-Checks:
None. Proceed with the stage instructions.

## Stage Instructions:
- Deeply cross-check all the files modified against industry standards and the `strict expectations` to confirm if code quality and hygiene is fully ensured.

## Post-Checks:
None. Proceed with the response expcted.

## Response expected:
[IF] any issues exist:
  - Code block with `cat > path << 'EOF' ... EOF` commands to provide direct resolutions.
  - Re-run stage instructions again to check if any issues persists.
[ELSE]:
  - Crisp summarized explanation of the code hygiene state.
  - Code block with the `npx`, `typescript` and `husky` lint commands to check for any potential warnings, errors, unused imports, missing files, wrong variables, etc.,

> Note: Must wait for me to confirm all the result of all checks. Must not rush into the verification check stage until I confirm everything with "Proceed". Must not rush into any assumptions.

[VERIFICATION STAGE]: (Response 8):

## Pre-Checks:
None. Proceed with the stage instructions.

## Stage Instructions:
- Analyze the result of all the verification checks run to understand the situation clearly.

## Post-Checks:
None. Proceed with the response expcted.

## Response Expected:
[IF] any issues exist:
  - Code block with `cat > path << 'EOF' ... EOF` commands to provide direct resolutions.
  - Re-run stage instructions again to check if any issues persists.
[ELSE]:
  - Crisp summarized explanation of the verification state.
  - Code block with the `cat > path << 'EOF' ... EOF` commands to update the progression inside the `refactor_map` document within the `docs` directory.

> Note: Must wait for the confirmation on all the checks. Must not rush into the commit stage until I confirm everything with "Proceed". Must not rush into any assumptions.

[COMMIT STAGE]: (Response 9):

## Pre-Checks:
- Add the current page file to a running **batch tracker** held in memory across this conversation.
- [IF] the **batch tracker** holds fewer than 3 completed page files, must not run this stage. Must skip commit stage entirely and proceed straight to resetting the loop for the next file in the app.
- [ELSE] proceed with the stage instructions using all page files currently held in the **batch tracker**, then clear the **batch tracker** once the commit response is given.

## Stage Instructions:
- Separate all altered files across every page in the **batch tracker** into stable batches.
- Git commands over all batches must strictly follow these conditions.
  - Staging must be done specifically over the files within the batches, not the complete directory.
  - Commit titles must follow universal commit conventions and must summarize the full progress in one line.
  - Commit descriptions must be written as clean bullet points each in very simple, human readable english. Not technical jargon dumps containing code or variables from resulting changes.

## Post-Checks:
None. Proceed to the response expected.

## Response Expected:
  - Code block with `git add [file paths]` and `git commit -m [Commit title + Detailed commit description]` command.
  - Repeat writing git commands for each batch until all batches are complete.

> Note: All git commands must be written inside a single code block within the same response. Commit stage only produces output once 3-5 page files have accumulated in the **batch tracker**, per Pre-Checks.

---

On completing the final commit stage, or on skipping it per the **batch tracker** condition, the loop must be reset going back to the next file in the app. No shortcuts or skipping will ever be allowed other than what is already conditionally described within each stage.
