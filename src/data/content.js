// ─────────────────────────────────────────────
// All site copy lives here so pages stay declarative.
// ─────────────────────────────────────────────

export const SLOGAN = 'Beyond Artificial Intelligence, Towards Wisdom'

export const NAV = [
  { to: '/about', label: 'Founder' },
  { to: '/harms', label: 'The Harms' },
  { to: '/media', label: 'Voices' },
  { to: '/philosophy', label: 'Philosophy' },
]

export const MARQUEE = [
  'سلام · Salam · Peace',
  'Responsible AI',
  'Digital Justice',
  'Data Sovereignty',
  'Decolonizing Technology',
  'AI Ethics',
  'Human Dignity',
  'Feminist AI',
  'Ubuntu & Hikma',
  'Public Interest Technology',
  'AI & Health Justice',
]

// ─── About / Heritage ───
export const LIBRARIES = [
  {
    location: 'Iraq · Middle East',
    name: 'Baghdad',
    arabic: 'بيت الحكمة · Bayt al-Hikma',
    date: 'Est. 830 CE — The House of Wisdom',
    desc: 'The House of Wisdom was the greatest library and intellectual institution the medieval world had known. Under Abbasid patronage, scholars from across the known world gathered to translate, preserve, and extend Greek, Persian, Indian, and original Arab knowledge — in medicine, mathematics, astronomy, and philosophy.',
    facts: [
      'Over 400,000 manuscripts at its peak',
      'Scholars translated Plato, Aristotle, and Euclid — saving them for the world',
      'Al-Khwarizmi invented algebra here. Ibn Sina wrote his Canon here.',
      'The word algorithm derives from an Arab scholar’s name',
    ],
  },
  {
    location: 'Mali · West Africa',
    name: 'Timbuktu',
    arabic: 'تمبكتو · Sankore',
    date: 'Est. 989 CE — Sankore Madrasah & Libraries',
    desc: 'Timbuktu was the intellectual capital of sub-Saharan Africa and a global center of Islamic scholarship. The Sankore Madrasah and private libraries held hundreds of thousands of manuscripts on theology, law, mathematics, history, and medicine — proof that African intellectual life was vast, sophisticated, and entirely self-generated.',
    facts: [
      'Over 700,000 manuscripts have been identified — many still undiscovered',
      'Sankore University enrolled 25,000 students at its height',
      'Scholars corresponded with Cairo, Cordoba, and Baghdad as equals',
      'Africa’s intellectual history was never lost — only deliberately ignored',
    ],
  },
]

export const HERITAGE_STATS = [
  { num: '22', label: 'Arab Nations' },
  { num: '54', label: 'African Nations' },
  { num: '2B+', label: 'People. One Conversation.' },
  { num: '700K+', label: 'Timbuktu Manuscripts' },
]


export const FOUNDER = {
  thesis: 'She is not the footnote. She is the argument.',
  label: 'The Voice Behind the Vision',
  name: ['Maha', 'Jouini'],
  roles: [
    'AI Thought Leader',
    'AI Ethicist',
    'Researcher',
    'Advocate',
    'African Voice in AI Governance',
  ],
  quote:
    '“My people built the foundations of human knowledge. I am here to ensure that foundation shapes the future — with peace, wisdom, and a deep reverence for our shared humanity.”',
  bio: 'Maha Jouini is an AI ethicist, researcher, and advocate working at the intersection of technology, ethics, gender, health justice, and African philosophy. She serves in leadership and advisory roles across AI governance initiatives, contributing to continental and international discussions on responsible AI, digital rights, and inclusive technology governance. Her work centers responsible AI in Africa, feminist technology governance, AI and vulnerable communities, data justice, and AI literacy — building technology ecosystems rooted not only in intelligence, but in wisdom.',
  stats: [
    { num: '2B+', label: 'Arab & African Voices' },
    { num: '1,200', label: 'Years of Tradition' },
    { num: '∞', label: 'Intellectual Legacy' },
  ],
}

