# Codebase Component Redesign
Your task fully depends on you strictly adhering and following all the instructions provided below.

## In Brief:
You will go through each page screen file inside `src/apps` directory, along with all of its already-extracted component and data files, one by one per `strict chain process`, and redesign every resulting component to meet the `strict design expectations` below. This is a fresh task independent of any prior refactor history — treat the current state of the codebase as the only source of truth.

`Strict design expectations` from every single resulting redesigned component:
: Must be fully reactive to all activity from user and relative changes to data and state.
: Must be seamless with organic and natural human interactivity baked into its core by default.
: Must be designed with eye-catching expressive behavior to overall data and state changes across.
: Must be animated with ultra smooth effects and fluid transitions leaving nothing janky or static.
: Must be mapped with quality of life experiences with automatic triggers, gestures and shortcuts.

`Strict carried-over expectations` from the refactor, still required and equally enforced during redesign:
: Must be highly tailored and curated specifically to the purpose within the healthcare industry.
: Must be readily apparent on exact nature, utility, priority, urgency, data, state and activity.
: Must be intentionally planned with direct and clear data with no room for misinterpretations.
: Must be structurally segregated into multiple abstract and specific sub component layers using existing or new components if required.
: Must be operationally bounded into layers of shared data and dynamic state across dependency, using only the data/state and communication pathways that already exist. Never introduce a new shared context, event bus, subscription, global store, or API call to enable reactivity — reactivity must be built entirely from data/state that already flows to that component.
: Component and directory naming must remain fully normalized to a proper component focused structure, not specific purpose or page focused.
: Must never retain a single comment, developer note or reference information anywhere in any component, data, or page file.

`Strict design integrity boundaries`:
: Underlying data, business logic, and state transitions must never be altered in meaning. Only how they are visually communicated and interacted with may change.
: All animation must use only GPU-accelerated properties (transform, opacity). Never animate layout-triggering properties (width, height, top, left, margin, etc).
: All motion must respect `prefers-reduced-motion` and degrade to an instant, non-animated state when it is set.
: Every new gesture, shortcut, or automatic trigger must have a visible, discoverable affordance. A hidden interaction that cannot be discovered without being told about it is never acceptable.
: Redesign work must never be forced onto a component that is intentionally static or structural in nature (e.g. a divider, a layout container, a purely typographic element). Forcing motion, gesture, or reactivity onto such a component violates the clarity and no-misinterpretation expectation above.

`Strict scope boundary`:
: Must never read, explore, reference, or modify any directory other than `src/apps`, `src/components`, `src/data`, and `docs` (docs only for logging to `redesign_map`).
: Must never assume a shared utility, hook, animation library wrapper, or dependency lives outside these directories. If something appears to be missing from within these directories, it must be treated as something to build within `src/components` or `src/data`, never fetched from elsewhere.

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
- [IF] the exact tree for `src/apps`, `src/components` and `src/data` was already fetched earlier in this same conversation and no file within it has since been created, moved, or deleted, must not re-run initial stage. Must read from memory and immediately jump to the discovery phase skipping the stage instructions entirely.
- [IF] the tree does not meet the exact condition above due to fresh chat, heavy compression, memory corruption, context rot, or any file having since been created/moved/deleted, must not assume anything, Must immediately proceed with the stage instructions.

## Stage Instructions:
- Use tree command on `src/apps`, `src/components`, and `src/data` directories to fetch the full file trees of the code file hierarchy. Never assume directories or files.
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

[ANALYSIS PHASE]: (Response 3):

Prechecks:
- Analyze all the files fetched and audit everything ruthlessly against the `strict design expectations` and `strict carried-over expectations`.

## Stage Instructions:
- Build the **redesign plan** identifying, per component, exactly what reactive behavior, interactivity, motion, and quality-of-life mapping it currently lacks or has done poorly.
- For every item in the **redesign plan**, identify the existing data/state pathway already available to that component that the new reactivity must be built from. Never plan around data/state that does not already reach that component.
- Compare the **redesign plan** against the **components list** and the **data list** to speculate if any shared motion primitive, interaction pattern, or component already exists that can be reused rather than duplicated.
- Build a **speculation list** of the required shared files based on the comparative analysis conducted.

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
- Directly cross check the code of the fetched list against the requirements of the **redesign plan**.

## Post-Checks:
- [IF] any of the fetched components/patterns can be reused for any item from the **redesign plan** via merging, altering or appending them directly, then rewrite the **redesign plan** accordingly.
- [ELSE] maintain the **redesign plan** as it stays completely discarding the **speculation list** and proceed on ahead with the response.

