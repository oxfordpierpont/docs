# Skill Acquisition via Hands-On Apprenticeship

**Feature Area:** Neurigraph Memory Architecture → Skill Acquisition Sub-System
**Classification:** Advanced / Roadmap Feature (Phase 4+)
**Status:** Documented for future implementation

---

## What This Is

The Apprenticeship Acquisition Model is one of three primary pathways through which a Persona can acquire a new skill slot. Unlike structured training (consuming pre-packaged lessons, videos, or documents) or passive inference (absorbing patterns from repeated task exposure), the Apprenticeship Model is a **deliberate, relational, extended transfer of knowledge** between a human expert and a Persona over time.

This mirrors how humans actually become proficient at complex, judgment-heavy disciplines — not through reading a manual, but through doing real work alongside someone who already knows how to do it, receiving correction in real-time, and internalizing not just the "what" but the "why" and "when."

---

## Why This Acquisition Mode Exists

Structured training works well for well-documented domains. But many of the most valuable skills a Persona could acquire are not well-documented — they are tacit, contextual, and relational. Sales judgment, creative direction, editorial instinct, diagnostic reasoning, negotiation feel — these do not transfer cleanly through documents or quizzes. They transfer through exposure, correction, imitation, and iteration.

The Apprenticeship Model exists because the Neurigraph architecture is uniquely positioned to support this kind of learning. The knowledge graph structure, the separation of short and long-term memory layers, and the Closed Thinking Layer (CTL) all make it possible to faithfully record and consolidate tacit knowledge as it emerges organically across sessions.

---

## The Core Structure

An Apprenticeship is a formally declared, bounded learning relationship between a specific human (the **Mentor**) and a specific Persona (the **Apprentice**), focused on one designated skill slot.

It has three defining characteristics that separate it from general chat or task work:

**One-on-one.** The relationship is exclusive in scope. The Mentor is the designated knowledge authority for this skill slot during the apprenticeship period. Their instructions, corrections, preferences, and demonstrations carry elevated memory weight compared to inputs from other sources.

**Hands-on.** Learning occurs through doing, not watching. The Persona is given real tasks within the skill domain, produces real outputs, and receives real feedback. Neurigraph records not just the outcome but the correction loop — what was wrong, what was adjusted, what the Mentor affirmed.

**Long-term.** The Apprenticeship is not a single session or a short sprint. It is an ongoing relationship with a defined start state and a defined graduation threshold. Skills acquired through apprenticeship are expected to have higher reliability scores in the knowledge graph precisely because they were earned over time through repeated demonstration.

---

## How It Works Inside Neurigraph

At the memory architecture level, an Apprenticeship creates a dedicated **Skill Acquisition Context** within the Persona's domain knowledge graph. This context has several properties that distinguish it from normal memory:

The **Mentor Authority Flag** elevates the credibility weight of memory nodes created during apprenticeship sessions. When the Mentor says "this is how it's done here," that instruction does not just become a fact — it becomes a governing rule for the domain graph, sitting above general inferred patterns.

The **Correction Memory Layer** is a specialized sub-layer within the skill's knowledge graph that preserves the history of what was corrected, not just what was learned. Most memory systems discard the "wrong attempts." Neurigraph preserves them as negative examples — bounded, tagged, and inaccessible to the Persona as active behavior but available to the learning evaluation system when assessing whether mastery is being approached.

**Session Continuity Linking** ensures that each apprenticeship session is linked to prior sessions within the same skill context. Progress, drift, and regression can all be tracked. This is what makes it genuinely long-term — the system can see that three weeks ago the Persona handled objections in a specific way, and measure whether that has changed.

**Tacit Pattern Extraction** runs as a background process during and after apprenticeship sessions. When the Mentor demonstrates something without explicitly explaining it — a particular way of framing a proposal, a timing judgment, a tonal shift — the system attempts to extract and encode the pattern. These extracted patterns are flagged as "inferred from demonstration" rather than "explicitly taught," which affects their confidence score until they are reinforced by subsequent examples.

---

## Graduation and Skill Lock

An Apprenticeship does not continue indefinitely. The system tracks a **Mastery Threshold** for the skill slot, defined by a combination of: the Mentor's explicit evaluations, task performance scores over time, consistency of behavior across varied scenarios, and the absence of correction on previously corrected behaviors.

When the threshold is reached, the Mentor is prompted to formally graduate the Persona from the apprenticeship. At that point, the skill slot transitions from **Apprentice Mode** (actively supervised, high correction sensitivity) to **Active Mode** (self-directed, stable knowledge graph, normal memory dynamics).

Post-graduation, the Mentor relationship does not disappear — it becomes an advisory relationship. The Mentor can still issue corrections and updates. But the elevated memory weight is removed. The Persona is now expected to perform independently within that domain.

---

## Safety Constraints

In keeping with the broader Cognitive Constraint Box governing all Persona behavior, the Apprenticeship Model operates within strict limits:

A Persona can be in active apprenticeship for at most one new skill slot at a time. This is by design. Real apprenticeships demand focused attention, and the architecture must model that constraint faithfully.

The Mentor must be a verified user with an active relationship to the Instance. Anonymous or third-party training inputs do not qualify for elevated Mentor Authority weighting.

Apprenticeship cannot be used to bypass the domain isolation rules of the Persona's existing skill slots. A Persona being apprenticed in Sales cannot be indirectly trained on Finance by embedding financial content inside sales roleplay. The domain classifier monitors for this and flags boundary violations.

All correction history and tacit extraction logs are retained and auditable by the account administrator. The apprenticeship cannot be memory-wiped selectively — if the skill slot is removed, the entire acquisition history goes with it.

---

## Relationship to Other Acquisition Modes

The Apprenticeship Model is the highest-investment, highest-fidelity acquisition pathway. It is appropriate for skills that are complex, judgment-heavy, or highly specific to a particular person's methods and standards.

Structured training (documents, videos, quizzes) remains the appropriate pathway for well-documented, transferable domains where the Persona needs foundational knowledge before any hands-on work begins. In many cases, structured training will precede an apprenticeship — establishing the vocabulary and baseline before the deeper relational learning begins.

Task-based inference (learning from repeated exposure during normal work) is the lowest-intensity pathway and builds the shallowest knowledge. It is appropriate for subskill refinement within an already-active slot, not for acquiring a new slot from scratch.

These three modes are not mutually exclusive. A well-designed onboarding flow for a complex skill slot might combine all three: structured training to establish foundations, a period of task-based exposure to build early pattern recognition, followed by a formal apprenticeship to develop judgment and tacit mastery.

---

## Placement in Roadmap

This feature depends on: a working Neurigraph substrate, the Persona Skill Slot system, the Closed Thinking Layer, and at minimum a basic session continuity and memory correction architecture. It is a Phase 4+ feature and should not be scoped for implementation before those dependencies are stable.
