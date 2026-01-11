import { Star } from "lucide-react";

interface ReviewCardProps {
  name: string;
  rating: number;
  review: string;
}

const ReviewCard = ({ name, rating, review }: ReviewCardProps) => {
  return (
    <div className="bg-secondary p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-500 border-0">
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${
              i < rating ? "fill-accent text-accent" : "text-gray-200"
            }`}
          />
        ))}
      </div>
      <p className="text-base text-muted-foreground leading-relaxed mb-5 italic">
        "{review}"
      </p>
      <div className="border-t border-border pt-4">
        <h4 className="font-semibold text-foreground">{name}</h4>
      </div>
    </div>
  );
};

export default ReviewCard;