// ─── Vision ───
export const VISION_INTRO =
  'HIKMA AI bridges AI and philosophy, technology and ethics, innovation and social justice, global debates and local realities. Grounded in سلام, Ubuntu, and Hikma — built for youth, women, policymakers, journalists, and vulnerable communities across Africa and the Arab world.'

export const VISION = [
  {
    num: '01',
    title: 'Democratize AI Knowledge',
    text: 'Translating complex AI concepts, research papers, and policy discussions into accessible, human-centered multimedia content — in language that speaks to people, not just specialists.',
  },
  {
    num: '02',
    title: 'Promote Ethical & Human-Centered AI',
    text: 'Encouraging AI governance approaches rooted in dignity, inclusion, Ubuntu, Hikma, and social responsibility — because intelligence without ethics is just power.',
  },
  {
    num: '03',
    title: 'Amplify Global South Perspectives',
    text: 'Creating a platform where African, Arab, and marginalized voices shape conversations around technology and the future — not as counterpoint, but as the main argument.',
  },
  {
    num: '04',
    title: 'Build Critical Thinking Around Technology',
    text: 'Helping audiences critically analyze the political, economic, philosophical, and cultural implications of AI systems — so no community is governed by a technology it was never invited to understand.',
  },
  {
    num: '05',
    title: 'Support Vulnerable Communities',
    text: 'Advocating for ethical AI systems that protect women, youth, displaced communities, and people living with chronic diseases — because the communities most harmed by bad AI are often those with the least power to change it.',
  },
  {
    num: '06',
    title: 'سلام · Peace & Governance',
    text: 'Salam — peace — is not the absence of conflict. It is the presence of justice. HIKMA advocates for AI governance built on dignity, equity, and the long wisdom of peoples who have known what is lost when peace fails.',
  },
]

// ─── The Harms ───
export const HARMS_INTRO =
  'Philosophy without proof is just poetry. Here is what happens when AI is built without the wisdom of Arab and African civilization in the room — right now, to real people, in our nations.'

export const HARMS = [
  {
    tag: 'Arabic NLP · Language',
    title: 'Arabic is treated as a low-resource language by the systems that will govern it',
    text: 'Arabic is spoken by 400 million people across 22 nations — yet most large language models perform significantly worse in Arabic than in English. Dialects like Darija, Hassaniya, and Levantine are nearly invisible. When content moderation, medical AI, and judicial systems run on models that misread Arabic, the consequences fall on Arab lives.',
  },
  {
    tag: 'Facial Recognition · Africa',
    title: 'African faces are misidentified at rates that would never be tolerated elsewhere',
    text: 'MIT research documented that facial recognition systems misidentify dark-skinned women at error rates up to 34.7% — versus 0.8% for light-skinned men. These systems are now used in law enforcement, border control, and banking across Africa. The bodies these systems fail are African bodies. The cost is paid by African people.',
  },
  {
    tag: 'Health AI · Bodies',
    title: 'Health AI is trained on Western bodies and deployed everywhere else',
    text: 'Most medical AI datasets are drawn from predominantly Western, white populations. Diagnostic AI for skin conditions, cardiac risk, and disease detection performs measurably worse on African and Arab patients. This is not an edge case — it is a structural bias embedded into systems that will decide who gets diagnosed and who gets missed.',
  },
  {
    tag: 'Digital Sovereignty · Governance',
    title: '54 African nations are governed by AI policy written in rooms they were never invited into',
    text: 'The frameworks shaping global AI governance — from the EU AI Act to US executive orders — were written without meaningful participation from African or Arab governments. The rules of the AI age are being set without us. HIKMA exists because wisdom without representation is just another form of power speaking only to itself.',
  },
]

