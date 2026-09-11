type FeatureCardProps = {
  title: string;
  description: string;
};

const FeatureCard = ({ title, description }: FeatureCardProps) => (
  <article className="rounded-[28px] border border-white/10 bg-white/5 p-8 transition hover:border-white/20 hover:bg-white/10">
    <h3 className="text-xl font-semibold text-white">{title}</h3>
    <p className="mt-4 text-sm leading-7 text-secondary">{description}</p>
  </article>
);

export default FeatureCard;
