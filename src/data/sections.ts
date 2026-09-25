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
    id: 'intro',
    sectionName: 'ENTER THE JOURNEY / 01',
    title: '',
    subtitle: '',
    mood: '',
    videoSrc: '/start.mp4',
    label: 'ENTER THE JOURNEY',
  },
  {
    id: 'nivora',
    sectionName: 'NIVORA / 02',
    title: 'NIVORA',
    subtitle: `NIHIL + AURA.<br>No need for outside approval; your own aura.`,
    mood: 'Pure · Minimal · Clean',
    videoSrc: '/videos/nivora web.mp4',
    mobileVideoSrc: '/videos/nivora mob.mp4',
    label: 'NIVORA',
  },
  {
    id: 'vayren',
    sectionName: 'VAYREN / 03',
    title: 'VAYREN',
    subtitle: `VAIRAGYA + REBELLION.<br>Detach from their voices. Choose your own direction.`,
    mood: 'Dark · Oversized · Rebellious',
    videoSrc: '/videos/vayren.mp4',
    mobileVideoSrc: '/videos/vayren mob.mp4',
    label: 'VAYREN',
  },
  {
    id: 'aurvia',
    sectionName: 'AURVIA / 04',
    title: 'AURVIA',
    subtitle: `AURUM + VIA.<br>The golden path you choose yourself.`,
    mood: 'Premium · Sophisticated',
    videoSrc: '/videos/aurvia web.mp4',
    mobileVideoSrc: '/videos/aurvia mob.mp4',
    label: 'AURVIA',
  },
  {
    id: 'astera',
    sectionName: 'ASTERA / 05',
    title: 'ASTERA',
    subtitle: `ASTRA + ERA.<br>You are the protagonist of your own era.`,
    mood: 'Graphic · Statement · Pieces',
    videoSrc: '/videos/astera web.mp4',
    mobileVideoSrc: '/videos/astera mob.mp4',
    label: 'ASTERA',
  },
  {
    id: 'manifera',
    sectionName: 'MANIFERA / 06',
    title: 'MANIFERA',
    subtitle: `MANIFEST + ERA.<br>Turn what you believe into something visible.`,
    mood: 'Experimental · Artistic',
    videoSrc: '/videos/manifera web.mp4',
    mobileVideoSrc: '/videos/manifera mob.mp4',
    label: 'MANIFERA',
  },
];
