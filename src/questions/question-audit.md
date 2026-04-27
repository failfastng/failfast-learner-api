# Question Audit — FailFast Learner v1

Companion document to `questions.json`. One entry per question with per-distractor misconception annotations, demonstrating that every wrong option encodes a single clean error path (Principle 7: Distractors encode misconceptions).

This file is the pedagogical-quality record. Each distractor is justified by naming the specific student error that leads to it. The single-clean-error-path rule applies: every wrong option must be reachable through ONE plausible student error. Filler distractors (random values not reachable through any error path) are not permitted.

**Total: 45 questions** (15 Mathematics, 15 English, 15 Economics).

---

## Mathematics (15 questions)

All 15 are AI-drafted FailFast originals in JAMB UTME style, with intentionally-designed misconception distractors. Source attribution is honest: `"FailFast original (<topic>)"` rather than misattributing to specific past papers.

### q_math_001 — linear_equations (medium)

**Question:** If 4(x − 3) = 2x + 6, what is the value of x?

**Options:**
- [DISTRACTOR] **4.5** — Incomplete bracket expansion: student treats `4(x − 3)` as `4x − 3`, getting `4x − 3 = 2x + 6` → `2x = 9` → x = 4.5. Most common single-step error in bracket expansion.
- [DISTRACTOR] **6** — Sign error after correct expansion: `4x − 12 = 2x + 6` → student moves terms but forgets the sign on −12, getting `2x = 12` → x = 6.
- [CORRECT] **9** — `4x − 12 = 2x + 6` → `2x = 18` → x = 9.
- [DISTRACTOR] **18** — Student isolated 2x correctly to get `2x = 18` but skipped the final division by 2.

### q_math_002 — percentages (medium)

**Question:** A trader sold a phone for ₦24,000, making a 20% profit. What did the phone cost the trader?

**Options:**
- [DISTRACTOR] **₦19,200** — Student took 20% of selling price (₦24,000 × 0.20 = ₦4,800) and subtracted: ₦24,000 − ₦4,800. Most common error: applying the percentage to selling price instead of cost.
- [CORRECT] **₦20,000** — Cost × 1.20 = ₦24,000 → Cost = ₦24,000 / 1.20 = ₦20,000.
- [DISTRACTOR] **₦22,000** — Student split the difference between selling price and a rough mental estimate; or computed ₦24,000 − ₦2,000 from approximation.
- [DISTRACTOR] **₦28,800** — Student added 20% to ₦24,000 instead of working backward; treated ₦24,000 as cost rather than selling price.

### q_math_003 — probability (medium)

**Question:** A bag contains 5 red balls and 3 blue balls. If two balls are drawn one after the other without replacement, what is the probability that both are red?

**Options:**
- [CORRECT] **5/14** — P(both red) = (5/8) × (4/7) = 20/56 = 5/14.
- [DISTRACTOR] **25/64** — Student computed `(5/8) × (5/8) = 25/64` — used the same probability for both draws, ignoring "without replacement."
- [DISTRACTOR] **5/16** — Student used `5/8 × 1/2` — guessed at the second probability without computing.
- [DISTRACTOR] **15/56** — Student computed `(5/8) × (3/7) = 15/56` — used red for first draw and blue for second by mistake.

### q_math_004 — geometry_volume (medium)

**Question:** A cylindrical water tank has a radius of 7 cm and a height of 10 cm. Find its volume. (Take π = 22/7)

**Options:**
- [DISTRACTOR] **220 cm³** — Student used circumference formula instead of volume: `2πr × h = 2 × (22/7) × 7 × 10 / 7` → ≈220. Formula confusion.
- [CORRECT] **1,540 cm³** — V = πr²h = (22/7) × 49 × 10 = 1,540.
- [DISTRACTOR] **440 cm³** — Student computed `2πrh` (lateral surface area) instead of volume. Common formula confusion.
- [DISTRACTOR] **154 cm³** — Student computed `πr²` (area of circular base) without multiplying by height. Forgot the third dimension.

### q_math_005 — calculus_derivatives (medium)

**Question:** Find the derivative of f(x) = 3x² − 4x + 7.

**Options:**
- [CORRECT] **6x − 4** — d/dx(3x²) = 6x; d/dx(−4x) = −4; d/dx(7) = 0.
- [DISTRACTOR] **6x − 4 + 7** — Student differentiated the variable terms but kept the constant 7 instead of dropping it. Classic constant-dropping error.
- [DISTRACTOR] **3x − 4** — Student treated the coefficient as the derivative without bringing down the power; kept 3x because of the 3 in 3x².
- [DISTRACTOR] **6x² − 4** — Student multiplied coefficient by power but kept the original power instead of decreasing it by 1.

