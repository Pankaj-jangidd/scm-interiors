import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

const TestimonialsSection = () => {
  const { reviews } = useAdmin();
  const [showAll, setShowAll] = useState(false);
  
  const visibleReviews = reviews.filter(review => review.visible);

  if (visibleReviews.length === 0) return null;

  const displayedReviews = showAll ? visibleReviews : visibleReviews.slice(0, 6);

  return (
    <section className="py-16 md:py-20 bg-card">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          What Our Clients Say
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {displayedReviews.map((review) => (
            <Card key={review.id} className="bg-background p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm md:text-base text-muted-foreground mb-4 line-clamp-4">
                {review.text}
              </p>
              <div className="border-t border-border pt-3">
                <p className="font-semibold text-foreground">{review.name}</p>
                <p className="text-xs text-muted-foreground">{review.projectType}</p>
              </div>
            </Card>
          ))}
        </div>

        {visibleReviews.length > 6 && (
          <div className="text-center">
            <Button
              onClick={() => setShowAll(!showAll)}
              className="bg-accent hover:bg-accent/90 text-accent-foreground"
            >
              {showAll ? 'Show Less' : 'See More Reviews'}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
