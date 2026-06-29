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
    'AI Ethicist',
    'Researcher',
    'Arabic Writer',
    'Founder · HIKMA AI',
    'Founder · CHIFAA',
  ],
  quote:
    '“Being realistic means preferring a modest reform that enables another, to an impossible miracle.” — Habib Bourguiba',
  // Bio rendered as a series of paragraphs so the layout breathes.
  bioParts: [
    'Maha Jouini is a North African AI ethicist, researcher, founder, and Arabic writer working at the intersection of artificial intelligence, decolonial technology, health justice, and public-interest innovation. Her work focuses on the governance of AI in contexts too often excluded from mainstream technological design — including African societies, Arabic-speaking communities, women’s health, and vulnerable populations living at the edges of data, language, and power.',
    'She is the founder of HIKMA AI, a media, research, and public education platform reconnecting artificial intelligence with wisdom, dignity, and the intellectual traditions of Africa and the Arab world. She is also the founder of CHIFAA, a survivor-led AI initiative supporting women living with breast and cervical cancer in North Africa through culturally grounded, multilingual, and ethically governed technology.',
    'Over more than a decade, Maha has shaped AI policy, digital rights, and public-interest technology agendas across Africa and Europe. She has served as a Research Fellow at the Global Center on AI Governance, a Module Lead for UNESCO’s AI Ethics MOOC, a consultant for GIZ Tunisia, a researcher and supervisor for the Global Index on Responsible AI (GIRAI), and a Digital Transformation Consultant in Mauritania. She is also part of UNFPA Tunisia’s pool of experts contributing to a study on Artificial Intelligence and Technology-Facilitated Gender-Based Violence in Tunisia.',
    'Her research and policy work focuses on responsible AI, data sovereignty, digital colonialism, and Africa-led approaches to AI governance — including a Springer chapter on Africa-led responsible AI design. She is the winner of the She Shapes AI Global Award in Thought Leadership in AI.',
    'Alongside her work in technology and policy, Maha is an Arabic writer and short-story author. Her published literary works include A Lover from Africa and The Last Dance: From Carthage to China. Her writing has been recognised as part of contemporary Arab creative production, and her books have been featured by the Centre for Women’s Studies at Tunisia’s Ministry of Women and the National Library of Tunisia.',
  ],
  // Affiliations rendered as a tidy two-column credentials list.
  credentials: [
    { role: 'Research Fellow', org: 'Global Center on AI Governance' },
    { role: 'Module Lead', org: 'UNESCO · AI Ethics MOOC' },
    { role: 'Consultant', org: 'GIZ Tunisia' },
    { role: 'Researcher & Supervisor', org: 'Global Index on Responsible AI (GIRAI)' },
    { role: 'Digital Transformation Consultant', org: 'Mauritania' },
    { role: 'Expert Pool', org: 'UNFPA Tunisia · AI & TF-GBV' },
  ],
  stats: [
    { num: '10+', label: 'Years Shaping AI Policy' },
    { num: '2', label: 'Published Literary Works' },
    { num: '1', label: 'She Shapes AI Global Award' },
  ],
}

// ─── Why I Founded HIKMA (founder's manifesto, shown below the bio) ───
export const WHY_HIKMA = {
  arabic: 'لماذا أسستُ حكمة',
  kicker: 'A Founder’s Manifesto',
  // The page wraps `titleEm` in <em>.
  titlePre: 'Why I Founded',
  titleEm: 'HIKMA',
  // The opening line, set apart as a pull-quote.
  opener:
    'Wisdom without power changes nothing — and power without wisdom destroys everything.',
  // Body paragraphs.
  body: [
    'For too long, the global AI conversation has been built as though Africa and the Arab world exist only to be studied, governed, translated, or “included” after the rules are already written. A 34.7% error rate on dark-skinned faces. Arabic — spoken by more than 400 million people — treated as a low-resource language by the systems that will govern it. Medical AI trained on Western bodies, then deployed on ours. These are not oversights. They are what happens when technology is built without us in the room.',
    'HIKMA was built from a different premise: that we were never latecomers to knowledge, ethics, or public reason. Long before Silicon Valley, our intellectual traditions built some of the world’s great centres of learning, law, philosophy, and medicine. The question is not whether we have something to contribute to the future of AI. The question is why that future has been allowed to proceed as though our traditions, languages, and communities were intellectually optional.',
    'Bourguiba once wrote that realism means choosing the modest reform that makes the next one possible. HIKMA is that first reform — not a utopia, but a platform. A media, research, and public education space rooted in wisdom, accountable to our communities, and unwilling to accept that intelligence can be separated from dignity, or technology from moral responsibility.',
    'I built HIKMA to insist that Africa and the Arab world are not footnotes to the age of artificial intelligence. We are among the voices that must define what ethical, human, and politically accountable AI should be.',
  ],
  // Closing rhetorical question + sign-off line, given special typographic weight.
  closing: 'What does it mean to build intelligence worthy of humanity?',
  signoff: 'We are its continuation.',
}

