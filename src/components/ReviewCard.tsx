import { Star } from 'lucide-react';

interface ReviewCardProps {
  name: string;
  rating: number;
  review: string;
}

const ReviewCard = ({ name, rating, review }: ReviewCardProps) => {
  return (
    <div className="bg-card p-6 rounded-xl shadow-md hover-lift">
      <div className="mb-3">
        <h4 className="font-semibold text-foreground mb-2">{name}</h4>
        <div className="flex gap-1">
          {[...Array(rating)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{review}</p>
    </div>
  );
};

export default ReviewCard;