## Response Expected:
- Full final **redesign plan** detailed with all requirements clearly described, including for each component: what reactive/motion/interaction behavior is being added, and which existing data/state pathway it is built from.

> Note: Must not rush into implementation stage until I confirm everything with "Proceed". Must not rush into any assumptions.

[IMPLEMENTATION STAGE]: (Response 5):

## Pre-Checks:
None. Proceed to the stage instructions.

## Stage Instructions:
- Strongly enforce the `strict design integrity boundaries` and implementation conditions listed below while strictly following the response expected.
  - Underlying data, business logic, and state transitions must render the exact same functional results as before redesign. Only presentation and interaction may change.
  - Component file names and containing directory names must be fully normalized to a proper component focused structure not specific purpose or page focused.
  - Code must never retain a single comment, developer note or reference information anywhere in any component, data, or page file.

## Response Expected:
- Code block with `mkdir` command to create the directories required if related directories are missing as per the **redesign plan**.
- Code block with `cat > path << 'EOF' ... EOF` wrapped commands to rebuild the components exactly as per the **redesign plan** into the proper directory structure with all code inside a single code block.
- Code block with `cat > path << 'EOF' ... EOF` wrapped commands to alter or rebuild the required seed or dynamic data into the files within the `src/data` directory as per the **redesign plan**.
- Code block with `cat > path << 'EOF' ... EOF` wrapped commands to restructure the app screen page file from the resulting component and data file structure.

## Post-Checks:
None. Proceed to wait.

> Note: Must not rush into the motion integrity check stage until I confirm everything with "Proceed". Must not rush into any assumptions.

[MOTION & INTERACTION INTEGRITY CHECK STAGE]: (Response 6):

## Pre-Checks:
- [IF] this is the 3rd consecutive time re-entering this stage for the same page file, must not loop back to implementation again regardless of outcome. Must stop, flag the specific unresolved conflict plainly, and wait for my direction before proceeding.
- [ELSE] proceed with the stage instructions.

## Stage Instructions:
- First classify each redesigned component as either "structural/static" (a component whose purpose is layout or division with no meaningful state or user-facing activity, e.g. a divider, a section container, a purely typographic label) or "interactive/dynamic" (anything else). Apply the checks below according to this classification.
- Analyze the new component files to check if any of them fail a single one of these conditions:
  - [IF] Classified as "interactive/dynamic" and shows no visible feedback, transition, or reactive behavior despite handling user activity or data/state change, add what is required using only existing data/state pathways.
  - [IF] Classified as "structural/static" and has had motion, gesture, or automatic triggers forced onto it with no functional purpose, strip it back to its intentionally static form.
  - [IF] Any animation targets a layout-triggering property instead of transform/opacity, rewrite it to use GPU-accelerated properties only.
  - [IF] Any animation does not degrade correctly under `prefers-reduced-motion`, add the required handling.
  - [IF] Any new gesture, shortcut, or automatic trigger has no visible, discoverable affordance, add one or remove the interaction.
  - [IF] Any reactivity requires a new global store, new context, new subscription, or new API call that did not already exist for that component, revert it to use only the data/state pathway already available, and reform the **redesign plan** for that component.
  - [IF] Contains just a decorative wrapper with no real interaction ownership, or a single component doing the reactive job of several unrelated concerns, reform **redesign plan** properly for fixes, and re-run once again back from implementation stage.

## Post-Checks:
- Re-Run the stage instructions until all conditions are satisfied, subject to the 3-attempt cap in Pre-Checks.

## Response Expected: 
[IF] **Redesign plan** is rebuilt:
  - Fixed **redesign plan** with all the expected fixes satisfying all conditions.
  - Re-run of the full implementation stage with rewritten **redesign plan**.
[ELSE]:
  - Crisp summarized explanation of the complete analysis. 

> Note: Must not rush into hygiene stage until I confirm everything with "Proceed". Must not rush into any assumptions.

[HYGIENE CHECK STAGE]: (Response 7):

## Pre-Checks:
None. Proceed with the stage instructions.

## Stage Instructions:
- Deeply cross-check all the files modified against industry standards, the `strict design expectations`, `strict carried-over expectations`, and `strict design integrity boundaries` to confirm if code quality, performance, and accessibility hygiene is fully ensured.

## Post-Checks:
None. Proceed with the response expected.

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
None. Proceed with the response expected.

## Response Expected:
[IF] any issues exist:
  - Code block with `cat > path << 'EOF' ... EOF` commands to provide direct resolutions.
  - Re-run stage instructions again to check if any issues persists.
[ELSE]:
  - Crisp summarized explanation of the verification state.
  - Code block with the `cat > path << 'EOF' ... EOF` commands to update the progression inside the `redesign_map` document within the `docs` directory.

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
