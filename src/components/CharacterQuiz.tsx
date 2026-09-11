import { useEffect, useMemo, useState } from 'react';

type Character = 'Unbothered' | 'Visionary' | 'Disruptor';

type StyleOption = {
  label: string;
  detail: string;
  character: Character;
  score: number;
};

type Question = {
  category: string;
  prompt: string;
  options: StyleOption[];
};

const questions: Question[] = [
  {
    category: 'The silhouette',
    prompt: 'Your perfect look starts with…',
    options: [
      { label: 'Clean lines', detail: 'Sharp tailoring, calm confidence.', character: 'Unbothered', score: 2 },
      { label: 'A strong shape', detail: 'An intentional proportion with a point of view.', character: 'Visionary', score: 3 },
      { label: 'The unexpected', detail: 'Oversized, cropped, layered — never predictable.', character: 'Disruptor', score: 3 },
    ],
  },
  {
    category: 'Your colour code',
    prompt: 'Pick the palette that feels like you.',
    options: [
      { label: 'Black, white, and nothing extra', detail: 'The detail does the talking.', character: 'Unbothered', score: 2 },
      { label: 'One signature colour', detail: 'A deliberate signal in a composed look.', character: 'Visionary', score: 3 },
      { label: 'Contrast that turns heads', detail: 'Colour clash, chrome, or a flash of red.', character: 'Disruptor', score: 3 },
    ],
  },
  {
    category: 'The detail',
    prompt: 'What makes the outfit complete?',
    options: [
      { label: 'A perfect fit', detail: 'Nothing loud. Everything considered.', character: 'Unbothered', score: 2 },
      { label: 'A piece with a story', detail: 'A future classic, a rare find, a reason to ask.', character: 'Visionary', score: 3 },
      { label: 'One rule-breaking accessory', detail: 'The item that shifts the whole look.', character: 'Disruptor', score: 3 },
    ],
  },
  {
    category: 'After dark',
    prompt: 'You are stepping out. What is the energy?',
    options: [
      { label: 'Effortless presence', detail: 'You do not need to announce yourself.', character: 'Unbothered', score: 2 },
      { label: 'Main-character precision', detail: 'Every angle feels planned, never forced.', character: 'Visionary', score: 3 },
      { label: 'No warning, full impact', detail: 'The room changes when you arrive.', character: 'Disruptor', score: 3 },
    ],
  },
  {
    category: 'The fashion rule',
    prompt: 'Which one do you live by?',
    options: [
      { label: 'Less, but better', detail: 'Taste is knowing when to stop.', character: 'Unbothered', score: 2 },
      { label: 'Wear the next thing first', detail: 'Your wardrobe has a point of view.', character: 'Visionary', score: 3 },
      { label: 'If it feels safe, change it', detail: 'Personal style should make a little noise.', character: 'Disruptor', score: 3 },
    ],
  },
];

const characterCopy: Record<Character, { copy: string; traits: string[] }> = {
  Unbothered: { copy: 'Your style is quiet, precise, and impossible to fake. You understand that restraint can be the strongest signal in the room.', traits: ['Refined', 'Self-assured', 'Timeless'] },
  Visionary: { copy: 'You treat getting dressed like world-building. Your eye is intentional, future-facing, and always one step ahead.', traits: ['Curated', 'Forward', 'Intentional'] },
  Disruptor: { copy: 'You dress to shift the energy. Your style has contrast, conviction, and the kind of confidence people remember.', traits: ['Bold', 'Experimental', 'Electric'] },
};

type CharacterQuizProps = { onClose: () => void };

const CharacterQuiz = ({ onClose }: CharacterQuizProps) => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<StyleOption[]>([]);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose]);

  const selectAnswer = (answer: StyleOption) => {
    setAnswers((current) => [...current, answer]);
    if (questionIndex < questions.length - 1) setQuestionIndex((current) => current + 1);
  };

  const result = useMemo(() => {
    const scores: Record<Character, number> = { Unbothered: 0, Visionary: 0, Disruptor: 0 };
    answers.forEach(({ character }) => { scores[character] += 1; });
    return (Object.entries(scores).sort(([, left], [, right]) => right - left)[0]?.[0] ?? 'Unbothered') as Character;
  }, [answers]);
  const complete = answers.length === questions.length;
  const instinctScore = Math.round((answers.reduce((total, answer) => total + answer.score, 0) / (questions.length * 3)) * 100);
  const question = questions[questionIndex];
  const resetQuiz = () => { setAnswers([]); setQuestionIndex(0); };

  return (
    <section className="character-quiz" role="dialog" aria-modal="true" aria-labelledby="quiz-title">
      <button className="character-quiz__close" type="button" onClick={onClose} aria-label="Close character quiz">Close <span aria-hidden="true">×</span></button>
      <div className="character-quiz__brand">4LOG / STYLE PROFILE</div>
      <div className="character-quiz__progress" aria-label={`Question ${Math.min(questionIndex + 1, questions.length)} of ${questions.length}`}><span style={{ width: `${(answers.length / questions.length) * 100}%` }} /></div>

      <main className="character-quiz__content">
        {complete ? (
          <div className="character-quiz__result">
            <p className="character-quiz__eyebrow">Your 4LOG style profile</p>
            <div className="character-quiz__score"><b>{instinctScore}</b><span>Style<br />instinct</span></div>
            <h2 id="quiz-title">The <span>{result}</span> One.</h2>
            <p>{characterCopy[result].copy}</p>
            <div className="character-quiz__traits" aria-label="Your style traits">{characterCopy[result].traits.map((trait) => <span key={trait}>{trait}</span>)}</div>
            <div className="character-quiz__actions">
              <a className="character-quiz__shop" href="https://www.instagram.com/4log/" target="_blank" rel="noreferrer">Explore your look <span aria-hidden="true">↗</span></a>
              <button className="character-quiz__restart" type="button" onClick={resetQuiz}>Retake profile</button>
            </div>
          </div>
        ) : (
          <div className="character-quiz__question">
            <div className="character-quiz__question-meta"><p className="character-quiz__eyebrow">{question.category}</p><span>{String(questionIndex + 1).padStart(2, '0')} / {String(questions.length).padStart(2, '0')}</span></div>
            <h2 id="quiz-title">{question.prompt}</h2>
            <p className="character-quiz__intro">Pick the answer that feels most like your wardrobe.</p>
            <div className="character-quiz__options">
              {question.options.map((option, optionIndex) => (
                <button key={option.label} type="button" onClick={() => selectAnswer(option)}>
                  <span>0{optionIndex + 1}</span><strong>{option.label}</strong><small>{option.detail}</small><b aria-hidden="true">↗</b>
                </button>
              ))}
            </div>
          </div>
        )}
      </main>
      <p className="character-quiz__footer">No right answers. Just your next signature.</p>
    </section>
  );
};

export default CharacterQuiz;