// ─── Bayt al-Hikma · Baghdad ───
export const BAYT_AL_HIKMA = {
  city: 'Baghdad',
  arabic: 'بيت الحكمة',
  era: 'Founded c. 830 CE',
  subtitle: 'The House of Wisdom',
  lede:
    'At its height, Bayt al-Hikma was not merely a library — it was a civilisation’s metabolism, the organ through which the Abbasid caliphate digested the inherited wisdom of Greece, Persia, and India and transformed it into something entirely new.',
  body: [
    'Caliph al-Ma’mun, who founded the institution in its mature form around 830 CE, understood what many rulers before and since have not: that power without knowledge is fragile, and that the accumulation of ideas is the most durable form of conquest.',
    'Scholars arrived from every corner of the known world. Christians translated Galen and Hippocrates into Arabic. Jewish scholars carried Talmudic logic into dialogue with Aristotle. Zoroastrian astronomers brought Persian star tables that dwarfed anything the Greek tradition had preserved. And Muslim mathematicians — al-Khwarizmi above all — synthesised all of it into entirely new disciplines. The word algebra is his. So, in a manner, is the word algorithm.',
    'The translation movement was never passive. When Hunayn ibn Ishaq rendered Galenic medicine into Arabic, he did not simply copy; he corrected errors, collated manuscripts, and wrote original commentaries that the Greek originals had not prompted. Ibn al-Haytham set aside intuition in favour of a radical idea: that knowledge of the physical world must be earned through systematic experiment and observation. The telescope Galileo pointed at Jupiter’s moons was, in a real intellectual sense, descended from the darkened room in which Ibn al-Haytham had bent light through a pinhole and measured what he saw.',
  ],
  pullquote:
    '“The caliph reportedly dreamed of Aristotle and awoke resolved to own every word the philosopher had ever written — in Arabic.”',
  scholars: [
    { name: 'Al-Khwarizmi', field: 'Mathematics · Astronomy', text: 'Gave the world algebra and the decimal positional system.' },
    { name: 'Hunayn ibn Ishaq', field: 'Medicine · Translation', text: 'Rendered Galen into Arabic with critical commentary that often improved on the original.' },
    { name: 'Al-Kindi', field: 'Philosophy · Optics', text: 'First philosopher of the Islamic world; pioneer of cryptography.' },
    { name: 'Ibn al-Haytham', field: 'Optics · Scientific Method', text: 'His Book of Optics preceded Kepler by six centuries.' },
  ],
  westwardTitle: 'The journey westward',
  westwardIntro: 'Knowledge does not stay where it is made. By the tenth century, the same river of learning that flowed through Baghdad had reached Córdoba, where the Umayyad caliphate had built a rival library said to hold four hundred thousand volumes — more books than existed in all of Christian Europe at the time.',
  timeline: [
    { year: 'c. 830 CE', text: 'Al-Ma’mun establishes Bayt al-Hikma; the state translation programme begins.' },
    { year: 'c. 1000 CE', text: 'Córdoba becomes Baghdad’s western twin, drawing European scholars south across the Pyrenees.' },
    { year: 'c. 1120 CE', text: 'Adelard of Bath returns to England with Arabic manuscripts — Euclid, astronomical tables, natural philosophy: the seed-packet of the European scientific revolution.' },
    { year: '1258 CE', text: 'The Mongol sack of Baghdad ends the Abbasid caliphate. The Tigris is said to have run black with ink. But the knowledge had already moved westward — into the hands of those who would build on it.' },
  ],
  closing:
    'The deeper inheritance of the House of Wisdom is not the algebra, though we use it daily. Not the astronomical tables, though they guided Columbus. The inheritance is the method: the conviction that knowledge belongs to no single civilisation, and that the accumulated light of every culture, translated patiently into a common tongue, is brighter than any one flame burning alone.',
}