// ─── Media ───
export const MEDIA = [
  {
    num: '01',
    featured: true,
    type: 'Podcast · Book Commentary',
    title: 'The Hikma Dialogues',
    text: 'Long-form conversations and book commentary at the intersection of artificial intelligence, philosophy, and the human experience. Episodes explore AI ethics through the voices of thinkers, activists, and community leaders from the Global South — making complex ideas accessible to everyone.',
    link: 'Listen Now',
  },
  {
    num: '02',
    type: 'Video Essays',
    title: 'Global AI Explained',
    text: 'Short and long-form video essays on global AI developments, ethical dilemmas, tech policy, and AI trends from a Global South perspective.',
    link: 'Watch Essays',
  },
  {
    num: '03',
    type: 'Research & Education',
    title: 'Articles, Briefs & Explainers',
    text: 'Articles, policy briefs, concept notes, and youth-friendly AI literacy content — translating research into public understanding.',
    link: 'Read Research',
  },
  {
    num: '04',
    type: 'Community Conversations',
    title: 'In Conversation',
    text: 'Interactive discussions with researchers, journalists, artists, engineers, activists, philosophers, and civil society actors shaping the future of AI.',
    link: 'Join the Dialogue',
  },
  {
    num: '05',
    type: 'Commentary',
    title: 'Books & Philosophy',
    text: 'Deep commentary on texts shaping human thought on technology — examined through a Global South lens and grounded in the traditions of Hikma and Ubuntu.',
    link: 'Read Commentary',
  },
]

// ─── The Hikma Dialogues — podcast series ───
export const PODCAST = {
  name: 'The Hikma Dialogues',
  arabic: 'حوارات الحكمة',
  tagline: 'A podcast at the intersection of artificial intelligence, philosophy, and the human experience.',
  intro:
    'Every fortnight, HIKMA sits down with the thinkers, builders, and elders shaping how the Global South meets artificial intelligence. These are long-form conversations — unhurried, rigorous, and human — that trace each technical question back to an older one: what does it mean to live well, together, in a world we are now teaching to think.',
  // YouTube links are placeholders for now (`youtube: '#'`).
  stats: [
    { num: '24', label: 'Episodes Released' },
    { num: '19', label: 'Countries Featured' },
    { num: '120K+', label: 'Listeners' },
  ],
}

export const EPISODES = [
  {
    num: '01',
    title: 'Whose Intelligence? AI and the Arabic Language',
    guest: 'Dr. Lina Haddad',
    role: 'Computational Linguist, Beirut',
    duration: '58 min',
    date: 'Jun 2026',
    blurb:
      'The language of 400 million people is still treated as “low-resource.” We trace what reclaiming Arabic NLP — dialects and all — would actually take, and who gets to decide.',
    youtube: '#',
  },
  {
    num: '02',
    title: 'The Faces Machines Cannot See',
    guest: 'Amara Okafor',
    role: 'Algorithmic Justice Researcher, Lagos',
    duration: '1 hr 04 min',
    date: 'May 2026',
    blurb:
      'From error rates to arrest records — how facial recognition fails African faces, and what a refusal to be measured by broken systems looks like in practice.',
    youtube: '#',
  },
  {
    num: '03',
    title: 'Medicine for Bodies the Data Forgot',
    guest: 'Dr. Youssef Benali',
    role: 'Physician & Health-AI Ethicist, Rabat',
    duration: '52 min',
    date: 'May 2026',
    blurb:
      'When diagnostic AI is trained on Western bodies and deployed everywhere else, who gets missed? A conversation on health justice and the politics of the dataset.',
    youtube: '#',
  },
  {
    num: '04',
    title: 'Data Sovereignty and the Rooms We Were Left Out Of',
    guest: 'Fatou Diop',
    role: 'Digital Policy Lead, Dakar',
    duration: '1 hr 11 min',
    date: 'Apr 2026',
    blurb:
      'Fifty-four nations governed by rules written elsewhere. What it would mean for Africa and the Arab world to set — not just receive — the terms of the AI age.',
    youtube: '#',
  },
  {
    num: '05',
    title: 'A Feminist Grammar for Machines',
    guest: 'Salma Cherif',
    role: 'Feminist Technologist, Tunis',
    duration: '47 min',
    date: 'Apr 2026',
    blurb:
      'Beyond “bias” as a bug. We talk about care, power, and what it means to build technology that begins from the people it most often harms.',
    youtube: '#',
  },
  {
    num: '06',
    title: 'Hikma: What the Philosophers Knew',
    guest: 'Prof. Idris Wangara',
    role: 'Philosopher of Science, Timbuktu',
    duration: '1 hr 19 min',
    date: 'Mar 2026',
    blurb:
      'From Ibn Sina’s soul to Ubuntu’s “I am because we are” — why wisdom, not just intelligence, is the measure a technology must answer to.',
    youtube: '#',
  },
]

