export type Section = {
  id: string;
  sectionName: string;
  title: string;
  subtitle: string;
  mood: string;
  videoSrc?: string;
  mobileVideoSrc?: string;
  imageSrc?: string;
  mobileImageSrc?: string;
  label: string;
};

export const sections: Section[] = [
  {
    id: 'shadow',
    sectionName: 'The Shadow / 01',
    title: 'The Shadow',
    subtitle: 'Everyone has a shadow.',
    mood: 'Mysterious · Ambitious · Expensive',
    videoSrc: '/videos/episode-01.mp4',
    mobileVideoSrc: '/videos/e-1.mp4',
    label: 'Shadow',
  },
  {
    id: 'the voices',
    sectionName: 'The voices / 02',
    title: 'The voices',
    subtitle: `"ye tere <span style="color: #e60019;">bas ki baat</span> nahi hai."
"You're <span style="color: #e60019;">wasting</span> your <span style="color: #e60019;">Time</span>."
"Pehle kuch <span style="color: #e60019;">stable kar le</span>, phir ye sab karna."
"Maybe you're <span style="color: #e60019;">not good</span> enough."
"Tere se <span style="color: #e60019;">nahi hoga</span>."
"Aree <span style="color: #e60019;">Haseneg Log</span>?"
"You can <span style="color: #e60019;">not do</span> it !."
The voices <span style="color: #e60019;">never stop</span>
you just have to <span style="color: #e60019;">........</span>`,
    mood: 'Tension · Power · Revelation',
    videoSrc: '/videos/episode-02.mp4',
    label: 'voices',
  },
  {
    id: 'ignore',
    sectionName: 'Ignore / 03',
    title: 'Ignore',
    subtitle: `You don't have to <span style="color: #e60019;">silent</span> the voices. <br> You just have to <span style="color: #e60019;">stop</span> listening.`,
    mood: 'Discipline · Obsession · Creation',
    videoSrc: '/videos/episode-03.mp4',
    label: 'Ignore',
  },
  {
    id: 'relentless',
    sectionName: 'Relentless / 04',
    title: 'Relentless',
    subtitle: `<div style="display: flex; flex-direction: column; gap: 4px;"><span>Day 1. <span style="color: #e60019;">Still working</span>.</span><span>Day 17. <span style="color: #e60019;">Still failing</span>.</span><span>Day 43. <span style="color: #e60019;">Still learning</span>.</span><span>Day 91. <span style="color: #e60019;">Still showing up</span>.</span></div>`,
    mood: 'Fearless · Liberating · Iconic',
    videoSrc: '/videos/episode-04.mp4',
    label: 'Relentless',
  },
  {
    id: 'takeover',
    sectionName: 'Takeover / 06',
    title: 'Takeover',
    subtitle: `For those who were told they couldn't.<br>For those who kept going anyway.`,
    mood: 'Dominant · Unapologetic · Final',
    imageSrc: '/Takeover.jpeg',
    mobileImageSrc: '/Takeovermobile.png',
    label: 'Takeover',
  },
];