// ─── Timbuktu · Sankore ───
export const TIMBUKTU = {
  city: 'Timbuktu',
  arabic: 'تمبكتو',
  era: '12th – 17th centuries CE',
  subtitle: 'Intellectual Capital of Sub-Saharan Africa',
  lede:
    'Long before the word “university” had settled into the European mind, Timbuktu was already a city of scholars. Its libraries were not curiosities or royal hoards — they were living institutions, passed from generation to generation within families who understood manuscripts to be sacred inheritances, as weighty as land.',
  stats: [
    { num: '25,000', label: 'Students at Sankore at its peak' },
    { num: '700K+', label: 'Manuscripts surviving today' },
    { num: '40+', label: 'Books authored by Ahmad Baba' },
  ],
  body: [
    'The Sankore Madrasah grew from a mosque founded in 989 CE and by the 12th century had become something far larger than a place of worship. It was a confederation of independent colleges, each anchored by a master scholar who granted authorisation to teach only after years of rigorous study. The highest degree — equivalent to a doctorate — took a decade to earn and required an original written work, the Risaleh. Graduates were recognised across the Muslim world.',
    'Subjects ranged across theology and law, but the curriculum was not narrowly religious. Mathematics, astronomy, medicine and surgery, philosophy, geography, chemistry, and linguistics all had their place. Students also trained in trade and craftsmanship — carpentry, navigation, agriculture, tailoring — because Sankore understood that the life of the mind and the life of the market were not enemies.',
  ],
  subjects: [
    'Theology & Law',
    'Mathematics',
    'Astronomy',
    'Medicine & Surgery',
    'Philosophy',
    'Geography & History',
    'Chemistry & Physics',
    'Trade & Navigation',
    'Language & Linguistics',
  ],
  pullquote:
    '“Many Timbuktu scholars possessed personal libraries of hundreds or thousands of books. Masters delivered authorisation to teach specific texts to their students — the prestige depended on the pedigree of the scholar.”',
  pullattr: '— Ousmane Oumar Kane, Beyond Timbuktu',
  scholars: [
    { name: 'Ahmad Baba al-Timbukti', field: 'Last Chancellor of Sankore', text: 'Grammarian, philosopher, author of over forty works. His personal library held 1,600 volumes. Exiled to Morocco in 1591; his captors reportedly marvelled at his erudition.' },
    { name: 'Mahmud Kati', field: 'Chronicler · Historian', text: 'His Tarikh al-Fattash documented the Songhai Empire with the precision of a modern archivist. He recorded a meteor shower in 1593 with the eye of a natural philosopher.' },
    { name: 'Al-Qadi Aqib ibn Mahmud', field: 'Founder of Sankore Mosque', text: 'Chief judge of Timbuktu, founded the mosque in 989 CE — the seed from which the university grew. A wealthy Mandinka woman funded its full institutional development.' },
    { name: 'Ibn Yunus (via Timbuktu)', field: 'Astronomy', text: 'The Egyptian astronomer’s tables were copied and taught here. Surviving pages dense with star data prove that the city tracked the heavens with the same tools as Cairo and Baghdad.' },
  ],
  manuscriptsTitle: 'What the manuscripts contain',
  manuscriptsBody:
    'The surviving manuscripts range from short private letters to multi-volume legal encyclopaedias. Scribes in Timbuktu translated Plato, Hippocrates, and Avicenna. Local authors wrote original treatises on jurisprudence, the movement of stars in relation to the Islamic calendar, and the therapeutic properties of desert plants. Written primarily in Arabic — the lingua franca of Islamic scholarship — but also in local languages rendered in Arabic script: Fula, Songhay, Tamasheq, Bambara, Soninke. Africa was not consuming knowledge from elsewhere and leaving no trace of itself. It was producing knowledge in its own languages, in its own voice.',
  timeline: [
    { year: '989 CE', text: 'Al-Qadi Aqib founds the Sankore Mosque. A wealthy Mandinka woman funds its development into a centre of learning.' },
    { year: '1324', text: 'Mansa Musa returns from Mecca with architect Es Saheli, who builds the mosques and academies that define Timbuktu’s skyline. European mapmakers begin to draw him on their charts — a Black sovereign equal to any Christian king.' },
    { year: '12th–16th c.', text: 'Golden age. Sankore enrols 25,000 students. Private libraries proliferate. Timbuktu becomes the intellectual capital of sub-Saharan Africa.' },
    { year: '1591', text: 'Moroccan invasion. The Songhai Empire falls. Ahmad Baba is exiled to Marrakesh. The city begins its long intellectual decline, though libraries survive in private hands for centuries more.' },
    { year: '1893', text: 'French colonial rule. Arabic education is systematically marginalised. Manuscripts are sold off piecemeal.' },
    { year: '2012–13', text: 'Islamist occupation. The greatest threat in centuries to a record that had survived invasion, drought, and colonial erasure.' },
  ],
  crisis: {
    title: 'The Crisis of 2012',
    body: 'When Ansar Dine seized Timbuktu, the world feared the destruction of one of humanity’s irreplaceable archives. 4,203 manuscripts were burned or stolen. But led by Dr. Abdel Kader Haidara and Stephanie Diakite, local families hid thousands of manuscripts in their homes, then smuggled approximately 350,000 of them to safety in Bamako — transported in footlockers, suitcases, and grain sacks, slipped past checkpoints in the dark.',
    stats: [
      { num: '350,000', label: 'Manuscripts rescued to Bamako' },
      { num: '150,000+', label: 'Digitised by HMML since 2013' },
    ],
  },
  closing:
    'The Timbuktu manuscripts do not merely prove that Africa had a written intellectual tradition — they prove that it had one sophisticated enough to engage, on equal terms, with the great questions that occupied scholars from Baghdad to Córdoba to Cairo. They contain original thought, not just transcription. They contain dissent, not just orthodoxy. They contain science conducted through observation of the actual sky above the actual Sahara.',
  custodianQuote:
    '“It is traditional for a family member to swear publicly that he will protect the library for as long as he lives.”',
  custodianAttr: '— On Timbuktu’s manuscript custodians',
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