// ─── Articles (Voices · Essays & Field Notes) ───
// Each article has a unique numeric id; `body` is an array of paragraph strings
// rendered with drop-cap styling on the first paragraph. Cover images use
// Unsplash so the article cards always have rich visuals without local assets.
export const ARTICLES = [
  {
    id: 1,
    tag: 'Field Notes',
    title: 'The Voice the Algorithm Could Not Find',
    excerpt:
      'Six months of recording dialect Arabic in a Tunis café — and what the silence in our datasets actually sounds like.',
    cover:
      'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?w=1600&q=80&auto=format&fit=crop',
    author: 'Maha Jouini',
    role: 'Founder, HIKMA AI',
    date: 'June 18, 2026',
    readTime: '8 min read',
    body: [
      'For half a year, I sat in the same café in Bab Bhar with a microphone, a notebook, and the patience of people who knew their language had never been listened to properly. The voices I recorded were not in textbook Modern Standard Arabic. They were Tunisian — fast, lyrical, full of French and Berber and the rhythm of street life. They were also, by every measure that matters to a machine, invisible.',
      'When we talk about "low-resource languages" in machine learning, we use the phrase as if it described an act of nature. As if some languages were simply born poor in data. The truth is exactly the opposite. The data is everywhere. It is in markets and mosques and weddings and the back rooms of barbershops. What is missing is the will to gather it on terms that respect the people who speak it.',
      'A community-led data project is not a "dataset". It is a relationship. The voices in my recorder belong to people whose names I know. Any model trained on them carries an obligation — not metaphorically, but contractually — to serve those communities first. This is the simple, unsexy starting point that almost no major AI lab has been willing to accept.',
      'There is a version of the next decade where Arabic-language AI is built in San Francisco from scraped web text, deployed back to our nations, and quietly reshapes how 400 million people are understood by the systems that govern their lives. There is another version where it is built here, with our hands, on our terms. The difference is not a question of technology. It is a question of who owns the silence.',
    ],
  },
  {
    id: 2,
    tag: 'Essay',
    title: 'Hikma Before Intelligence: What the Philosophers Knew',
    excerpt:
      'Ibn Sina did not separate the mind from its responsibility to the world. Neither should we — even when the mind is silicon.',
    cover:
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&q=80&auto=format&fit=crop',
    author: 'Prof. Idris Wangara',
    role: 'Philosopher of Science · Timbuktu',
    date: 'June 4, 2026',
    readTime: '12 min read',
    body: [
      'In the long arc of Islamic philosophy, the word for wisdom — hikma — is never used carelessly. It is not a synonym for cleverness, nor for knowledge, nor for skill. Ibn Sina, writing in the eleventh century, defines it as the perfecting of the human soul through the apprehension of truth and the practice of right action. A mind that knows but does not act rightly has not yet become wise.',
      'It is striking how thoroughly the modern conversation about artificial intelligence has stripped this dimension out. We speak of capability benchmarks, parameter counts, reasoning scores. We speak rarely, and reluctantly, of whether the resulting systems are wise. The word feels embarrassing in a technical room. It should not.',
      'The Greek tradition Aristotle handed down — and which the Arab philosophers preserved when Europe was no longer capable of doing so — drew a careful distinction between sophia (theoretical wisdom) and phronesis (practical wisdom). The latter was the one that mattered for governance, for medicine, for any field where a wrong answer could ruin a life. It is, almost exactly, the kind of wisdom we are now failing to encode into the systems we are deploying into governance, medicine, and policing.',
      'To recover hikma as a category in the design of AI is not to add a soft layer of "ethics" on top of an otherwise neutral technology. There is no such neutral technology. To recover hikma is to insist that the question "should we build this?" cannot be downstream of "can we build this?" — that the order of those two questions is itself a moral choice.',
    ],
  },
  {
    id: 3,
    tag: 'Investigation',
    title: 'Faces the Cameras Cannot See: A Year on the Lagos Beat',
    excerpt:
      'How a single facial-recognition contract reshaped policing in West Africa\'s largest city — and the women who pushed back.',
    cover:
      'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=1600&q=80&auto=format&fit=crop',
    author: 'Amara Okafor',
    role: 'Algorithmic Justice Researcher · Lagos',
    date: 'May 22, 2026',
    readTime: '15 min read',
    body: [
      'The contract was signed quietly, on a Tuesday in October, in a conference room two blocks from the National Assembly. By the following spring, eleven thousand cameras across Lagos were piping live video to a facial-recognition system whose error rate on darker-skinned faces had never been independently audited. Nobody in the city had been asked.',
      'I spent a year reporting on the rollout. What I found was not a story of technological failure — the system failed, yes, but it had been built knowing it would fail. The story is about what happens when a tool whose failures are foreseeable is deployed anyway, against a population that was never going to be the one writing the procurement specifications.',
      'The women who organized the resistance came from three movements that had not previously spoken to one another: market-women\'s associations whose members were being misidentified at checkpoints, lawyers from the bail-reform coalition, and a small cohort of computer scientists who had read the wrong papers and could not unread them. They built a public dossier. They forced a hearing. They are still fighting, but the numbers on misidentification have started to fall.',
      'This is what algorithmic justice work actually looks like, far from the conference panels: it is paperwork, court filings, a refusal to be patient. It is also the proof — for anyone still asking — that the harms of AI are not a future problem. They are already here, in the booking room of a precinct in Yaba, where a woman who has never broken a law is being asked, again, to explain her face.',
    ],
  },
  {
    id: 4,
    tag: 'Dispatch',
    title: 'What the Sankore Manuscripts Are Still Teaching Us',
    excerpt:
      'Seven hundred thousand surviving texts. A continent that was never silent. A model for what a public AI archive could become.',
    cover:
      'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=1600&q=80&auto=format&fit=crop',
    author: 'Fatou Diop',
    role: 'Digital Policy Lead · Dakar',
    date: 'May 9, 2026',
    readTime: '10 min read',
    body: [
      'There is a long-standing fiction in Western intellectual history that Africa was an oral continent, its knowledge held only in voice, vulnerable in the way that oral traditions are imagined to be vulnerable. The Sankore manuscripts — over seven hundred thousand texts surviving in family libraries across Mali — are the simplest possible refutation of that fiction. They are also a roadmap.',
      'For most of the past decade, the question of what a "public" AI archive should look like has been argued in the terms of Silicon Valley and Brussels. Should training data be opt-in or opt-out? Should it respect copyright? Should there be a licensing regime? These are real questions, but they are also small ones. They assume the archive is something a company gathers, with the public as a passive donor of text.',
      'The Sankore tradition offers a different model. The manuscripts were preserved across centuries by families who understood themselves as custodians, not owners. Knowledge belonged to the community that produced it; access was a privilege earned through scholarship and conferred through teaching. A digital archive built on those terms would not look like Common Crawl. It would look like a relationship.',
      'It is possible to build AI systems that are accountable to the communities whose knowledge they encode. It is possible because it has been done before, for seven hundred years, in a city whose libraries the algorithm has never heard of. The question is whether we are willing to learn from people who solved this problem long before we invented it.',
    ],
  },
]