### q_math_006 — quadratic_equations (medium)

**Question:** Solve the equation x² − 5x + 6 = 0.

**Options:**
- [CORRECT] **x = 2 or x = 3** — Factorisation: (x − 2)(x − 3) = 0 → x = 2 or x = 3.
- [DISTRACTOR] **x = −2 or x = −3** — Student factorised correctly to (x − 2)(x − 3) = 0 but reversed signs when solving (treated x − 2 = 0 as x = −2).
- [DISTRACTOR] **x = 1 or x = 6** — Student looked for two numbers that multiply to 6 and ADD to 5 (instead of add to −5); picked 1 and 6 because they multiply to 6, ignoring the sum constraint.
- [DISTRACTOR] **x = −1 or x = −6** — Student combined both errors above: wrong factor pair AND sign reversal.

### q_math_007 — simultaneous_equations (medium)

**Question:** Solve the simultaneous equations: 2x + y = 7 and x − y = 2.

**Options:**
- [CORRECT] **x = 3, y = 1** — Add equations: 3x = 9 → x = 3. Substitute: y = 7 − 6 = 1.
- [DISTRACTOR] **x = 2, y = 0** — Student added the equations correctly to get `3x = 9` → x = 3, then substituted back but made an arithmetic slip getting y = 0 instead of y = 1.
- [DISTRACTOR] **x = 4, y = 2** — Student used `x − y = 2` but read it as `y = x − 2` instead of `x = y + 2`; ended up with reversed substitution.
- [DISTRACTOR] **x = 1, y = 5** — Student tried to eliminate x instead of y; multiplied the second equation by 2 to get `2x − 2y = 4` but subtracted in the wrong direction.

### q_math_008 — indices_exponents (medium)

**Question:** Simplify: 3⁵ ÷ 3²

**Options:**
- [CORRECT] **3³** — Division of indices: subtract exponents. 3⁵⁻² = 3³.
- [DISTRACTOR] **3⁷** — Student ADDED exponents instead of subtracting (confused the rule for division with the rule for multiplication).
- [DISTRACTOR] **3¹⁰** — Student MULTIPLIED exponents (5 × 2 = 10), wrong rule entirely.
- [DISTRACTOR] **1³** — Student treated the bases as `3 ÷ 3 = 1`, ending up with the base reduced to 1 and keeping a wrong exponent.

### q_math_009 — logarithms (medium)

**Question:** If log₂ 8 = x, what is the value of x?

**Options:**
- [CORRECT] **3** — 2³ = 8, so log₂ 8 = 3.
- [DISTRACTOR] **4** — Student computed `log₂ 16` instead of `log₂ 8`; misread the question or confused 8 with the next power of 2.
- [DISTRACTOR] **16** — Student computed `2 × 8 = 16` instead of asking "2 to what power equals 8"; confused logarithm with multiplication.
- [DISTRACTOR] **1/3** — Student inverted the relationship: knew the answer involved 3 but flipped it because they associate logarithms with reciprocals.

### q_math_010 — work_rate (medium)

**Question:** A tap can fill a tank in 6 hours, while another tap can fill the same tank in 3 hours. How long will it take to fill the tank if both taps are opened together?

