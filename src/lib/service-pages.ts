export type ServicePage = {
  approachIntro: string;
  faqs: Array<{
    answer: string;
    question: string;
  }>;
  helpCards: Array<{
    description: string;
    title: string;
  }>;
  intro: string[];
  metadata: {
    description: string;
    title: string;
  };
  name: string;
  slug: string;
};

export const servicePages: ServicePage[] = [
  {
    slug: "window-installation",
    name: "Window Installation",
    metadata: {
      title: "Window Installation | OLKORF Construction",
      description:
        "Professional window installation for homeowners who want better comfort, appearance, durability, and long-term performance."
    },
    intro: [
      "New windows can make a home feel quieter, brighter, and more comfortable. They can also help address drafts, water concerns, and aging materials that no longer perform the way they should.",
      "OLKORF Construction helps homeowners choose the right installation approach and completes the work with careful preparation, clean finishing, and respect for the home."
    ],
    helpCards: [
      {
        title: "Replace outdated windows",
        description: "Update older windows that are difficult to use, drafty, damaged, or simply ready for a cleaner look."
      },
      {
        title: "Improve energy efficiency",
        description: "Choose window options designed to help reduce drafts and improve everyday comfort."
      },
      {
        title: "Address water or air leaks",
        description: "We look closely at the opening, trim, and surrounding materials so the installation is done properly."
      },
      {
        title: "Upgrade appearance and comfort",
        description: "Refresh the way your home looks from the inside and outside while improving how each room feels."
      }
    ],
    approachIntro:
      "We focus on proper preparation, attention to detail, and clean installation practices.",
    faqs: [
      {
        question: "Do I need full-frame replacement?",
        answer:
          "Not always. If the existing frame is solid and in good condition, an insert installation may be a practical option. If there is damage, rot, or sizing concerns, full-frame replacement may be better."
      },
      {
        question: "How long does installation take?",
        answer:
          "Timing depends on the number of windows and the condition of the openings. Smaller projects can often move quickly, while larger projects are scheduled with more time for careful finishing."
      },
      {
        question: "Can you help select products?",
        answer:
          "Yes. We can talk through window styles, performance needs, appearance, and installation options so you feel comfortable with the plan."
      },
      {
        question: "Do you provide free estimates?",
        answer: "Yes. Share a few details about your project and we will be happy to discuss options and next steps."
      }
    ]
  },
  {
    slug: "entry-door-installation",
    name: "Entry Door Installation",
    metadata: {
      title: "Entry Door Installation | OLKORF Construction",
      description:
        "Professional entry door installation for homeowners who want better curb appeal, weather protection, security, and long-term value."
    },
    intro: [
      "A new entry door can change the way your home looks and feels from the moment someone walks up to it. It can also improve weather protection, security, and daily comfort.",
      "We help homeowners replace worn or damaged entry doors with a clean installation, proper fit, and finishing details that feel right for the home."
    ],
    helpCards: [
      {
        title: "Improve security",
        description: "Replace loose, aging, or damaged doors with a stronger and better-fitting entry system."
      },
      {
        title: "Upgrade curb appeal",
        description: "Choose a door style, color, and glass option that gives the front of your home a fresh look."
      },
      {
        title: "Replace damaged doors",
        description: "Address doors affected by wear, moisture, swelling, poor fit, or everyday use."
      },
      {
        title: "Improve weather protection",
        description: "A proper installation helps reduce drafts and keeps the opening better protected through Wisconsin seasons."
      }
    ],
    approachIntro:
      "We focus on proper preparation, attention to detail, and clean installation practices.",
    faqs: [
      {
        question: "Can you install doors with sidelights?",
        answer:
          "Yes. Entry systems with sidelights require careful measuring and preparation, and we can help plan the right approach."
      },
      {
        question: "What if my current door is not a standard size?",
        answer:
          "Many homes have openings that need extra attention. We review the existing opening and talk through product and installation options."
      },
      {
        question: "Will the trim and finishing be handled?",
        answer:
          "Yes. Finishing is part of a clean installation, and we pay attention to both the interior and exterior details."
      },
      {
        question: "Do you provide free estimates?",
        answer: "Yes. Send us a few details and we will follow up to discuss your entry door project."
      }
    ]
  },
  {
    slug: "patio-door-installation",
    name: "Patio Door Installation",
    metadata: {
      title: "Patio Door Installation | OLKORF Construction",
      description:
        "Professional patio door installation for sliding doors, French patio doors, replacement openings, and cleaner indoor-outdoor living."
    },
    intro: [
      "Patio doors bring light, views, and easy access to outdoor spaces. When they are hard to operate, drafty, or outdated, replacing them can make a big difference in daily use.",
      "We install patio doors with careful preparation, weather protection, and clean finishing so the opening works well and looks intentional."
    ],
    helpCards: [
      {
        title: "Replace hard-to-use doors",
        description: "Improve operation when sliding doors stick, drag, leak, or no longer close smoothly."
      },
      {
        title: "Create a brighter space",
        description: "Use larger glass and cleaner door styles to bring more natural light into the home."
      },
      {
        title: "Improve weather protection",
        description: "A careful installation helps protect the opening from drafts, water, and seasonal wear."
      },
      {
        title: "Upgrade appearance",
        description: "Refresh an important transition point between the inside of your home and the outdoors."
      }
    ],
    approachIntro:
      "We focus on proper preparation, attention to detail, and clean installation practices.",
    faqs: [
      {
        question: "Can you replace a sliding patio door?",
        answer:
          "Yes. Sliding patio door replacement is a common project, and we look closely at the opening, sill, and surrounding materials before installation."
      },
      {
        question: "Can I switch to French patio doors?",
        answer:
          "Often, yes. The right answer depends on the opening, available space, and product selection, so we review those details with you."
      },
      {
        question: "How do you handle weatherproofing?",
        answer:
          "We pay close attention to preparation, fit, flashing needs, and finishing so the door is installed with long-term performance in mind."
      },
      {
        question: "Do you provide free estimates?",
        answer: "Yes. Tell us about your patio door project and we will be happy to discuss options."
      }
    ]
  },
  {
    slug: "storm-door-installation",
    name: "Storm Door Installation",
    metadata: {
      title: "Storm Door Installation | OLKORF Construction",
      description:
        "Professional storm door installation for homeowners who want better entry protection, ventilation, convenience, and fit."
    },
    intro: [
      "A storm door can protect your entry door, add ventilation, and make everyday use more convenient. The right fit matters, especially through changing weather.",
      "We install storm doors with careful alignment, adjustment, and finishing so they open, close, and seal the way they should."
    ],
    helpCards: [
      {
        title: "Protect your entry door",
        description: "Add an extra layer between your main door and the weather."
      },
      {
        title: "Improve ventilation",
        description: "Choose a storm door style that lets in fresh air while keeping the entry protected."
      },
      {
        title: "Replace damaged storm doors",
        description: "Upgrade doors that no longer latch, close correctly, or look right on the home."
      },
      {
        title: "Improve fit and adjustment",
        description: "Proper installation helps avoid rubbing, sagging, air gaps, and frustrating daily use."
      }
    ],
    approachIntro:
      "We focus on proper preparation, attention to detail, and clean installation practices.",
    faqs: [
      {
        question: "Can you help choose a storm door style?",
        answer:
          "Yes. We can talk through full-view, ventilating, and practical everyday options based on how you use the entry."
      },
      {
        question: "Can a storm door be added to most entries?",
        answer:
          "Often, yes, but the opening and trim conditions matter. We review the entry before recommending the best path."
      },
      {
        question: "Why does adjustment matter?",
        answer:
          "Storm doors need proper alignment and closer adjustment so they latch well and operate smoothly."
      },
      {
        question: "Do you provide free estimates?",
        answer: "Yes. Share your entry details and we can discuss storm door options."
      }
    ]
  },
  {
    slug: "aluminum-wrapping",
    name: "Aluminum Wrapping & Exterior Trim",
    metadata: {
      title: "Aluminum Wrapping & Exterior Trim | OLKORF Construction",
      description:
        "Professional aluminum wrapping and exterior trim finishing for windows, doors, exposed wood, and cleaner low-maintenance exteriors."
    },
    intro: [
      "Exterior trim does more than finish the look of a window or door. It helps protect exposed materials and gives the project a clean, complete appearance.",
      "We provide aluminum wrapping and exterior trim work for homeowners who want a lower-maintenance finish with neat details and long-term protection."
    ],
    helpCards: [
      {
        title: "Protect exposed wood",
        description: "Cover vulnerable exterior trim areas to help reduce future maintenance."
      },
      {
        title: "Finish window projects cleanly",
        description: "Create crisp exterior lines around new or existing window openings."
      },
      {
        title: "Finish door projects cleanly",
        description: "Add a durable exterior trim finish around entry doors, patio doors, and related openings."
      },
      {
        title: "Improve long-term appearance",
        description: "A clean trim finish helps the outside of the home look more complete and cared for."
      }
    ],
    approachIntro:
      "We focus on proper preparation, attention to detail, and clean installation practices.",
    faqs: [
      {
        question: "What is aluminum wrapping?",
        answer:
          "Aluminum wrapping covers exterior trim with formed aluminum for a cleaner, more maintenance-friendly finish."
      },
      {
        question: "Can wrapping be done with window or door replacement?",
        answer:
          "Yes. It is often planned alongside window and door work so the finished exterior looks complete."
      },
      {
        question: "Does aluminum wrapping replace damaged wood?",
        answer:
          "No. Damaged or rotted material should be addressed before it is covered. We look for those concerns before finishing."
      },
      {
        question: "Do you provide free estimates?",
        answer: "Yes. Tell us what exterior trim areas you want to address and we can talk through options."
      }
    ]
  }
];

export const servicePageSlugs = servicePages.map((servicePage) => servicePage.slug);

export function getServicePage(slug: string) {
  return servicePages.find((servicePage) => servicePage.slug === slug);
}