// ─── Philosophy timeline ───
export const PHILOSOPHERS = [
  {
    era: '469–399 BCE · Athens',
    name: 'Socrates',
    arabic: null,
    desc: 'The examined life. Socrates gave humanity its first rigorous method of questioning — a tradition HIKMA AI carries forward into the age of algorithms, insisting that every system built must first be interrogated.',
  },
  {
    era: '384–322 BCE · Athens',
    name: 'Aristotle',
    arabic: null,
    desc: 'Phronesis — practical wisdom. He distinguished knowledge from the wisdom to apply it rightly. Arab scholars preserved and extended his work, carrying it to civilizations that would not have survived without their custodianship.',
  },
  {
    era: '872–950 CE · Baghdad',
    name: 'Al-Farabi',
    arabic: 'الفارابي · The Second Teacher',
    desc: 'The Islamic Golden Age was not a footnote to Greek thought — it was a new chapter in human knowledge. Al-Farabi synthesized philosophy, governance, and ethics into a universal vision that shaped three continents.',
  },
  {
    era: '980–1037 CE · Persia',
    name: 'Ibn Sina',
    arabic: 'ابن سينا · Avicenna',
    desc: 'Medicine, philosophy, metaphysics — Ibn Sina mastered them all and gave the world frameworks it still uses. His definition of Hikma as the perfecting of the human soul lives at the heart of what HIKMA AI is building.',
  },
  {
    era: '1126–1198 CE · Cordoba',
    name: 'Ibn Rushd',
    arabic: 'ابن رشد · Averroes',
    desc: 'From Andalusia to the European Renaissance — his commentaries on Aristotle ignited a philosophical revolution the West could not have achieved without him. This is what intellectual generosity across civilizations looks like.',
  },
  {
    era: 'Today · Global',
    name: 'HIKMA AI',
    arabic: 'حكمة · سلام · Wisdom, Peace & Humanity',
    desc: 'We are not newcomers to this conversation. We are its continuation. HIKMA AI asks the question every era of philosophy has asked — what does it mean to be human? — and insists that no technology is worthy of us until it answers with honesty, with peace, and with love for humanity in all its forms.',
    highlight: true,
  },
]

