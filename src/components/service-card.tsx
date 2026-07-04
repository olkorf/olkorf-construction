type ServiceCardProps = {
  title: string;
  description?: string;
};

export function ServiceCard({ title, description }: ServiceCardProps) {
  return (
    <article className="service-card">
      <h3>{title}</h3>
      {description ? <p>{description}</p> : null}
    </article>
  );
}