**Options:**
- [CORRECT] **2 hours** — Combined rate: 1/6 + 1/3 = 1/2 per hour. Time = 1 ÷ (1/2) = 2 hours.
- [DISTRACTOR] **4.5 hours** — Student took the AVERAGE of 6 and 3: (6 + 3) / 2 = 4.5. Most common error: treating the times as quantities to average rather than rates to add.
- [DISTRACTOR] **9 hours** — Student ADDED the two times: 6 + 3 = 9. Treating cooperative work as cumulative time.
- [DISTRACTOR] **1.5 hours** — Student took half of 3 (the faster tap's time) reasoning "if one tap takes 3 hours, two taps should take half of that"; ignored that the second tap is slower.

### q_math_011 — simple_interest (medium)

**Question:** Find the simple interest on ₦15,000 invested for 4 years at 8% per annum.

**Options:**
- [CORRECT] **₦4,800** — SI = PRT/100 = (15,000 × 8 × 4) / 100 = 4,800.
- [DISTRACTOR] **₦1,200** — Student computed only ONE year's interest: 15,000 × 0.08 = 1,200. Forgot to multiply by 4 years.
- [DISTRACTOR] **₦19,800** — Student computed the AMOUNT (principal + interest) instead of the interest alone: 15,000 + 4,800 = 19,800. Confusing "interest" with "amount."
- [DISTRACTOR] **₦480** — Student forgot a zero in 15,000, computing 1,500 × 0.08 × 4 = 480. Decimal-place error.

### q_math_012 — geometry_angles (medium)

**Question:** Two parallel lines are cut by a transversal. One of the angles formed measures 65°. What is the measure of its co-interior angle?

**Options:**
- [CORRECT] **115°** — Co-interior angles on parallel lines sum to 180°. So 180 − 65 = 115°.
- [DISTRACTOR] **65°** — Student confused co-interior angles with corresponding angles or alternate angles (which ARE equal); applied wrong rule.
- [DISTRACTOR] **25°** — Student confused co-interior with complementary angles: 90 − 65 = 25.
- [DISTRACTOR] **130°** — Student doubled the angle thinking "co-interior involves both sides"; computed 2 × 65 = 130.

### q_math_013 — geometry_pythagoras (medium)

**Question:** A right-angled triangle has legs of length 5 cm and 12 cm. What is the length of the hypotenuse?

**Options:**
- [CORRECT] **13 cm** — √(5² + 12²) = √(25 + 144) = √169 = 13.
- [DISTRACTOR] **17 cm** — Student ADDED the legs: 5 + 12 = 17. Skipped Pythagoras entirely.
- [DISTRACTOR] **169 cm** — Student computed `5² + 12² = 25 + 144 = 169` correctly but FORGOT to take the square root. Common one-step-short error.
- [DISTRACTOR] **119 cm** — Student SUBTRACTED the squares: `12² − 5² = 144 − 25 = 119`. Wrong operation; this would apply only if finding a leg, not the hypotenuse.

### q_math_014 — trigonometry (medium)

**Question:** What is the value of sin 30°?

**Options:**
- [CORRECT] **1/2** — Standard trigonometric value.
- [DISTRACTOR] **√3/2** — Student confused sin 30° with cos 30° (or sin 60°); swapped the value pair.
- [DISTRACTOR] **1** — Student confused sin 30° with sin 90°; treating 30° as the special angle where sin equals 1.
- [DISTRACTOR] **√2/2** — Student confused sin 30° with sin 45°; mixed up the standard-angle table.

### q_math_015 — statistics_mean (medium)

**Question:** The marks of 5 students in a test are: 12, 18, 15, 10, 20. What is the mean mark?

**Options:**
- [CORRECT] **15** — Sum = 75. Mean = 75 / 5 = 15.
- [DISTRACTOR] **75** — Student SUMMED the marks (12 + 18 + 15 + 10 + 20 = 75) but forgot to divide by 5. Most common arithmetic-mean error.
- [DISTRACTOR] **14** — Student computed the mean of only the first four marks (12 + 18 + 15 + 10 = 55, ÷ 4 = 13.75 ≈ 14). Forgot one student's mark.
- [DISTRACTOR] **10** — Student picked the minimum value, confusing "mean" with another measure of central tendency.

---

## English (15 questions)

All 15 sourced from JAMB UTME via the ALOC API (`questions.aloc.com.ng`), curated for distractor quality and stem readability. Stems revised where JAMB instruction prefixes leaked into the data. Three candidates with wrong marked answers were dropped during curation; one distractor was corrected (q_engl_004).

### q_engl_001 — idiom_interpretation (easy)

**Question:** Choose the option that best explains the sentence: "The new Headmaster hoped that his men would pull together."

**Options:**
- [CORRECT] **He expected that the men would cooperate with him** — "Pull together" idiomatically means "cooperate."
- [DISTRACTOR] **He thought that the men would compose themselves at work** — Student confused "pull together" with "pull oneself together" (which means compose oneself). Idiom-pair confusion.
- [DISTRACTOR] **He was certain that they would resign en masse** — Student interpreted "pull" as "withdraw," reading the idiom literally toward leaving.
- [DISTRACTOR] **He was certain that their condition would improve under him** — Student grasped the positive valence but misidentified what specifically was improving (general condition vs cooperation).

**Source:** JAMB UTME 2005, stem revised.

### q_engl_002 — vocabulary_synonym (medium)

**Question:** Choose the option nearest in meaning to the word in italics: "He is a *stringer* for a newspaper."

**Options:**
- [DISTRACTOR] **a financier of** — Sound-alike confusion: "stringer" misheard or misread as related to financial backing. Surface-similarity error.
- [DISTRACTOR] **an editor of** — Student knows "stringer" relates to news work but defaults to the most familiar newspaper role (editor) without distinguishing functions.
- [CORRECT] **a freelancer for** — A stringer is a freelance journalist who contributes to a newspaper.
- [DISTRACTOR] **a reporter for** — Closest semantic neighbor; student knows it's a newspaper-related role but doesn't distinguish a stringer (freelance, irregular) from a staff reporter.

**Source:** JAMB UTME 2002, stem revised.

### q_engl_003 — grammar_pronouns (easy)

**Question:** Fill the gap with the most appropriate option: "_____ went to the stadium to watch a football match."

**Options:**
- [DISTRACTOR] **Amadi and me** — Pronoun-case error: "me" is object form, but the gap is the SUBJECT of the sentence. Common error: students avoid "I" thinking it's pretentious.
- [CORRECT] **Amadi and I** — Subject pronoun "I" is correct in subject position.
- [DISTRACTOR] **Me and Amadi** — Both wrong case AND wrong order (the speaker's pronoun should come last in compound subjects).
- [DISTRACTOR] **Amadi and myself** — "Myself" is reflexive and only correct when the speaker is also the object of the verb. Hypercorrection error.

**Source:** JAMB UTME 2007, stem revised.

### q_engl_004 — grammar_tense (medium)

**Question:** Fill the gap with the most appropriate option: "I knocked on his door, but he _____."

**Options:**
- [DISTRACTOR] **has already gone** — Present perfect tense; wrong because the main clause "I knocked" is in past tense. Tense-mismatch error.
- [DISTRACTOR] **left already** — Simple past; the action of leaving happened BEFORE the knocking, so past perfect is required to show sequence.
- [DISTRACTOR] **would already leave** — Conditional construction; wrong tense form for a past sequence narrative.
- [CORRECT] **had already left** — Past perfect correctly shows that the leaving happened before the knocking.

**Source:** JAMB UTME 2008, stem revised, distractor 1 corrected from corrupted "has already ten."

### q_engl_005 — idiom_interpretation (easy)

**Question:** Choose the option that best explains the sentence: "The first time Paul met Ngozi, her beauty caught his eye."

**Options:**
- [DISTRACTOR] **Ngozi admired Paul** — Direction reversal: student got the people in the wrong roles.
- [DISTRACTOR] **Paul recognized Ngozi** — Sound-alike confusion of "caught his eye" with recognition; wrong meaning of the idiom.
- [CORRECT] **Ngozi attracted Paul** — "Caught his eye" idiomatically means attracted attention/interest.
- [DISTRACTOR] **Paul surprised Ngozi** — Direction reversal AND wrong action verb; multiple errors but reachable as student associating "caught" with "surprise/catch off-guard."

**Source:** JAMB UTME 2017, stem revised.

### q_engl_006 — vocabulary_synonym (hard)

**Question:** Choose the option nearest in meaning to the word in italics: "We were warned not to indulge in *recriminations*."

**Options:**
- [CORRECT] **counter-charges** — Recriminations are mutual accusations or counter-accusations.
- [DISTRACTOR] **indiscretions** — Student confused recriminations with reckless behavior (indiscretions); both are negative but different categories.
- [DISTRACTOR] **accusations** — Close but incomplete; recriminations specifically involve mutual or returned accusations, not single one-way accusations.
- [DISTRACTOR] **frivolous allegations** — Student associated "recriminations" with negative-sounding accusations but added an extra (wrong) attribute (frivolous).

**Source:** JAMB UTME 2007, stem revised.

### q_engl_007 — vocabulary_antonym (medium)

**Question:** Choose the option opposite in meaning to the word in italics: "A *tentative* solution was provided."

**Options:**
- [DISTRACTOR] **convincing** — Student confused antonym with synonym OR thought "tentative" meant "unconvincing." Direction error.
- [DISTRACTOR] **provisional** — This is a SYNONYM of tentative. Common antonym/synonym confusion when instruction is ambiguous.
- [DISTRACTOR] **amicable** — Random emotional-tone word; student grasped that the answer is "positive-sounding" but picked an unrelated positive word.
- [CORRECT] **definite** — Direct antonym: tentative means provisional/uncertain; definite means firm/certain.

**Source:** JAMB UTME 2006, stem revised.

### q_engl_008 — grammar_conditionals (medium)

**Question:** Choose the option that best explains the sentence: "If he had spoken up, he wouldn't have been given."

**Options:**
- [DISTRACTOR] **He spoke up and was given** — Both conditions reversed; student didn't track the negative.
- [DISTRACTOR] **He wasn't given because he spoke up** — Got the "wasn't given" right but reversed the speaking-up condition.
- [DISTRACTOR] **He didn't speak up and wasn't given** — Got the speaking-up right but reversed the giving condition.
- [CORRECT] **He was given because he didn't speak up** — Third conditional past unreal: the actual past was "didn't speak up, was given." The hypothetical reverses both.

**Source:** JAMB UTME 2019, stem revised.

### q_engl_009 — idiom_interpretation (easy)

**Question:** Choose the option nearest in meaning to the underlined idiom: "Audu was *taken bad* in the middle of the night."

**Options:**
- [DISTRACTOR] **He was caught** — Student interpreted "taken" literally as "captured/caught."
- [DISTRACTOR] **He was robbed** — Student associated "taken" with "robbed of something" (a different idiom — "taken from").
- [CORRECT] **He was ill** — "Taken bad" idiomatically means suddenly fell ill.
- [DISTRACTOR] **He was drunk** — Student associated "bad" with intoxication or moral failure.

**Source:** JAMB UTME 2002, stem revised.

### q_engl_010 — vocabulary_synonym (easy)

**Question:** Choose the word nearest in meaning to the underlined word: "I went through his work; it was *gibberish*."

**Options:**
- [CORRECT] **meaningless** — Gibberish means unintelligible or meaningless speech/text.
- [DISTRACTOR] **meaningful** — Direct antonym; common synonym/antonym confusion.
- [DISTRACTOR] **brutal** — Sound-association: "gibberish" might sound harsh, but "brutal" describes intensity/cruelty, not unintelligibility.
- [DISTRACTOR] **too simple** — Student misread the negative valence: thought gibberish meant "trivially simple" rather than "unintelligible."

**Source:** JAMB UTME 2020, stem revised.

### q_engl_011 — idiom_interpretation (medium)

**Question:** Choose the option that best explains the sentence: "The minister considered the ministry's budget to be a drop in the ocean in view of the number of projects in the pipeline."

**Options:**
- [DISTRACTOR] **The pipeline project across the ocean will be abandoned unless budgetary allocation improves** — Literal interpretation of both idioms ("drop in the ocean" and "in the pipeline") as physical objects.
- [CORRECT] **The amount available may be inadequate for projected expenditure** — "Drop in the ocean" means very small relative to need; "in the pipeline" means planned/upcoming.
- [DISTRACTOR] **The minister may be dropped for failing to complete a number of projects** — Student associated "drop" with "removal/firing" rather than "small amount."
- [DISTRACTOR] **The money approved cannot complete the pipeline project across the ocean** — Same literal-interpretation error as the first distractor with different framing.

**Source:** JAMB UTME 2014, typos corrected.

### q_engl_012 — vocabulary_synonym (hard)

**Question:** Choose the option nearest in meaning to the underlined word: "The circular *supersedes* all previous correspondence on the matter."

**Options:**
- [DISTRACTOR] **supports** — Sound-alike confusion: "super" prefix associated with "supports/upholds" rather than "replaces."
- [CORRECT] **displaces** — To supersede is to take the place of, replace, or displace.
- [DISTRACTOR] **eliminates** — Closer than "supports" but still wrong; supersede replaces (puts something else in its place) rather than eliminates (removes entirely).
- [DISTRACTOR] **circumvents** — Sound-similarity to "supersedes"; both are formal verbs starting with "circum/super." Student picks based on register match without precise meaning.

**Source:** JAMB UTME 2011, stem revised.

### q_engl_013 — vocabulary_gap_fill (easy)

**Question:** Fill the gap with the most appropriate option: "I do not think any sane person would have acted in such a _____ manner."

**Options:**
- [DISTRACTOR] **rational** — Direct antonym of what's needed; the sentence requires a word that contrasts with "sane."
- [DISTRACTOR] **composed** — Synonym-like to "sane"; same direction error as rational.
- [DISTRACTOR] **secret** — Wrong category entirely; doesn't pair semantically with "sane person would not have acted."
- [CORRECT] **cruel** — A sane person wouldn't act cruelly; the contrast works.

**Source:** JAMB UTME 2001, stem revised.

### q_engl_014 — sentence_interpretation (medium)

**Question:** Choose the option that best explains the sentence: "If the trader paid in full, his order was not pruned down."

**Options:**
- [CORRECT] **The trader who made full payment did not have his order reduced** — "Pruned down" means reduced/cut back.
- [DISTRACTOR] **The trader who made some payment did not have his order delayed** — Two errors: "some payment" instead of "in full" AND "delayed" instead of "reduced."
- [DISTRACTOR] **Unless the trader paid in full his order would be rejected** — Student inferred a stronger conditional consequence (rejection) than the original (reduction).
- [DISTRACTOR] **As the trader did not increase his order, he did not need to pay in full** — Student reversed the causal direction entirely.

**Source:** JAMB UTME 2005.

### q_engl_015 — idiom_interpretation (medium)

**Question:** Choose the option that best explains the sentence: "The organization is constantly in a state of flux."

**Options:**
- [CORRECT] **There are periodic changes in the organization** — "In a state of flux" means undergoing constant change.
- [DISTRACTOR] **The organization is facing a difficult period** — Student associated "flux" with negative valence (difficulty) rather than its actual neutral meaning (change).
- [DISTRACTOR] **The organization is experiencing good times** — Opposite-direction error from the previous; student associated "flux" positively for some reason.
- [DISTRACTOR] **The organization is moribund** — Student picked an unrelated formal-sounding word; "moribund" means dying, not changing.

**Source:** JAMB UTME 2018, typo corrected.

---

## Economics (15 questions)

All 15 sourced from JAMB UTME via ALOC, curated heavily. Eight candidates with wrong marked answers were dropped during curation (a 20% answer-error rate from the source). One distractor was corrected (q_econ_011). Every kept question's marked answer was verified against textbook standards.

### q_econ_001 — definitions (easy)

**Question:** Economics is the study of human behaviour as it relates to the

**Options:**
- [CORRECT] **efficient allocation of resources** — Lionel Robbins' classic definition: economics studies how human behaviour allocates scarce resources to unlimited wants.
- [DISTRACTOR] **operation of companies** — Scope confusion: this is business administration, a narrower scope than economics.
- [DISTRACTOR] **production of goods** — Scope confusion: production is one part of economics, not the whole field.
- [DISTRACTOR] **generation of income** — Scope confusion: income generation is one outcome studied within economics, not the central definition.

**Source:** JAMB UTME 2010.

### q_econ_002 — market_systems (easy)

**Question:** A typical feature of a market economy is that

**Options:**
- [DISTRACTOR] **all producers make profit** — Concept confusion: market economies have winners and losers; profit is not guaranteed for all.
- [DISTRACTOR] **full employment exists** — Concept confusion: full employment is a goal of macroeconomic policy, not a feature of market systems specifically.
- [CORRECT] **consumer sovereignty exists** — In market economies, consumer demand drives production decisions; this is the defining feature.
- [DISTRACTOR] **there is equality of economic agents** — Concept confusion: market economies inherently have inequality of resources and economic power.

**Source:** JAMB UTME 2009.

### q_econ_003 — utility_theory (medium)

**Question:** A major assumption in cardinal utility theory is that

**Options:**
- [CORRECT] **utility is measurable** — Cardinal utility theory assumes utility can be measured numerically (in "utils"), distinguishing it from ordinal utility.
- [DISTRACTOR] **utility is not measurable** — Direct opposite; this is the assumption of ORDINAL utility theory. Concept-pair confusion.
- [DISTRACTOR] **total utility equals marginal utility** — Concept confusion: total utility is the sum across all units consumed; marginal utility is the additional from the last unit. They are different by definition.
- [DISTRACTOR] **total utility is constant** — Concept confusion: total utility changes with consumption (rises then falls past satiation).

**Source:** JAMB UTME 2009.

### q_econ_004 — demand_supply (easy)

**Question:** An excess demand for beans will result from

**Options:**
- [DISTRACTOR] **an increase in the price of beans** — Direction error: a price increase causes a decrease in quantity demanded, not excess demand. Demand-law direction confusion.
- [CORRECT] **a decrease in the price of beans** — Lower price increases quantity demanded relative to fixed supply, creating excess demand.
- [DISTRACTOR] **an increase in the supply of beans** — Direction error: more supply at fixed price causes excess SUPPLY (surplus), not excess demand.
- [DISTRACTOR] **a decrease in the supply of beans** — Direction error: less supply causes excess demand only at the existing price, but the question framing leads to confusion. Closest valid alternative interpretation but not the canonical answer.

**Source:** JAMB UTME 2010.

### q_econ_005 — demand_supply (medium)

**Question:** A supply curve is positively sloped because

**Options:**
- [DISTRACTOR] **supply always exceeds demand** — Conceptual error: supply curve slope is about price-quantity relationship, not about absolute supply vs demand levels.
- [DISTRACTOR] **demand always exceeds supply** — Same scope error from opposite direction.
- [DISTRACTOR] **price is an incentive to consumers** — Direction error: price is an incentive to PRODUCERS (motivating more supply), not consumers (who want lower prices).
- [CORRECT] **price is an incentive to producers** — Higher prices motivate producers to supply more, hence positive slope.

**Source:** JAMB UTME 2009.

### q_econ_006 — demand_supply (medium)

**Question:** The demand curve for factors of production

**Options:**
- [DISTRACTOR] **is perfectly elastic** — Concept confusion: factor demand is rarely perfectly elastic except in special cases (perfect competition for factors).
- [CORRECT] **slopes downwards** — Like product demand curves, factor demand curves slope downward (more factor demanded at lower factor price).
- [DISTRACTOR] **slopes upwards** — Direction error: this would imply factors are Veblen goods or Giffen goods at the factor level. Wrong for standard cases.
- [DISTRACTOR] **is perfectly inelastic** — Concept confusion: this would mean quantity demanded doesn't respond to price, which is wrong for most factors.

**Source:** JAMB UTME 2010.

### q_econ_007 — market_structures (medium)

**Question:** The supply curve of a perfectly competitive firm is identical to its

**Options:**
- [DISTRACTOR] **total cost** — Concept confusion: supply curve relates price to quantity, not total cost to quantity.
- [CORRECT] **marginal cost** — In perfect competition, firms produce where P = MC; the MC curve above AVC is the firm's supply curve.
- [DISTRACTOR] **fixed cost** — Concept confusion: fixed costs don't vary with quantity, so they can't form a supply curve.
- [DISTRACTOR] **variable cost** — Closer than fixed cost (variable cost does change with quantity) but still wrong; the AVC curve is not the supply curve, the MC curve is.

**Source:** JAMB UTME 2009.

### q_econ_008 — production (easy)

**Question:** The primary motive for an individual engaging in production is to

**Options:**
- [CORRECT] **make profit** — In standard economic theory (especially capitalist context), profit is the primary motive for individual producers.
- [DISTRACTOR] **redistribute wealth** — Concept confusion: redistribution is a goal of public policy, not individual production motive.
- [DISTRACTOR] **satisfy basic human wants** — Sounds noble but is a SOCIETAL function of production, not the individual producer's primary motive.
- [DISTRACTOR] **put inputs into use** — Process description, not motive. Student confuses the act of production with the reason for it.

**Source:** JAMB UTME 2010.

### q_econ_009 — business_organization (medium)

**Question:** The major problem confronting a sole proprietor is

**Options:**
- [DISTRACTOR] **high level of risk** — Real problem but not the MAJOR one; risk is a consequence of capital limitation, not the root issue.
- [DISTRACTOR] **limited expertise** — Real problem but secondary; one person can hire expertise if they have capital.
- [CORRECT] **limited source of capital** — The defining constraint on sole proprietorships: capital sources are limited to personal savings, family loans, and small bank loans, which caps growth.
- [DISTRACTOR] **high taxation** — Concept confusion: sole proprietors are typically taxed at personal income rates, often LOWER than corporate rates, not higher.

**Source:** JAMB UTME 2009.

### q_econ_010 — money_banking (medium)

**Question:** A manufacturer who wants to build a new plant will source funds from the

**Options:**
- [DISTRACTOR] **commercial banks** — Commercial banks provide short-to-medium-term loans, not the long-term capital needed for a new plant.
- [DISTRACTOR] **money market** — Money market is for short-term instruments (under one year), wrong scope for plant construction.
- [CORRECT] **capital market** — Long-term financing (5+ years) for major capital projects comes from the capital market via stocks/bonds.
- [DISTRACTOR] **government** — Government may subsidize industry but is not a primary funding source for private plant construction.

**Source:** JAMB UTME 2009.

### q_econ_011 — money_banking (hard)

**Question:** The ability of commercial banks to create money depends on the

**Options:**
- [DISTRACTOR] **cash reserve ratio** — Closer than other distractors; the cash reserve ratio IS related, but the broader liquidity ratio is the more standard answer in JAMB economics curriculum.
- [CORRECT] **liquidity ratio** — Banks' money creation capacity depends on the liquidity ratio (the proportion of deposits held as liquid assets), which determines the money multiplier.
- [DISTRACTOR] **interest rate** — Concept confusion: interest rate affects loan demand, not the bank's CAPACITY to create money.
- [DISTRACTOR] **capital base** — Concept confusion: capital base relates to bank stability and lending capacity, not money creation specifically.

**Source:** JAMB UTME 2009, distractor 0 corrected from corrupted "Ratio."

### q_econ_012 — nigerian_economy (medium)

**Question:** In Nigeria, the huge public debt is as a result of

**Options:**
- [DISTRACTOR] **balanced budgeting** — Direction error: balanced budgeting (revenue = expenditure) doesn't add to debt.
- [DISTRACTOR] **surplus budgeting** — Direction error: surplus budgeting (revenue > expenditure) reduces debt, not increases it.
- [CORRECT] **deficit budgeting** — Spending more than revenue (deficit) requires borrowing, which increases public debt.
- [DISTRACTOR] **zero budgeting** — Concept confusion: zero-based budgeting is an accounting method (justifying every expense from zero), not related to debt accumulation.

**Source:** JAMB UTME 2010.

### q_econ_013 — nigerian_economy (hard)

**Question:** Guided deregulation as currently practiced in Nigeria implies that

**Options:**
- [DISTRACTOR] **market forces determine interest and exchange rates** — This describes FULL deregulation, not GUIDED deregulation.
- [DISTRACTOR] **government alone determines interest and exchange rates** — This describes regulation, not deregulation. Direction error.
- [CORRECT] **market forces and government determine interest and exchange rates** — "Guided" means the government participates while market forces also operate; hybrid model.
- [DISTRACTOR] **exchange rate is regulated while interest rate is fixed** — Scope confusion: this describes a different kind of mixed regime, not the canonical "guided deregulation" definition.

**Source:** JAMB UTME 2009.

### q_econ_014 — statistics (easy)

**Question:** The standard deviation of a set of data is

**Options:**
- [DISTRACTOR] **always measured from the mode** — Concept confusion: standard deviation is measured from the MEAN, not the mode.
- [DISTRACTOR] **always measured from the median** — Concept confusion: same category as above; deviations are calculated from the mean.
- [DISTRACTOR] **the most representative of averages** — Scope confusion: standard deviation is a measure of dispersion/spread, NOT a measure of average. Common misconception.
- [CORRECT] **a measure of dispersion** — Standard deviation quantifies how spread out values are from the mean.

**Source:** JAMB UTME 2010.

### q_econ_015 — public_policy (medium)

**Question:** National development plans in Nigeria fail mainly because of

**Options:**
- [DISTRACTOR] **over dependence on foreign aids** — Real factor but not the standard textbook answer; this is more of a structural condition than a "main reason for failure."
- [CORRECT] **poor implementation strategies** — Standard textbook answer in Nigerian economics: plans are reasonable on paper but fail at execution.
- [DISTRACTOR] **inadequate funding of projects** — Real factor but downstream of implementation; well-implemented plans usually find funding.
- [DISTRACTOR] **shortage of skilled manpower** — Real factor but not the primary one; Nigeria has skilled manpower; the issue is deploying them effectively.

**Source:** JAMB UTME 2010.

---

## Audit summary

| Subject | Count | Sourcing | Distractor verification |
|---|---|---|---|
| Mathematics | 15 | FailFast original, AI-drafted | Per-distractor misconception annotations applied at draft time |
| English | 15 | JAMB UTME via ALOC, curated | Per-distractor misconception annotations applied during review; 3 wrong-answer drops |
| Economics | 15 | JAMB UTME via ALOC, curated | Per-distractor misconception annotations applied during review; 8 wrong-answer drops; every kept answer verified |

**Quality bar applied:** every distractor in every question is justified by a single-clean-error-path annotation. Filler distractors (random values not reachable through any error path) are not present in the bank.

**Authoring lessons captured separately** in `/skills/failfast-question-review/SKILL.md` and `/skills/failfast-question-generator/SKILL.md` for the full FailFast platform's content pipeline.