export const QUOTE = {
  // segments with `em: true` are highlighted in gold
  parts: [
    { t: 'Technology must serve ' },
    { t: 'dignity', em: true },
    { t: ' instead of domination, ' },
    { t: 'wisdom', em: true },
    { t: ' instead of exploitation — and collective human ' },
    { t: 'flourishing', em: true },
    { t: ' instead of exclusion.' },
  ],
  attr: 'Maha Jouini · HIKMA AI',
}

// ─── Contact ───
export const CONTACT = {
  arabic: 'تواصل معنا',
  kicker: 'Partnerships & The Podcast',
  lede: 'Every great library began as a conversation. Whether you want to build something with us or take the seat across the mic, this is where it starts.',
  tracks: [
    {
      tag: 'Partner with us',
      text: 'Institutions, researchers, funders, and builders shaping ethical AI across Africa and the Arab world — let’s make something with wisdom at its center.',
    },
    {
      tag: 'Be on the podcast',
      text: 'Thinkers, activists, artists, and elders with something to say about technology and what it means to be human. Pull up a chair to The Hikma Dialogues.',
    },
  ],
  note: 'Attach a PDF — a proposal, a paper, your bio, a pitch. We read everything.',
  email: 'hello@hikma.ai',
  // success copy
  successTitle: 'Your message is on its way',
  successText: 'Thank you for reaching out. We read everything — expect a reply soon.',
}

export const FOOTER_LINKS = [
  {
    heading: 'Platform',
    links: ['Podcast', 'Video Essays', 'Research', 'Interviews', 'Commentary'],
  },
  {
    heading: 'Foundation',
    links: ['About HIKMA', 'Maha Jouini', 'Vision & Mission', 'Collaborations', 'Press'],
  },
  {
    heading: 'Connect',
    links: ['Contact', 'Newsletter', 'Speaking', 'Partnerships', 'Support the Work'],
  },
]
