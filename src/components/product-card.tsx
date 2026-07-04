type ProductCardProps = {
  title: string;
  description?: string;
};

export function ProductCard({ title, description }: ProductCardProps) {
  return (
    <article className="product-card">
      <h3>{title}</h3>
      {description ? <p>{description}</p> : null}
    </article>
  );
}
