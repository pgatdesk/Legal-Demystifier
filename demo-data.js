// Pre-analyzed sample datasets for offline testing, demos, and instant previews
export const sampleContracts = {
  lease: {
    id: 'lease',
    name: 'Residential Lease Agreement',
    filename: 'residential_lease_agreement.txt',
    docType: 'Residential Lease',
    parties: ['Apex Realty (Landlord)', 'John Doe (Tenant)'],
    metrics: {
      fairnessScore: 24,
      highRisks: 4,
      mediumRisks: 2,
      lowRisks: 1,
      readingTime: '4 min read',
      complexity: 'Very High (One-Sided)'
    },
    balance: {
      giver_percent: 82,
      receiver_percent: 18,
      explanation: 'Extremely one-sided in favor of the Landlord (Apex Realty). The tenant bears 82% of all obligations, maintenance burdens, and legal costs while the landlord retains unilateral rent hikes and unrestricted 24/7 entry.'
    },
    summary: `This agreement is a 12-month apartment lease for 742 Evergreen Terrace between Apex Realty and John Doe. In plain terms, while it appears to be a standard rental agreement, it contains several aggressive, predatory clauses that heavily favor the landlord.

Think of this like paying full price for a hotel room, but the hotel manager is legally allowed to walk into your bedroom at 3:00 AM without knocking, can raise your room rate at any moment with 7 days' notice, and forces you to pay for fixing the building's roof if it leaks.

The agreement requires a $3,700 deposit (two months' rent) which you completely forfeit if you move out early for any reason. Furthermore, you are forced to pay all of the landlord's legal bills even if you win in court, and you give up your constitutional right to a jury trial.`,
    proactive_questions: [
      'Can the 7-day rent escalation clause be removed in favor of a fixed 12-month rent guarantee?',
      'Will you require 24 to 48 hours advance written notice before any landlord entry, except in documented emergencies?',
      'Can the maintenance clause be revised to limit tenant responsibility to minor repairs under $100 caused by tenant negligence?',
      'Will the early termination penalty be capped at a statutory 1-2 months rent rather than total deposit forfeiture?'
    ],
    persona_advice: {
      student: [
        'Do not sign this lease in its current state without a parent or university legal aid reviewing it.',
        'The guest policy restricts overnight guests to 2 nights and fines you $50/night, which could cause friction with roommates or study partners.',
        'If you leave for summer break or an internship early, you will lose your entire $3,700 security deposit with zero exceptions.',
        'Ask the landlord to add: "Landlord must provide at least 24 hours advance written notice prior to entering the premises."'
      ],
      business_owner: [
        'The unilateral rent increase clause (up to 15% with 7 days notice) creates massive, unbudgetable operational financial volatility.',
        'Total indemnification and repair obligations mean you could be billed for expensive pre-existing structural or HVAC failures.',
        'The asymmetric legal fees clause means you finance the landlord\'s litigation risk regardless of judicial outcome.',
        'Negotiate standard commercial habitability warranties and reciprocal attorney fee provisions.'
      ],
      lawyer: [
        'Section 4 (24/7 unrestricted entry) directly violates the statutory covenant of quiet enjoyment and state notice requirements (typically 24-48h).',
        'Section 3 regarding security deposit forfeiture qualifies as an unenforceable penalty under liquidated damages doctrine in most jurisdictions.',
        'Section 5 attempts to exculpate the landlord from their own negligence, which is void against public policy under standard landlord-tenant statutes.',
        'Recommend striking Sections 2 (unilateral hike), 4 (no-notice entry), and 7 (one-way legal fees + jury waiver).'
      ]
    },
    risk_analysis: [
      {
        text: "Landlord reserves the absolute right to increase the monthly rent by up to 15% at any time during the tenancy with 7 days written notice.",
        risk_level: "high",
        category: "Financial Volatility",
        explanation: "Allows the landlord to hike your rent from $1,850 to $2,127.50 virtually overnight with only a week's warning.",
        negotiation_tip: "Request standard lease protection: 'Rent shall remain fixed at $1,850.00 for the duration of the initial 12-month term.'"
      },
      {
        text: "Landlord and its contractors reserve the right to enter the leased premises at any time, 24 hours a day, without prior notice...",
        risk_level: "high",
        category: "Privacy & Safety",
        explanation: "Complete surrender of your privacy. Landlord or strangers can unlock your front door at any hour without calling or knocking.",
        negotiation_tip: "Counter with: 'Landlord shall provide at least 24 hours prior written notice before entry, except in bona fide emergencies.'"
      },
      {
        text: "Tenant assumes full responsibility for all maintenance, repairs, plumbing leaks, HVAC upkeep, and structural defects regardless of cause...",
        risk_level: "high",
        category: "Severe Liability",
        explanation: "You could be handed a $10,000 bill to replace a broken central AC or cracked foundation, even if it broke due to old age.",
        negotiation_tip: "Counter with: 'Landlord is responsible for all structural, roof, plumbing, and HVAC systems. Tenant only covers repairs caused by willful neglect.'"
      },
      {
        text: "If Landlord initiates any legal proceeding, Tenant shall be responsible for all of Landlord's legal fees and costs, regardless of whether Landlord prevails...",
        risk_level: "high",
        category: "Legal Asymmetry",
        explanation: "The landlord can sue you on false grounds, lose the court case, and you still have to pay their attorney's bills.",
        negotiation_tip: "Counter with: 'The prevailing party in any dispute shall be entitled to recover reasonable legal fees and expenses.'"
      },
      {
        text: "Tenant shall deposit $3,700 as security... the entire security deposit shall be deemed non-refundable liquidated damages if terminated early.",
        risk_level: "medium",
        category: "Deposit Forfeiture",
        explanation: "Complete forfeiture of your deposit even if you find an acceptable replacement tenant immediately.",
        negotiation_tip: "Request standard sublet/re-letting rights with a maximum early termination fee equal to 1 month of rent."
      },
      {
        text: "No overnight guests are permitted for more than two consecutive nights without written consent and an additional fee of $50 per guest per night.",
        risk_level: "medium",
        category: "Lifestyle Restrictions",
        explanation: "Restricts normal social life and visiting friends or family with punitive daily surcharge penalties.",
        negotiation_tip: "Propose allowance for guests staying up to 14 cumulative days per year without landlord pre-approval."
      },
      {
        text: "Landlord hereby leases to Tenant the residential premises located at 742 Evergreen Terrace, Unit 4B, for a term of 12 months...",
        risk_level: "low",
        category: "Standard Lease Term",
        explanation: "Standard 1-year tenancy term specifying the property address and duration.",
        negotiation_tip: "Verify unit number, parking spot allocation, and storage lockers are explicitly recorded."
      }
    ],
    demystification: [
      {
        section: "Section 2: Rent & Automatic Escalation",
        summary: "The landlord wants the freedom to raise your monthly rent by 15% whenever they feel like it, giving you only one week to come up with the extra money.",
        what_it_means_for_you: "Your $1,850/month rent isn't actually locked in. You could be forced to pay $2,127 or move out on a moment's notice.",
        key_takeaway: "Never accept unilateral rent escalation during an active fixed term."
      },
      {
        section: "Section 3: Security Deposit & Return",
        summary: "The landlord takes two months' rent upfront and refuses to refund a single penny if you need to leave the apartment before the year is up.",
        what_it_means_for_you: "Even if you lose your job or have a medical emergency, they keep your entire $3,700 deposit.",
        key_takeaway: "Ensure deposit deductions require itemized receipts within 30 days."
      },
      {
        section: "Section 4: Unrestricted Landlord Entry",
        summary: "The owner can enter your apartment day or night without giving you any heads-up or permission.",
        what_it_means_for_you: "You lose your right to privacy and peace of mind in your own home.",
        key_takeaway: "Mandate a 24-48 hour notice window in writing before any non-emergency entry."
      },
      {
        section: "Section 5: Repairs & Landlord Immunity",
        summary: "You are being made an unpaid building manager. Any broken appliances, leaking roofs, or burst pipes must be fixed with your own money.",
        what_it_means_for_you: "You might end up paying thousands of dollars for property issues you didn't cause.",
        key_takeaway: "Limit your maintenance duty to routine cleaning and minor consumable replacements."
      }
    ],
    mermaid: `flowchart TD
    A["📄 Lease Agreement Uploaded"] --> B["⚠️ High Risk Flags Identified"]
    B --> C{"Resolve Critical Issues?"}
    C -->|"Unilateral Rent Hikes"| D["❌ Reject Clause -> Request Fixed Rent"]
    C -->|"24/7 No-Notice Entry"| E["❌ Reject Clause -> Mandate 24h Written Notice"]
    C -->|"Structural Maintenance"| F["❌ Reject Clause -> Revert to Landlord Duty"]
    D --> G["Negotiation Review"]
    E --> G
    F --> G
    G --> H{"Landlord Agrees?"}
    H -->|"Yes"| I["✅ Safe to Sign Agreement"]
    H -->|"No"| J["🚨 Walk Away / Consult Legal Aid"]
    
    style A fill:#e0f2fe,stroke:#0284c7
    style B fill:#fee2e2,stroke:#ef4444
    style I fill:#dcfce7,stroke:#22c55e
    style J fill:#fef2f2,stroke:#b91c1c`
  },

  nda: {
    id: 'nda',
    name: 'Mutual Non-Disclosure Agreement',
    filename: 'mutual_non_disclosure_agreement.txt',
    docType: 'Mutual NDA & Non-Compete',
    parties: ['TechInnovate Corp', 'Partner Solutions LLC'],
    metrics: {
      fairnessScore: 38,
      highRisks: 3,
      mediumRisks: 3,
      lowRisks: 1,
      readingTime: '3 min read',
      complexity: 'High (Disguised Non-Compete)'
    },
    balance: {
      giver_percent: 65,
      receiver_percent: 35,
      explanation: 'Labeled as "Mutual" but secretly contains an aggressive worldwide non-compete clause that shuts down the recipient from building AI software for 24 months, with $250,000 automatic liquidated damages.'
    },
    summary: `This agreement is titled as a Mutual Non-Disclosure Agreement between TechInnovate Corp and Partner Solutions LLC to explore potential collaboration. While it looks like a routine confidentiality document on the surface, it contains a dangerous "Trojan Horse": a hidden worldwide non-compete clause.

If you sign this just to have an exploratory introductory meeting, you are barred from building, investing in, or developing any legal AI software worldwide for two whole years.

Additionally, confidentiality obligations last forever (perpetuity) even if the information becomes public knowledge, and violations trigger an automatic $250,000 fine without requiring proof of actual financial damage.`,
    proactive_questions: [
      'Why is a 24-month worldwide non-compete clause included inside an introductory Non-Disclosure Agreement?',
      'Can the confidentiality term be reduced from "in perpetuity" to an industry-standard 2 to 3 years?',
      'Can oral statements be required to be confirmed in writing within 15 days to qualify as confidential?',
      'Can the $250,000 liquidated damages clause be deleted in favor of actual proven damages?'
    ],
    persona_advice: {
      student: [
        'If you are an intern or student founder exploring a partnership, signing this could freeze your ability to build student startups in legal tech for 2 years.',
        'Never sign an NDA that contains non-compete provisions. NDAs are solely for keeping secrets, not stopping you from working.',
        'Ask to delete Section 5 completely before continuing any conversations.'
      ],
      business_owner: [
        'Section 5 is a massive corporate hazard: it blocks your business from developing any competing software in the legal AI domain worldwide for 2 years.',
        'The $250,000 liquidated damages penalty is triggered without proof of injury, creating catastrophic financial liability.',
        'The non-solicitation clause prevents you from hiring talented contractors or engineers for 3 years.',
        'Demand a clean standard mutual NDA stripped of restrictive covenants and punitive damage clauses.'
      ],
      lawyer: [
        'Section 5 introduces a restrictive covenant lacking geographic or functional tailoring, possibly an unreasonable restraint of trade.',
        'Perpetual duration in Section 4 without standard carve-outs (public knowledge, prior possession, independent development) is problematic.',
        'The $250k liquidated damages clause likely functions as an unenforceable penalty clause under Delaware jurisprudence.',
        'Remedy: Excise Section 5 in its entirety, introduce standard 2-year survival sunset, and incorporate customary exclusion exceptions.'
      ]
    },
    risk_analysis: [
      {
        text: "Recipient covenants that it shall not develop, commercialize, or invest in any competing software product within the legal AI domain worldwide for 24 months.",
        risk_level: "high",
        category: "Hidden Non-Compete",
        explanation: "Sneaks an industry-wide freeze into a preliminary NDA. You lose your right to operate in the legal AI field for two full years.",
        negotiation_tip: "Completely strike the non-compete sentence: Non-disclosure agreements should never restrict fair competition."
      },
      {
        text: "The obligations of non-disclosure and non-use under this Agreement shall survive... in perpetuity (forever)... regardless of whether it becomes generally known.",
        risk_level: "high",
        category: "Perpetual Liability",
        explanation: "You could be sued 20 years from now for discussing public industry knowledge simply because it was mentioned in a meeting.",
        negotiation_tip: "Counter with: 'Confidentiality obligations shall expire three (3) years from the date of disclosure.'"
      },
      {
        text: "...liquidated damages of $250,000 per violation without the necessity of posting bond or proving actual financial loss.",
        risk_level: "high",
        category: "Punitive Penalty",
        explanation: "A minor accidental mention could expose you to an instant $250,000 fine without the company having to prove any harm.",
        negotiation_tip: "Replace with: 'Disclosing party may seek appropriate equitable relief and recover actual proven direct damages.'"
      },
      {
        text: "Any idea or verbal statement made during meetings shall automatically be treated as Confidential Information without requiring written designation.",
        risk_level: "medium",
        category: "Vague Scope",
        explanation: "Makes it impossible to know what is secret and what is casual conversation.",
        negotiation_tip: "Require oral disclosures to be reduced to writing marked 'Confidential' within 14 calendar days."
      },
      {
        text: "...neither party shall directly or indirectly solicit, hire, or engage any employee or contractor of the other party for three (3) years.",
        risk_level: "medium",
        category: "Hiring Lockout",
        explanation: "Three-year non-solicit is unusually long for a preliminary exploratory conversation.",
        negotiation_tip: "Reduce non-solicitation period to 1 year and exclude general public job advertisements."
      },
      {
        text: "The parties wish to explore a potential business collaboration regarding artificial intelligence workflows...",
        risk_level: "low",
        category: "Standard Purpose",
        explanation: "Clear statement of exploratory intent.",
        negotiation_tip: "Ensure your specific project scope matches the stated Purpose."
      }
    ],
    demystification: [
      {
        section: "Section 4: Perpetual Confidentiality",
        summary: "They want you to promise to keep everything a secret for the rest of time, even if other people already know about it.",
        what_it_means_for_you: "You carry legal risk for your entire career over a preliminary conversation.",
        key_takeaway: "Cap confidentiality terms to 2 or 3 years max."
      },
      {
        section: "Section 5: Non-Compete and Non-Solicitation",
        summary: "They are trying to ban you from building competing software tools or hiring their employees for up to 3 years.",
        what_it_means_for_you: "Signing this could shut down your product roadmap or startup ideas.",
        key_takeaway: "Delete non-compete clauses from confidentiality agreements entirely."
      },
      {
        section: "Section 6: $250k Automatic Fine",
        summary: "If they claim you broke confidentiality, they demand a quarter-million dollars automatically without having to show they lost any money.",
        what_it_means_for_you: "Extremely dangerous clause that could bankrupt a small company or freelancer.",
        key_takeaway: "Insist on proven actual damages only."
      }
    ],
    mermaid: `flowchart TD
    A["🤝 NDA Discussions Begun"] --> B["⚠️ Non-Compete Detected in Section 5"]
    B --> C{"Strike Non-Compete?"}
    C -->|"Yes"| D["✅ Standard Mutual NDA Scope"]
    C -->|"No"| E["🚨 Immediate Block on Company Roadmap"]
    D --> F{"Cap Duration to 2 Years?"}
    F -->|"Accepted"| G["🛡️ Execute Balanced NDA"]
    F -->|"Refused"| H["⚠️ Assess Exposure Risk"]
    E --> I["🛑 DO NOT SIGN"]
    
    style A fill:#e0f2fe,stroke:#0284c7
    style B fill:#fee2e2,stroke:#ef4444
    style G fill:#dcfce7,stroke:#22c55e
    style I fill:#fef2f2,stroke:#b91c1c`
  },

  freelance: {
    id: 'freelance',
    name: 'Freelance Services Contract',
    filename: 'freelance_services_contract.txt',
    docType: 'Contractor Agreement',
    parties: ['OmniBrand Media Inc. (Client)', 'Alex Taylor (Contractor)'],
    metrics: {
      fairnessScore: 31,
      highRisks: 4,
      mediumRisks: 2,
      lowRisks: 1,
      readingTime: '3 min read',
      complexity: 'High (Severe One-Sided Risk)'
    },
    balance: {
      giver_percent: 78,
      receiver_percent: 22,
      explanation: 'Heavily skewed toward Client. The contractor guarantees unlimited revisions, waits 90 days for partial pay, suffers a 180-day holdback, gives up all IP rights to pre-existing code, and assumes unlimited personal liability.'
    },
    summary: `This is an Independent Contractor Agreement between OmniBrand Media and Alex Taylor for software development and UI design services totaling $6,000. It presents severe cash flow and liability risks for any freelance developer or design agency.

Under this contract, the client pays on Net-90 terms (3 months after completion) and holds back 40% ($2,400) for half a year (180 days). Meanwhile, the freelancer is forced to provide unlimited revisions until the client is "subjectively satisfied."

Even worse, the contractor signs away ownership of their pre-existing frameworks and code libraries, waives portfolio display rights, takes on unlimited personal liability for any software bugs, and is barred from working with other media or SaaS companies for 12 months.`,
    proactive_questions: [
      'Can payment terms be shifted to Net-15 or Net-30 with milestone payments (e.g., 50% deposit, 50% on completion)?',
      'Can the revision clause be capped at two rounds of revisions with an hourly rate for additional changes?',
      'Can pre-existing open-source and proprietary contractor tools remain the property of the contractor?',
      'Can liability be capped at the total amount paid under the agreement ($6,000)?'
    ],
    persona_advice: {
      student: [
        'A 180-day payment holdback means you might not receive your full earnings until 6 months after you complete the work.',
        'Unlimited revisions means the client can demand endless design changes without paying you an extra cent.',
        'Losing portfolio rights prevents you from showing your work to future employers or college programs.',
        'Request permission to showcase non-confidential screenshots in your design portfolio.'
      ],
      business_owner: [
        'Net-90 terms with a 40% 180-day retention will cripple agency cash flow and working capital.',
        'Work-for-hire assignment of "pre-existing frameworks" means you could accidentally assign your agency\'s core proprietary codebase to this single client.',
        'Unlimited personal liability for bugs is unacceptable for any commercial software engineering engagement.',
        'Insert standard limitation of liability capping contractor damages to the contract fee.'
      ],
      lawyer: [
        'Broad IP assignment capturing "pre-existing frameworks and background libraries" creates serious cloud-of-title issues for developer assets.',
        'Moral rights waiver and portfolio bar should be modified to include standard promotional carve-outs.',
        'Non-compete clause restricting contractor from providing services in the digital media/SaaS sector for 12 months is overbroad for a $6k engagement.',
        'Require mutual termination for convenience with mandatory pro-rata compensation for work-in-progress.'
      ]
    },
    risk_analysis: [
      {
        text: "Contractor agrees to indemnify, defend, and hold Client harmless... with unlimited financial liability extending to Contractor's personal assets.",
        risk_level: "high",
        category: "Unlimited Personal Liability",
        explanation: "If a software bug causes downtime for the client, they could legally pursue your personal savings, car, or home.",
        negotiation_tip: "Counter with: 'Contractor liability under this agreement shall be strictly capped at the total fees paid ($6,000).'"
      },
      {
        text: "Payment shall be made on Net-90 terms... Client reserves the right to withhold 40% of the total compensation until 180 days post-launch...",
        risk_level: "high",
        category: "Extreme Payment Delay",
        explanation: "You must wait 3 months for initial payment, and nearly 9 months for the remaining $2,400.",
        negotiation_tip: "Counter with: 'Net-15 payment terms upon milestone approval, with 0% post-launch retention.'"
      },
      {
        text: "All deliverables, inventions, code snippets, pre-existing frameworks, design assets, and background libraries... shall instantly become the exclusive property of Client...",
        risk_level: "high",
        category: "Loss of Pre-Existing IP",
        explanation: "You forfeit ownership of your own pre-built code templates, open source libraries, and tools you built before this project.",
        negotiation_tip: "Insert: 'Contractor retains sole ownership of Pre-Existing Tools and grants Client a non-exclusive license to use them.'"
      },
      {
        text: "During the project and for twelve (12) months following... Contractor shall not perform design or development services for any company in the digital media, SaaS, or advertising sector.",
        risk_level: "high",
        category: "Crippling Non-Compete",
        explanation: "Blocks you from taking jobs with almost any modern tech or marketing company for an entire year after finishing a single $6k gig.",
        negotiation_tip: "Strike Section 5 completely: Freelancers cannot be bound by non-competes without ongoing retainer pay."
      },
      {
        text: "Contractor shall provide unlimited revisions until Client is subjectively and completely satisfied.",
        risk_level: "medium",
        category: "Scope Creep",
        explanation: "The client can keep demanding changes indefinitely without paying more.",
        negotiation_tip: "Replace with: 'Contractor provides up to two (2) rounds of revisions. Additional revisions billed at $75/hr.'"
      },
      {
        text: "Contractor irrevocably waives all moral rights, authorship credit, and the right to showcase the work in their portfolio.",
        risk_level: "medium",
        category: "Portfolio Blackout",
        explanation: "You are banned from showing this work to future clients or employers.",
        negotiation_tip: "Counter with: 'Contractor reserves the right to showcase project screenshots in professional portfolios.'"
      },
      {
        text: "Client shall compensate Contractor a flat fee of $6,000.",
        risk_level: "low",
        category: "Agreed Fee",
        explanation: "Clear base payment amount specified for the project scope.",
        negotiation_tip: "Break into milestones: $2,000 upfront, $2,000 on beta delivery, $2,000 on final deployment."
      }
    ],
    demystification: [
      {
        section: "Section 1: Unlimited Revisions",
        summary: "The client expects you to work for free doing infinite redesigns until they personally feel like approving it.",
        what_it_means_for_you: "A 2-week job could easily turn into 6 months of unpaid tweaks and redesigns.",
        key_takeaway: "Always define a specific number of revision rounds in freelance contracts."
      },
      {
        section: "Section 2: Net-90 + 180-day Holdback",
        summary: "You don't get paid until 3 months after delivery, and they hold back nearly half your money for half a year.",
        what_it_means_for_you: "Extreme cash-flow delay that makes paying your bills difficult.",
        key_takeaway: "Standard freelance terms are Net-15 or Net-30 with zero holdback."
      },
      {
        section: "Section 3: IP and Pre-Existing Code Grab",
        summary: "The client claims ownership of your existing toolkits, templates, and libraries.",
        what_it_means_for_you: "You could lose the legal right to reuse your own coding libraries on future projects.",
        key_takeaway: "Always protect and retain background intellectual property."
      },
      {
        section: "Section 4: Unlimited Personal Financial Liability",
        summary: "If anything goes wrong, you could be sued for all your personal savings, not just the contract value.",
        what_it_means_for_you: "Massive risk disproportionate to a $6,000 project.",
        key_takeaway: "Cap liability to fees received under the contract."
      }
    ],
    mermaid: `flowchart TD
    A["💻 Freelance Project Begins"] --> B["⚠️ Dangerous Payment Terms"]
    B --> C{"Request Milestone Payments?"}
    C -->|"Net-15 / 50% Deposit"| D["💵 Healthy Cash Flow"]
    C -->|"Accept Net-90 + Holdback"| E["🛑 6-Month Cash Freeze"]
    A --> F["⚠️ IP & Liability Clauses"]
    F --> G{"Cap Liability to $6,000?"}
    G -->|"Yes"| H["🛡️ Personal Assets Protected"]
    G -->|"No"| I["🚨 Unlimited Personal Risk"]
    D --> J["✅ Fair Freelance Relationship"]
    H --> J
    
    style A fill:#e0f2fe,stroke:#0284c7
    style B fill:#fee2e2,stroke:#ef4444
    style F fill:#fee2e2,stroke:#ef4444
    style J fill:#dcfce7,stroke:#22c55e
    style E fill:#fef2f2,stroke:#b91c1c
    style I fill:#fef2f2,stroke:#b91c1c`
  }
};
